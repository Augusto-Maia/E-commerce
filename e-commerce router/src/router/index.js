import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductsView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CategoriesView from '../views/CategoriesView.vue'
import CategorieProductView from '../views/CategorieProductView.vue';


const routes = [
  {
    path: '/',              
    name: 'inicio',           
    component: HomeView
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: ProductView
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: ProductDetailView
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: CategoriesView
  },
  {
    path: '/categoria/:id',
    name: 'categoria',
    component: CategorieProductView
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
