<template>
  <header class="sticky top-0 z-50 transition-all duration-300">
    <section class="w-full bg-gray-100/95 backdrop-blur shadow-md py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <div class="flex justify-between items-center w-full md:w-auto">
            <a href="/" class="text-2xl font-bold text-green-600">MendShop</a>
            <button
              class="md:hidden text-gray-700 hover:text-indigo-600"
              aria-label="Toggle mobile menu"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <icon icon="mdi:menu" class="w-6 h-6" />
            </button>
          </div>

          <div class="w-full md:flex-1 max-w-sm">
            <label class="relative w-full">
              <input
                v-model="searchTerm"
                @input="onSearchInput"
                type="text"
                placeholder="Buscar..."
                class="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-indigo-600"
                type="button"
                @click="onSearchInput"
                aria-label="search button"
              >
                <icon icon="mdi:magnify" class="w-4 h-4" />
              </button>
            </label>
          </div>

          <aside class="flex items-center justify-end space-x-4 w-full md:w-auto">
            <button class="relative p-2 text-gray-700 hover:text-green-600" aria-label="wishlist">
              <icon icon="mdi:heart-outline" class="w-5 h-5" />
              <span
                class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >2</span>
            </button>
            <button class="relative p-2 text-gray-700 hover:text-green-600" aria-label="cart">
              <icon icon="mdi:cart-outline" class="w-5 h-5" />
              <span
                class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >5</span>
            </button>
            <button class="relative p-2 text-gray-700 hover:text-green-600" aria-label="account">
              <icon icon="mdi:account-outline" class="w-5 h-5" />
            </button>
          </aside>
        </div>
      </div>
    </section>

    <nav class="bg-green-900" aria-label="main navigation">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul class="hidden md:flex justify-center py-3 flex-wrap gap-x-6 text-sm font-medium text-white">
          <li v-for="item in navItems" :key="item.id">
            <a :href="item.link" class="hover:text-green-300 transition-colors">{{ item.name }}</a>
          </li>
        </ul>
        <section
          v-if="isMobileMenuOpen"
          class="md:hidden mt-2 bg-white rounded-lg shadow-md p-4 space-y-3 text-green-800 text-center"
          aria-label="Mobile Navigation"
        >
          <a
            v-for="item in navItems"
            :href="item.link"
            :key="item.id"
            class="block hover:text-red-300 text-sm font-medium"
          >{{ item.name }}</a>
        </section>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)
const navItems = [
  { id: 1, name: 'Inicio', link: '/' },
  { id: 2, name: 'Produtos', link: '/produtos' },
  { id: 3, name: 'Categorias', link: '/categorias' },
  { id: 4, name: 'Ofertas', link: './#ofertas' },
  { id: 5, name: 'Sobre', link: './#sobre' },
  { id: 6, name: 'Contato', link: './#contato' }
]

const router = useRouter()
const route = useRoute()
const searchTerm = ref(route.query.search || '')

const onSearchInput = () => {
  const q = { ...route.query }
  if (searchTerm.value.trim()) {
    q.search = searchTerm.value.trim()
  } else {
    delete q.search
  }
  router.replace({ path: '/produtos', query: q })
}
</script>
