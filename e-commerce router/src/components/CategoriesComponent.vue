<template>
    <section class="py-16 scroll-mt-20 bg-white" id="categorias">
        <div class="container mx-auto px-4">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-blue-900 mb-4">
                    Explore Nossas Categorias
                </h2>
                <p class="text-lg text-gray-800 max-w-xl mx-auto mb-8">
                    Que tal uma busca mais precisa? Encontre exatamente o que você procura navegando por todas as nossas categorias.
                </p>
                <router-link
                    to="/categoria"
                    class="inline-block px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                >
                    Ver Todas as Categorias
                </router-link>
            </div>
        </div>
    </section>
</template>