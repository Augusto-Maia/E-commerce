<template>
    <div id="ofertas" class="container scroll-mt-20 mx-auto px-4 py-12">
        <h2 class="text-3xl font-bold text-center mb-2 text-blue-900">
            Ofertas Imperdíveis
        </h2>
        <p class="text-center text-gray-600 mb-12">Aproveite nossos cupons e descontos especiais em diversas categorias.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="oferta in ofertasAtuais" :key="oferta.id"
                :class="[oferta.bgColor, 'rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105']">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 :class="[oferta.textColor, 'text-xl font-semibold']">{{ oferta.title }}</h3>
                        <span class="bg-white rounded-full p-3 shadow-md">
                            <Icon :icon="oferta.discount.includes('%') ? 'material-symbols:percent' : 'mdi:gift'"
                                :class="[oferta.textColor, 'text-2xl']" />
                        </span>
                    </div>

                    <p class="text-gray-700 mb-6 flex-grow">{{ oferta.description }}</p>
                    <div class="flex items-center text-gray-600 mb-6">
                        <Icon icon="svg-spinners:clock" class="mr-2" />
                        <span>Acaba em {{ oferta.endDate }}</span>
                    </div>

                    <div class="bg-white rounded-md p-4 mb-4">
                        <p class="text-sm text-gray-500 mb-1">Use o código</p>
                        <p class="font-bold font-mono text-lg">{{ oferta.code }}</p>
                    </div>

                    <button :class="[oferta.textColor, 'w-full mt-auto p-3 rounded-lg font-semibold border',
                    oferta.textColor.replace('text', 'border'),
                        'hover:opacity-90 hover:shadow-lg transition-colors duration-300'
                    ]">Resgatar Oferta</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const ofertasAtuais = ref([
    {
        id: 1,
        title: 'Beleza e Perfumaria',
        description: 'Até 25% de desconto em cosméticos e fragrâncias para realçar o seu brilho.',
        discount: '25%',
        endDate: '10/06/2025',
        code: 'BELEZA25',
        bgColor: 'bg-blue-300/80',
        textColor: 'text-blue-800'
    },
    {
        id: 2,
        title: 'Casa & Decoração',
        description: 'Deixe seu lar mais aconchegante com 15% OFF em móveis e itens de decoração.',
        discount: '15%',
        endDate: '12/06/2025',
        code: 'CASA15',
        bgColor: 'bg-cyan-300/80',
        textColor: 'text-cyan-800'
    },
    {
        id: 3,
        title: 'Mercado em Casa',
        description: 'Receba suas compras em casa com frete grátis para pedidos acima de R$150.',
        discount: 'Frete Grátis',
        endDate: '09/06/2025',
        code: 'FRETEGRATIS',
        bgColor: 'bg-green-300/80',
        textColor: 'text-green-800'
    }
]);
</script>