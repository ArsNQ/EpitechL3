// Every query for product controllers

import { HTTP } from '../http-common';

export default {
    getProducts: () => { return HTTP.get('/api/products') },
    createProduct: (product) => { return HTTP.post('/api/products', product) },
    getProduct: (id) => { return HTTP.get(`/api/products/${id}`) },
    editProduct: (id, product) => { return HTTP.patch(`/api/products/${id}`, product, { headers: { "Content-Type": "application/merge-patch+json"}}) },
    deleteProduct: (id) => { return HTTP.delete(`/api/products/${id}`) },
    searchProduct: (query) => { return HTTP.get(`/search/${query}`) },
    getCategories: () => { return HTTP.get(`/api/categories`) },
    getStocks: () => { return HTTP.get(`/api/get_custom_stock`) },
    editStock: (id, qty) => { return HTTP.post(`/api/edit_stock_by_product/${id}/${qty}`) }
}
