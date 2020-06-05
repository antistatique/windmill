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
    keyArray: null,
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
    },
    assignKeyArray(state, payload) {
      state.keyArray = payload;
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
        response.result.values.forEach((element, index) => {
          if(index > 0){
            if (element[3] == store.state['authentication'].profile.email) {
              // index + 1 give the right line in the spreadsheet
              element.push((index+1))
              array.push(element)
            }
          }
        })
        commit('assignTableData', array);
        array.find((element, index) => {
          element[1] == state.week ? commit('assignKeyArray', index) : null
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
      });
    },
    travelWeek({ state, commit, dispatch }, payload) {
      commit('assignDataFiltered', state.mainTableData[payload.value])
    }
  }
};
