import Vue from "vue";

const state = {
    user: {
        isConnected: null
    },
};

const mutations = {
    updateUser: (state, user) => ( state.user = {...state.user, ...user}),
    clearUser: (state) => ( state.user = { isConnected: false}),
};

const actions = {
    auth: ({commit, dispatch }) => {
        const sess = Vue.$cookies.get('sess');
        if (!sess)  return commit('updateUser', {isConnected: false});
        return Vue.axios.get(`http://127.0.0.1:8081/users/auth`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => commit('updateUser', {...res.data.user, isConnected: true}))
            .catch(() => {
                dispatch('logout')
            })
    },
    signIn: async ({dispatch},{email, password}) => {
        return Vue.axios.post(`http://127.0.0.1:8081/users/login`,{email, password},{
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res)
                Vue.$cookies.set('sess',true);
                dispatch('auth');
                return res.data
            }).catch((error)=> console.log(error))
    },
    signInTwitterSuccess: function({dispatch}){
        Vue.$cookies.set('sess',true);
        dispatch('auth');
    },
    register: async ({dispatch},{email, username, password}) => {
        return Vue.axios.post(`http://127.0.0.1:8081/users/register`,{email, username, password}, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },})
            .then(() => {
                dispatch('signIn');
            }).catch((error)=> console.log(error))
    },
    logout: async ({commit}) => {
        Vue.$cookies.remove('sess');
        commit('clearUser');
    },
    updateUser: function({commit},newUser) {
        commit('updateUser', newUser)
    }
};

const getters = {
    me: state =>  state.user,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
