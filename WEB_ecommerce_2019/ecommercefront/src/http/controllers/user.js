import { HTTP } from '../http-common';

export default {
    login: (email, password) => {
        let body = new FormData();

        body.append('user', email);
        body.append('pass', password)
        return HTTP.post('/api/login_check', body);
    },
    register: (user) => { return HTTP.post('/register', user) },
    editUser: (user_id, data) => { return HTTP.patch(`/api/users/${user_id}`, data, { headers: { "Content-Type": "application/merge-patch+json"}}) },
    getUserEmail: (email) => { return HTTP.get(`/get_user_email/${email}`)},
    getUser: () => { return HTTP.get('/user') },
    getUsers: () => { return HTTP.get('/api/users') },
    deleteUser: (id) => { return HTTP.delete(`/api/users/${id}`)}
}