import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication';
import authorization from './authorization';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    authorization
  }
})
