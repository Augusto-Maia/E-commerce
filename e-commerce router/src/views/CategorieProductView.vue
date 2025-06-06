<template>
  <section id="categoria-produtos" class="bg-gray-50 scroll-mt-20 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-blue-900 mb-6">
        Categoria: "{{ selectedCategory }}"
      </h2>

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <span class="text-gray-500">Carregando produtos...</span>
      </div>

      <div v-else>
        <div v-if="products.length === 0" class="text-center text-gray-500 py-12">
          Nenhum produto encontrado.
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="item in products"
            :key="item.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-40 object-cover rounded mb-3"
            />
            <h3 class="text-lg font-semibold text-gray-800 mb-2 text-center">
              {{ item.title }}
            </h3>
            <p class="text-green-600 font-bold mb-2">
              {{
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.price)
              }}
            </p>
            <router-link
              :to="`/produto/${item.id}`"
              class="text-sm text-blue-700 hover:text-blue-500 underline"
            >
              Ver Detalhes
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const products = ref([]);
const isLoading = ref(false);

const selectedCategory = computed(() => {
  return route.params.id || '';
});

const fetchByCategory = async (slug) => {
  isLoading.value = true;
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${encodeURIComponent(slug)}`
    );
    products.value = response.data.products || [];
  } catch {
    products.value = [];
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => selectedCategory.value,
  (newSlug) => {
    if (newSlug) {
      fetchByCategory(newSlug);
    } else {
      products.value = [];
      isLoading.value = false;
    }
  },
  { immediate: true }
);
</script>
