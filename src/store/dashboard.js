/* global gapi */
/* eslint-disable */
import * as moment from 'moment'
import store from './index'

export default {
  namespaced: true,
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    filteredDataDashboard: null,
    currentYear: moment().year(),
  },
  getters: {
    getDataDashboard: state => state.filteredDataDashboard,
  },
  mutations: {
    assignDashboardData(state, payload) {
      state.filteredDataDashboard = payload;
    }
  },
  actions: {
    async getDashboardSheet({ state, commit }) {
      var ranges = [ `résumé-${state.currentYear}!A1:N` ];
      await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range: ranges
      }).then((response) => {
        var array = []
        response.result.values.forEach((element, index) => {
          if(index > 0){
						array.push(element)
          }
        })
        array.find(element => {
					if (element[13] == store.state['authentication'].profile.email) {
						commit('assignDashboardData', element);
						return true 
					}
        })
        console.log('Dashboard loaded')
        if (response.status !== 200) {
          return false;
        }
      });
    }
  }
};
