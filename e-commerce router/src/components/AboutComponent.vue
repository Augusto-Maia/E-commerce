<template>
    <div id="sobre" class=" scroll-mt-20 bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-12 mb-20">
                <div class="lg:w-1/2">
                    <div class="relative rounded-2xl overflow-hidden h-96 shadow-xl">
                        <img :src="aboutImage" alt="Produtos Variados" class="w-full h-full object-contain">
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                        <div class="absolute bottom-0 left-0 p-6 text-white">
                            <h3 class="text-2xl font-bold">Desde 2023</h3>
                            <p class="mt-2">Oferecendo uma vasta seleção para você</p>
                        </div>
                    </div>
                </div>

                <div class="lg:w-1/2 flex flex-col justify-center">
                    <h2 class="text-4xl font-bold text-blue-900 mb-6">Sobre Nós</h2>
                    <p class="text-lg text-gray-600 mb-4">Na Mendshop, acreditamos que a variedade e a qualidade devem andar juntas. Nossa missão é oferecer uma experiência de compra online excepcional, com uma vasta gama de produtos para atender todas as suas necessidades, desde itens do dia a dia até as novidades mais recentes. Trabalhamos incansavelmente para garantir que cada produto em nosso catálogo atenda aos mais altos padrões, proporcionando a você a confiança e a satisfação que merece ao fazer suas compras.
                    </p>
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h4 class="font-semibold text-green-500">Milhares</h4>
                            <p class="text-gray-600">Produtos de diversas categorias</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h4 class="font-semibold text-green-500">10+</h4>
                            <p class="text-gray-600">Países atendidos</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h4 class="font-semibold text-green-500">5000+</h4>
                            <p class="text-gray-600">Clientes satisfeitos</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <h4 class="font-semibold text-green-500">24/7</h4>
                            <p class="text-gray-600">Suporte disponivel</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Importa o axios para fazer a requisição

const aboutImage = ref('');

onMounted(async () => {
    try {
        // Buscando um produto com ID 3 (Samsung Universe 9) para uma imagem mais genérica
        const response = await axios.get('https://dummyjson.com/products/7');
        aboutImage.value = response.data.images[0];
    } catch (error) {
        console.error('Erro ao buscar imagem do About Component:', error);
        // Fallback para uma imagem padrão caso a API falhe
        aboutImage.value = 'https://i.imgur.com/G5g2mJ4.png';
    }
});
</script>