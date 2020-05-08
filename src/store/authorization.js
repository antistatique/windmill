/* global gapi */
/* eslint-disable */

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
    querySheet({
      state,
      commit
    }) {
      var ranges = [
        "saisie-2020!A1:AV"
      ];
      gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then((resp) => {
        console.log(resp)
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: state.spreadsheetId,
          range: ranges
        }).then((response) => {
          console.log(response.result)
          if (response.status !== 200) {
            return false;
          }
          // commit('assignTableData', array);
          return true;
        });
      });
    },
  }
};
