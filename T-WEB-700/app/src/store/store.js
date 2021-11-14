import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user : {},
    role : '',
  },
  mutations: {
    auth_request(state){
        state.status = 'loading'
      },
      auth_success(state){
        state.status = 'success'
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
      },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})