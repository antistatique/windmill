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
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    authorization,
    dashboard
  },
  plugins: [
    createPersistedState({
      paths: [
        'authentication.profile',
        'authentication.signedIn',
        // 'authorization.mainTableData',
        // 'authorization.dataFiltered',
        // 'dashboard.filteredDataDashboard'
      ]
    })
  ]
})
