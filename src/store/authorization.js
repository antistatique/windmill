/* global gapi */
/* eslint-disable */
import * as moment from 'moment'

export default {
  namespaced: true,
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    mainTableData: null,
    loading: false,
  },
  getters: {
    tableData: state => state.mainTableData,
  },
  mutations: {
    assignTableData(state, tableData) {
      state.mainTableData = tableData;
    },
    loading(state, loadingState) {
      state.logging = loadingState;
    },
  },
  actions: {
    getSheet({
      state,
      commit
    }) {
      var ranges = [
        "saisie-2020!A1:AV"
      ];
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range: ranges
      }).then((response) => {
        console.log(response.result)
        var array = []
        response.result.values.forEach((element, index) => {
          if(index > 0){
            if (element[3] == 'gilles@antistatique.net') {
              // dire pourquoi le + 1
              element.push((index+1))
              array.push(element)
            }
          }
        })
        console.log(array)
        array.find(element => {
          if (element[1] == moment().isoWeek()) {
            commit('assignTableData', element);
            return true;
          }
        })
        if (response.status !== 200) {
          return false;
        }
      });
    },
    updateSheet({ state, commit, dispatch }, payload) {
      console.log(payload)
      var values = [
        [
          payload.value
        ],
      ];
      var body = {
        values: values
      };
      gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: state.spreadsheetId,
        range: 'saisie-2020!' + payload.column + payload.lines,
        valueInputOption: 'USER_ENTERED',
        resource: body
      }).then((response) => {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
        dispatch('getSheet')
      });
    }
  }
};
