/* global gapi */
/* eslint-disable */
import * as moment from 'moment'
import store from './index'

export default {
  namespaced: true,
  // Variable waiting values
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    filteredDataDashboard: null,
    currentYear: moment().year(),
  },
  // Give the values 
  getters: {
    getDataDashboard: state => state.filteredDataDashboard,
  },
  // Store the values in the state corresponding 
  mutations: {
    assignDashboardData(state, payload) {
      state.filteredDataDashboard = payload;
    }
  },
  // Make the calls to the API
  actions: {
    // Get all the values for the dashboard 
    async getDashboardSheet({ state, commit }) {
      var ranges = [ `résumé-${state.currentYear}!A1:M` ];
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
        // Filter the data for the user connected
        array.find(element => {
					if (element[12] == store.state['authentication'].profile.email) {
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
