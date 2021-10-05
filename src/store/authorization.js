/* global gapi */
/* eslint-disable */
import * as moment from 'moment'
import store from './index'

export default {
  namespaced: true,
  // Variable waiting values
  state: {
    spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
    mainTableData: null,
    dataFiltered: null,
    keyArray: null,
    currentYear: moment().year(),
    week: moment().isoWeek(),
    smiley: null
  },
  // Give the values
  getters: {
    tableData: state => state.dataFiltered,
  },
  // Store the values in the state corresponding
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
    assignSmiley(state, payload) {
      state.smiley = payload
    }
  },
  // Make the calls to the API
  actions: {
    // Get all the values from the spreadsheet
    async getSheet({ state, commit, dispatch }) {
      let ranges = [ `saisie-${state.currentYear}!A1:AW` ];
      await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range: ranges
      }).then((response) => {
        let array = []
        response.result.values.forEach((element, index) => {
          if(index > 0){
            // First filter to get all the rows for the user connected
            if (element[3] === store.state['authentication'].profile.email) {
              // index + 1 give the right line in the spreadsheet
              element.push((index+1))
              array.push(element)
            }
          }
        })
        commit('assignTableData', array);
        // Second filter for showing the right week
        array.find((element, index) => {
          element[1] == state.week ? commit('assignKeyArray', index) : null
          if (element[1] == state.week) {
            dispatch('getSmiley', { 'line': element.slice(-1)[0] })
            commit('assignDataFiltered', element);
            return true;
          }
        })
        if (response.status !== 200) {
          return false;
        }
      });
    },
    // Update a cell in the spreadsheet
    updateSheet({ state, commit, dispatch }, payload) {
      let values = [
        [
          payload.value
        ],
      ];
      let body = {
        values: values
      };
      gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: state.spreadsheetId,
        range: `saisie-${state.currentYear}!${payload.ranges}`,
        valueInputOption: 'USER_ENTERED',
        resource: body
      }).then(() => {
        dispatch('getSmiley', payload)
      });
    },
    // Update multiple cells in the spreadsheet
    batchUpdateSheet({ state, dispatch }, payload) {
      let values;
      payload.value === "" ? values = [["", "", "", ""]] : values = [[payload.value.amBegin, payload.value.amEnd, payload.value.pmBegin, payload.value.pmEnd]]
      let body = [
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
        dispatch('getSmiley', payload)
      });
    },
    // Return or not the smiley in the column AU in the spreadsheet
    async getSmiley({ state, commit }, payload) {
      var ranges = [ `saisie-${state.currentYear}!AU${payload.line}` ];
      await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range: ranges
      }).then((response) => {
        if (!response.result.hasOwnProperty('values')) {
          commit('assignSmiley', '')
        }

        if (response.result.hasOwnProperty('values') && !response.result.values.includes('#NUM!')) {
          const [values] = response.result.values;
          commit('assignSmiley', values[0])
        }
      });
    },
    // Get the right week in the table data
    travelWeek({ state, commit }, payload) {
      commit('assignDataFiltered', state.mainTableData[payload.value])
    }
  }
};
