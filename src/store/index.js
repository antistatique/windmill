import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication';
import authorization from './authorization';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    authorization
  },
  plugins: [
    createPersistedState({
      paths: [
        'authentication.profile',
        'authentication.loggedIn',
        'authorization.mainTableData',
        'authorization.dataFiltered'
      ]
    })
  ]
})
