<template>
  <section class="bg-gray-50 py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <button
          @click="voltar"
          :disabled="id <= 1"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          @click="avancar"
          :disabled="!produto"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>

      <div
        v-if="loading"
        class="flex items-center justify-center bg-white rounded-lg shadow-md p-6 min-h-[400px] text-gray-500"
      >
        Carregando produto...
      </div>

      <div
        v-else-if="!produto"
        class="flex items-center justify-center bg-white rounded-lg shadow-md p-6 min-h-[400px] text-red-700"
      >
        Produto não encontrado.
      </div>

      <div v-else class="bg-white rounded-lg shadow-md p-6">
        <div class="flex flex-col md:flex-row gap-6">
          <img
            :src="produto.thumbnail"
            :alt="produto.title"
            class="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div class="flex-1">
            <h2 class="text-3xl font-bold text-gray-900 mb-3">{{ produto.title }}</h2>
            <p class="text-green-600 text-xl font-bold mb-2">R$ {{ produto.price }}</p>
            <p class="text-gray-700 mb-4">{{ produto.description }}</p>
            <p class="text-sm text-gray-600 mb-2">Categoria: {{ produto.category }}</p>
            <p class="text-sm text-gray-600 mb-2">
              Disponibilidade: {{ produto.stock > 0 ? 'Em estoque' : 'Indisponível' }}
            </p>
            <div class="flex flex-col space-y-4 mt-4">
              <button class="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition w-full cursor-pointer">
                Adicionar ao Carrinho
              </button>
              <button class="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-800 transition w-full cursor-pointer">
                Comprar Agora
              </button>
              <button class="text-blue-500 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                Adicionar à Lista de Desejos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ProductComponent />
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ProductComponent from '../components/ProductsComponent.vue'

const route = useRoute()
const router = useRouter()
const produto = ref(null)
const loading = ref(false)
const id = ref(Number(route.params.id) || 1)

const fetchProduto = async (i) => {
  loading.value = true
  produto.value = null
  try {
    const res = await axios.get(`https://dummyjson.com/products/${i}`)
    produto.value = res.data
  } catch {
    produto.value = null
  } finally {
    loading.value = false
  }
}

const avancar = () => {
  router.push({ params: { id: id.value + 1 } })
}

const voltar = () => {
  if (id.value > 1) router.push({ params: { id: id.value - 1 } })
}

watch(
  () => route.params.id,
  (v) => {
    id.value = Number(v)
    fetchProduto(id.value)
  },
  { immediate: true }
)
</script>
