<template>
  <section class="py-12 scroll-mt-20 bg-gray-50" id="categorias">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-extrabold text-blue-900 mb-2">
          Nossas Categorias em Destaque
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Navegue pelos melhores segmentos: celulares, notebooks, acessórios e muito mais.
        </p>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-48">
        <span class="text-gray-500">Carregando categorias...</span>
      </div>

      <div v-else>
        <div
          v-if="!categories.length"
          class="text-center text-gray-500 h-48 flex items-center justify-center"
        >
          Nenhuma categoria disponível.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="cat in categories"
            :key="cat.slug"
            :to="{ name: 'categoria', params: { id: cat.slug } }"
            class="block overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition"
          >
            <div class="relative h-44 bg-gray-200">
              <img
                v-if="cat.image"
                :src="cat.image"
                :alt="cat.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
              <div class="absolute bottom-0 left-0 p-4 text-white">
                <h3 class="text-xl font-semibold capitalize">{{ cat.name }}</h3>
                <p class="text-sm mt-1">{{ getTagline(cat.name) }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const loading = ref(true)

function formatName(raw) {
  if (typeof raw === 'string') {
    return raw.charAt(0).toUpperCase() + raw.slice(1)
  }
  if (raw && typeof raw === 'object') {
    if (raw.name) return String(raw.name)
    if (raw.slug) return String(raw.slug)
  }
  return String(raw)
}

function getTagline(name) {
  return `Explorar tudo sobre ${name.replace(/-/g, ' ')}`
}

async function loadCategories() {
  try {
    const resp = await axios.get('https://dummyjson.com/products/categories')
    const list = Array.isArray(resp.data) ? resp.data : []
    const temp = list.map((item) => {
      let slug, name
      if (typeof item === 'string') {
        slug = item
        name = formatName(item)
      } else if (item && typeof item === 'object') {
        slug = item.slug || String(item)
        name = formatName(item.name || item.slug || item)
      } else {
        slug = String(item)
        name = formatName(item)
      }
      return { slug, name, image: '' }
    })
    await Promise.all(
      temp.map(async (cat) => {
        try {
          const r = await axios.get(
            `https://dummyjson.com/products/category/${encodeURIComponent(cat.slug)}?limit=1`
          )
          if (r.data && Array.isArray(r.data.products) && r.data.products.length) {
            cat.image = r.data.products[0].thumbnail
          }
        } catch {
          cat.image = ''
        }
      })
    )
    categories.value = temp
  } catch {
    categories.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadCategories)
</script>
