import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export default {
  async getProducts(limit = 20, skip = 0) {
    const res = await axios.get(`${API_URL}/products?limit=${limit}&skip=${skip}`);
    return res.data;
  },

  async getProductById(id) {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  },

  async searchProducts(query) {
    const res = await axios.get(`${API_URL}/products/search?q=${query}`);
    return res.data;
  }
}