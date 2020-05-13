/* global gapi */
/* eslint-disable */
import * as moment from 'moment'
import router from '../router/index'

export default {
  namespaced: true,
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    mainTableData: null,
    dataFiltered: null,
    loading: false,
  },
  getters: {
    tableData: state => state.dataFiltered,
  },
  mutations: {
    assignTableData(state, tableData) {
      state.mainTableData = tableData;
    },
    assignDataFiltered(state, payload) {
      state.dataFiltered = payload;
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
        "saisie-2020!A1:AW"
      ];
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range: ranges
      }).then((response) => {
        console.log('Data loaded')
        var array = []
        response.result.values.forEach((element, index) => {
          if(index > 0){
            if (element[3] == 'gilles@antistatique.net') {
              // index + 1 give the right line in the spreadsheet
              element.push((index+1))
              array.push(element)
            }
          }
        })
        commit('assignTableData', array);
        array.find(element => {
          if (element[1] == moment().isoWeek()) {
            commit('assignDataFiltered', element);
            router.push('/home')
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
    },
    travelWeek({ state, commit, dispatch }, payload) {
      state.mainTableData.find(element => {
        if (element[1] == payload.value) {
          commit('assignDataFiltered', element);
          return true;
        }
      })
    }
  }
};
