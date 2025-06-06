<template>
    <section class="py-12 scroll-mt-20 bg-gray-50" id="produtos">
        <main class="container mx-auto px-4">
            <header class="flex justify-between items-center mb-8">
                <h2 class="md:text-3xl text-2xl font-bold text-blue-900">Produtos Populares</h2>
                <nav class="flex space-x-4" aria-label="controle de carrossel de produtos">
                    <button @click="prevSlide"
                        class="p-2 rounded-full bg-white shadow-md hover:bg-green-100 text-green-600 transition-colors"
                        aria-label="slide anterior">
                        <Icon icon="line-md:arrow-small-left" width="24" height="24" />
                    </button>
                    <button @click="nextSlide"
                        class="p-2 rounded-full bg-white shadow-md hover:bg-green-100 text-green-600 transition-colors"
                        aria-label="próximo slide">
                        <Icon icon="line-md:arrow-small-right" width="24" height="24" />
                    </button>
                </nav>
            </header>

            <section class="relative overflow-hidden">
                <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <li v-for="product in visibleProducts" :key="product.id"
                        class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105">
                        <article>
                            <figure class="relative">
                                <img :src="product.image" :alt="product.name" class="w-full h-64 object-contain">

                                <figcaption v-if="product.discount > 0"
                                    class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    -{{ product.discount }}%
                                </figcaption>
                                <button
                                    class="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-green-100 text-gray-700"
                                    aria-label="Adicionar a lista de desejos">
                                    <Icon icon="line-md:heart" width="18" height="18" />
                                </button>
                            </figure>

                            <section class="p-4">
                                <div class="flex items-center mb-2">
                                    <Icon v-for="i in 5" :key="i" icon="line-md:star-alt-filled" width="16" height="16"
                                        :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'" />
                                    <span class="text-sm text-gray-500 ml-1">({{ product.rating }})</span>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ product.name }}</h3>

                                <footer class="flex items-center justify-between">
                                    <div>
                                        <span class="text-lg font-bold text-green-600">
                                            {{
                                                new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(product.price * (1 - product.discount / 100)) }}
                                        </span>
                                    </div>
                                    <button
                                        class="p-2 bg-green-900 rounded-full text-white hover:bg-green-700 transition-colors"
                                        aria-label="Adicionar ao carrinho">
                                        <Icon icon="icon-park-solid:shopping" width="18" height="18" />
                                    </button>
                                </footer>
                            </section>
                        </article>
                    </li>
                </ul>
            </section>
            <nav class="flex justify-center mt-6 space-x-2" aria-label="Paginação do Carrossel">
                <button v-for="index in totalSlides" :key="index" @click="currentSlide = index - 1"
                    :class="['w-3 h-3 rounded-full', currentSlide === index - 1 ? 'bg-green-950' : 'bg-gray-400']"></button>
            </nav>
        </main>
    </section>
</template>

<script setup>
import api from '../services/api';
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentSlide = ref(0);
const productsPerPage = ref(4);
const products = ref([]);

const totalSlides = computed(() => {
  if (products.value.length === 0) return 0;
  return Math.ceil(products.value.length / productsPerPage.value);
});

const visibleProducts = computed(() => {
  const start = currentSlide.value * productsPerPage.value;
  return products.value.slice(start, start + productsPerPage.value);
});

const nextSlide = () => {
  if (totalSlides.value === 0) return;
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
};

const prevSlide = () => {
  if (totalSlides.value === 0) return;
  currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
};

const handleResize = () => {
  if (window.innerWidth < 640) {
    productsPerPage.value = 1;
  } else if (window.innerWidth < 768) {
    productsPerPage.value = 2;
  } else if (window.innerWidth < 1024) {
    productsPerPage.value = 3;
  } else {
    productsPerPage.value = 4;
  }
};

const fetchProducts = async (searchTerm = '') => {
  try {
    const responseData = await api.getProducts(12, 0); // aqui você pode ajustar paginação conforme necessário

    let lista = responseData.products.map(item => ({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.thumbnail || (item.images && item.images[0]) || '',
      rating: item.rating,
      discount: Math.round(item.discountPercentage)
    }));

    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      lista = lista.filter(p =>
        p.name.toLowerCase().includes(termo)
      );
    }

    products.value = lista;
    currentSlide.value = 0;
  } catch (e) {
    console.error('Erro ao buscar produtos para o carrossel:', e);
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  fetchProducts(route.query.search || '');
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

// Atualiza produtos quando a query 'search' mudar na URL
watch(
  () => route.query.search,
  (novaBusca) => {
    fetchProducts(novaBusca || '');
  }
);
</script>