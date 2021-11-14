import { HTTP } from '../http-common';

export default {
    getOrders: () => { return HTTP.get('/api/my_orders') },
    createOrder: (data) => { return HTTP.post('/api/my_orders', data) },
    getOrder: (id) => { return HTTP.get(`/api/my_orders/${id}`) },
    editOrder: (id, data) => { return HTTP.patch(`/api/my_orders/${id}`, data, { headers: { "Content-Type": "application/merge-patch+json"}}) },
    deleteOrder: (id) => { return HTTP.delete(`/api/my_orders/${id}`) },
    getUserOrders: () => { return HTTP.get(`/api/get_orders`) },

    getOrderItems: () => { return HTTP.get('/api/order_items') },
    createOrderItem: (data) => { return HTTP.post('/api/order_items', data) },
    getOrderItem: (id) => { return HTTP.get(`/api/my_orders/${id}`) },
    editOrderItem: (id, data) => { return HTTP.patch(`/api/my_orders/${id}`, data) },
    deleteOrderItem: (id) => { return HTTP.delete(`/api/my_orders/${id}`) }

}