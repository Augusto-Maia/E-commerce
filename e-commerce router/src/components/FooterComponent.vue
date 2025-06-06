<template>
    <footer class="bg-gray-900 text-gray-300 pt-12 pb-6">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-xl font-bold text-white mb-4">MendShop</h3>
                    <p class="mb-4">Sua loja completa, do básico ao extraordinário.</p>
                    <div class="flex space-x-4">
                        <a v-for="(social, index) in socialLinks" :href="social.url" :key="index"
                            class="text-gray-400 hover:text-white transition">
                            <Icon :icon="social.icon" class="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <!-- Links rápidos -->

                <div>
                    <h3 class="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
                    <ul class="space-y-2">
                        <li v-for="(link, index) in quickLinks" :key="index">
                            <a href="#" class="hover:text-white transition">{{ link }}</a>
                        </li>
                    </ul>
                </div>
                <!-- Atendimento ao Cliente -->

                <div>
                    <h3 class="text-lg font-semibold text-white mb-4">Atendimento ao Cliente</h3>
                    <ul class="space-y-2">
                        <li v-for="(service, index) in customerService" :key="index">
                            <a href="#" class="hover:text-white transition">{{ service }}</a>
                        </li>
                    </ul>
                </div>

                <!-- Atualizações -->

                <div>
                    <h3 class="text-lg font-semibold text-white mb-4">Fique por Dentro</h3>
                    <p>Inscreva-se para receber atualizações de novos produtos e ofertas especiais.</p>
                    <form class="flex">
                        <input type="email" placeholder="Seu email"
                            class="px-4 py-2 rounded-lg focus:outline-none text-gray-900" required>
                        <button type="submit"
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">Inscreva-se</button>
                    </form>
                    <div class="mt-4 flex items-center">
                        <Icon icon="fa6-solid:envelope" class="w-5 h-5 mr-2" />
                        <span>suporte@mendshop.com</span>
                    </div>
                </div>
            </div>
            <!-- footer -->

            <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {{ new Date().getFullYear() }} Mendshop. Todos os direitos reservados</p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <Icon v-for="(icon, index) in pagamentoIcons" :key="index" :icon="icon" class="w-8 h-6" />
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
import { ref } from 'vue';
const quickLinks = ref(['Início', 'Produtos', 'Últimos Lançamentos', 'Mais Vendidos', 'Ofertas'])
const customerService = ref(['Suporte', 'FAQ', 'Política de Privacidade', 'Devoluções e Reembolsos', 'Termos de Serviço', 'Política de exportação', 'Política de Cookies'])
const pagamentoIcons = ref(['logos:visa', 'logos:mastercard', 'logos:paypal'])
const socialLinks = ref([
    { icon: 'fa6-brands:facebook-f', url: '#' },
    { icon: 'fa6-brands:twitter', url: '#' },
    { icon: 'fa6-brands:instagram', url: '#' },
])
</script>
