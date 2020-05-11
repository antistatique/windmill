/* global gapi */
/* eslint-disable */
import * as moment from 'moment'

export default {
  namespaced: true,
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    mainTableData: null,
    loading: false,
    mainRangeData: null
  },
  getters: {
    tableData: state => state.mainTableData,
    rangeData: state => state.mainRangeData,
  },
  mutations: {
    assignTableData(state, tableData) {
      state.mainTableData = tableData;
    },
    assignRangeData(state, rangeData) {
      state.mainRangeData = rangeData;
    },
    loading(state, loadingState) {
      state.logging = loadingState;
    },
  },
  actions: {
    sheetQuery({
      state,
      commit
    }) {
      var ranges = [
        "saisie-2020!A1:AV"
      ];
      gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(() => {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: state.spreadsheetId,
          range: ranges
        }).then((response) => {
          console.log(response.result)
          var array = []
          response.result.values.forEach((element, index) => {
            if(index > 0){
              if (element[2] == 'Gilles') {
                element.push((index+1))
                array.push(element)
              }
            }
          })
          // console.log(array)
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
      });
    }
  }
};
