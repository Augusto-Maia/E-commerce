<template>
    <section id="inicio" class="bg-gray-100 scroll-mt-20 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10">
            <div class="text-center lg:text-left max-w-xl">
                <h1 class="text-4xl sm:text-5xl font-bold text-blue-900 leading-tight mb-4">
                    Descubra o Mundo de Possibilidades na Mendshop!
                </h1>
                <p class="text-gray-700 text-base sm:text-lg mb-6">
                    Encontre uma vasta gama de produtos, desde eletrônicos inovadores a itens essenciais para o dia a dia. Qualidade e preço justo em um só lugar.
                </p>
                <div class="flex justify-center lg:justify-start gap-4">
                    <a href="/produtos"
                        class="px-6 py-3 bg-green-900 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-600 transition">Compre
                        Agora</a>
                    <a href="#ofertas"
                        class="px-6 py-3 border border-green-700/80 text-green-900 text-sm font-semibold rounded-lg hover:bg-green-600/90 transition">Ver
                        Ofertas</a>
                </div>
            </div>

            <div class="w-full lg:w-1/2 flex justify-center">
                <img :src="heroImage"
                    class="w-3/4 lg:w-full max-w-md mx-auto rounded-xl shadow-lg">
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const heroImage = ref('');

onMounted(async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products/12');
        heroImage.value = response.data.images[0];
    } catch (error) {
        console.error('Erro ao buscar imagem do Hero Component:', error);
        heroImage.value = 'https://i.imgur.com/gK988aF.png'; 
    }
});
</script>