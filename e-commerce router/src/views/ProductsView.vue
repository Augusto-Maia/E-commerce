<template>
  <main class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-green-600 mb-3">
          Todos os Nossos Produtos
        </h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Navegue por nosso catálogo completo e encontre exatamente o que você procura.
        </p>
      </div>

      <!-- Paginação superior -->
      <nav class="flex justify-between items-center space-y-12">
        <button
          @click="prevPage"
          :disabled="isPrevDisabled"
          class="py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-gray-700">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="isNextDisabled"
          class="py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Próximo
        </button>
      </nav>

      <!-- Conteúdo: loading, erro ou lista de produtos -->
      <div v-if="loading" class="text-center py-16">
        <p class="text-lg text-gray-600">Carregando produtos...</p>
      </div>

      <div v-else-if="error" class="text-center py-16">
        <p class="text-lg text-red-500">Ocorreu um erro ao buscar os produtos.</p>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <router-link
            v-for="product in products"
            :key="product.id"
            :to="`/produto/${product.id}`"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col group"
          >
            <article>
              <figure class="relative">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-full h-64 object-contain p-4 bg-white"
                />
                <figcaption
                  v-if="product.discountPercentage > 0"
                  class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                >
                  -{{ Math.round(product.discountPercentage) }}%
                </figcaption>
              </figure>
              <section class="p-4 flex flex-col flex-grow">
                <h3 class="text-lg font-semibold text-gray-800 mb-2 flex-grow">
                  {{ product.title }}
                </h3>
                <footer class="mt-4">
                  <span class="text-xl font-bold text-green-600">
                    {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      product.price * (1 - product.discountPercentage / 100)
                    ) }}
                  </span>
                </footer>
              </section>
            </article>
          </router-link>
        </div>

        <!-- Paginação inferior -->
        <nav class="flex justify-between items-center mt-12">
          <button
            @click="prevPage"
            :disabled="isPrevDisabled"
            class="py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span class="text-gray-700">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="isNextDisabled"
            class="py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Próximo
          </button>
        </nav>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const products = ref([])
const loading = ref(true)
const error = ref(null)

const productsPerPage = 20
const totalProducts = ref(0)
const currentPage = ref(1)

const route = useRoute()
const router = useRouter()

const totalPages = computed(() => Math.ceil(totalProducts.value / productsPerPage))
const isPrevDisabled = computed(() => currentPage.value === 1)
const isNextDisabled = computed(() => currentPage.value >= totalPages.value)

const hasSearch = computed(() => (route.query.search ? String(route.query.search) : ''))

const fetchProducts = async (page, searchTerm = '') => {
  loading.value = true
  error.value = null
  const skip = (page - 1) * productsPerPage

  try {
    if (searchTerm) {
      // Busca em tempo real (todos resultados, sem paginação interna)
      const responseData = await api.searchProducts(searchTerm)
      products.value = responseData.products
      totalProducts.value = responseData.total
    } else {
      // Paginação normal
      const responseData = await api.getProducts(productsPerPage, skip)
      products.value = responseData.products
      totalProducts.value = responseData.total
    }
    window.scrollTo(0, 0)
  } catch (err) {
    error.value = err.message
    products.value = []
    totalProducts.value = 0
    console.error('Erro ao buscar produtos:', err)
  } finally {
    loading.value = false
  }
}

const updateQuery = (page) => {
  const q = { ...route.query }
  q.page = page
  if (!q.page) delete q.page
  router.push({ query: q })
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    updateQuery(currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    updateQuery(currentPage.value)
  }
}

watch(
  () => route.query.page,
  (newPage) => {
    const page = parseInt(newPage) || 1
    currentPage.value = page
    fetchProducts(page, hasSearch.value)
  },
  { immediate: true }
)

watch(
  () => route.query.search,
  (newSearch) => {
    // Ao mudar search, sempre recarrega na página 1
    currentPage.value = 1
    const q = { ...route.query, page: 1 }
    router.replace({ query: q })
    fetchProducts(1, newSearch || '')
  }
)
</script>

<style scoped>
/* Mantém o mesmo design, sem alterações extras */
</style>
