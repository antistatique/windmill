import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication';
import authorization from './authorization';
import dashboard from './dashboard';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    error : "",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // Importe the files for the login, the home page and the dashboard
    authentication,
    authorization,
    dashboard
  },
  plugins: [
    // Make data persisted
    createPersistedState({
      paths: [
        'authentication.profile',
        'authentication.signedIn',
      ]
    })
  ]
})
