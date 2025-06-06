<template>
  <div
    id="contato"
    class="min-h-screen scroll-mt-20 bg-green-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-serif font-bold text-white mb-4">
          Entre em Contato Conosco
        </h1>
        <p class="text-lg text-gray-200 max-w-2xl mx-auto">
          Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui para ajudar!
        </p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-100">
          <h2 class="text-2xl font-serif font-semibold text-gray-900 mb-6">
            Fale conosco
          </h2>
          <form class="space-y-6">
            <div>
              <label
                for="nome"
                class="block text-sm font-medium text-gray-800 mb-1">Seu Nome</label>
              <input
                type="text"
                id="nome"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Digite Seu Nome"
              />
            </div>
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-800 mb-1">Seu Email</label>
              <input
                type="email"
                id="email"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="seuemail@email.com"
              />
            </div>
            <div>
              <label
                for="mensagem"
                class="block text-sm font-medium text-gray-800 mb-1">Sua Mensagem
              </label>
              <textarea
                rows="5"
                id="mensagem"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Escreva como podemos te ajudar..."
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg transition duration-300 font-medium shadow-md">Enviar Mensagem</button>
          </form>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-100 flex flex-col justify-between h-full">
          <div class="space-y-6">
            <h2 class="text-2xl font-serif font-semibold text-gray-900 mb-4">
              Consultar Informações
            </h2>
            <div class="flex items-start">
              <div class="bg-green-200 p-3 rounded-full mr-4">
                <Icon icon="fa-solid:phone" class="text-green-900 text-lg" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">Telefone</h3>
                <p class="text-gray-800">+55 (14) 98765-4321</p>
                <p class="text-gray-600">Seg-Sex: 9h-18h</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-green-200 p-3 rounded-full mr-4">
                <Icon icon="fa-solid:envelope" class="text-green-900 text-lg" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">Email</h3>
                <p class="text-gray-800">contato@mendshop.com</p>
                <p class="text-gray-600">suporte@mendshop.com</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-green-200 p-3 rounded-full mr-4">
                <Icon icon="fa-solid:map-marker-alt" class="text-green-900 text-lg" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  Nosso endereço físico
                </h3>
                <p class="text-gray-800">Rua do vue 505</p>
                <p class="text-gray-600">Marília, São Paulo 12345-678</p>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Nos siga nas redes sociais!
            </h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="bg-green-200 hover:bg-gray-200 p-3 rounded-full transition duration-300">
                <Icon icon="fa-brands:instagram" class="text-green-900" />
              </a>
              <a
                href="#"
                class="bg-green-200 hover:bg-gray-200 p-3 rounded-full transition duration-300">
                <Icon icon="fa-brands:facebook" class="text-green-900" />
              </a>
              <a
                href="#"
                class="bg-green-200 hover:bg-gray-200 p-3 rounded-full transition duration-300">
                <Icon icon="fa-brands:twitter" class="text-green-900" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>