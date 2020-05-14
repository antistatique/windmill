/* global gapi */
/* eslint-disable */

export default {
  namespaced: true,
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    filteredDataDashboard: null,
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
    getDashboardSheet({ state, commit }) {
      var ranges = [ "résumé-2020!A1:M" ];
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range: ranges
      }).then((response) => {
				console.log(response.result)
        var array = []
        response.result.values.forEach((element, index) => {
          if(index > 0){
						array.push(element)
          }
        })
        array.find(element => {
					if (element[0] == 'Guillaume') {
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
