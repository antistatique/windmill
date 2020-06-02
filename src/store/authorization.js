/* global gapi */
/* eslint-disable */
import * as moment from 'moment'
import store from './index'

export default {
  namespaced: true,
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    mainTableData: null,
    dataFiltered: null,
    currentYear: moment().year(),
    week: moment().isoWeek()
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
      state.redirect = true
    },
  },
  actions: {
    async getSheet({ state, commit }) {
      var ranges = [ `saisie-${state.currentYear}!A1:AW` ];
      await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range: ranges
      }).then((response) => {
        console.log('Data loaded')
        var array = []
        // var arrayTest = []
        
        
        // var test = Object.assign(...response.result.values[0].map((k, i) => ({[k]: response.result.values[1][i]})))

        response.result.values.forEach((element, index) => {
          if(index > 0){
            if (element[3] == store.state['authentication'].profile.email) {
              // index + 1 give the right line in the spreadsheet
              element.push((index+1))
              array.push(element)
              // arrayTest.push(Object.assign(...response.result.values[0].map((k, i) => ({[k]: element[i]})), {'line': index+1}))
            }
          }
        })
        commit('assignTableData', array);
        array.find(element => {
          if (element[1] == state.week) {
            commit('assignDataFiltered', element);
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
        range: `saisie-${state.currentYear}!${payload.ranges}`,
        valueInputOption: 'USER_ENTERED',
        resource: body
      }).then((response) => {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
        console.log('data modified')
      });
    },
    batchUpdateSheet({ state, dispatch }, payload) {
      var values;
      payload.value == "" ? values = [["", "", "", ""]] : values = [[payload.value.amBegin, payload.value.amEnd, payload.value.pmBegin, payload.value.pmEnd]]
      var body = [
        {
          range: `saisie-${state.currentYear}!${payload.ranges}`,
          values: values
        }
      ];
      gapi.client.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: state.spreadsheetId,
        valueInputOption: 'USER_ENTERED',
        data: body
      }).then(() => {
        console.log('cells updated');
        // dispatch('getSheet')
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
