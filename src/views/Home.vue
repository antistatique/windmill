<template>
   <div class="home">
      <table class=" table-data entry-hours">
        <thead>
          <tr>
            <th colspan="2">Matin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Début</td>
            <td>
              <input type="time" v-model="amBegin" v-on:keyup.enter="sendAmBegin(amBegin)">
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td><input type="time" v-model="amEnd" v-on:keyup.enter="sendAmEnd(amEnd)"></td>
          </tr>
        </tbody>
      </table>
      <table class=" table-data entry-hours">
        <thead>
          <tr>
            <th colspan="2">Après-midi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Début</td>
            <td>
              <input type="time" v-model="pmBegin" v-on:keyup.enter="sendPmBegin(pmBegin)">
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td><input type="time" v-model="pmEnd" v-on:keyup.enter="sendPmEnd(pmEnd)"></td>
          </tr>
        </tbody>
      </table>

</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'

export default {
  name: 'Home',
  data: () => ({
    amBegin : null,
    amEnd : null,
    pmBegin : null,
    pmEnd : null,
    lines: null,
    currentDay: null,
    days: {
      Monday: {
        amBegin: 'I',
        amBeginIndex: 8,
        amEnd: 'J',
        amEndIndex: 9,
        pmBegin: 'K',
        pmBeginIndex: 10,
        pmEnd: 'L',
        pmEndIndex: 11,
      },
      Tuesday: {
        amBegin: 'Q',
        amBeginIndex: (8+8),
        amEnd: 'R',
        amEndIndex: (9+8),
        pmBegin: 'S',
        pmBeginIndex: (10+8),
        pmEnd: 'T',
        pmEndIndex: (11+8),
      },
      Wednesday: {
        amBegin: 'Y',
        amBeginIndex: (8+16),
        amEnd: 'Z',
        amEndIndex: (8+16),
        pmBegin: 'AA',
        pmBeginIndex: (8+16),
        pmEnd: 'AB',
        pmEndIndex: (8+16),
      },
      Thursday: {
        amBegin: 'AG',
        amBeginIndex: (8+24),
        amEnd: 'AH',
        amEndIndex: (8+24),
        pmBegin: 'AI',
        pmBeginIndex: (8+24),
        pmEnd: 'AJ',
        pmEndIndex: (8+24),
      },
      Friday: {
        amBegin: 'AO',
        amBeginIndex: (8+32),
        amEnd: 'AP',
        amEndIndex: (8+32),
        pmBegin: 'AQ',
        pmBeginIndex: (8+32),
        pmEnd: 'AR',
        pmEndIndex: (8+32),
      }
    }
  }),
  methods: {
    ...mapActions('authorization', [
      'getSheet',
      'updateSheet'
    ]),
    sendAmBegin(amBegin){
      let payload = {
        'value': amBegin,
        'column': this.days[this.currentDay].amBegin,
        'lines': this.lines
      }
      this.updateSheet(payload)
    },
    sendAmEnd(amEnd){
      let payload = {
        'value': amEnd,
        'column': this.days[this.currentDay].amEnd,
        'lines': this.lines
      }
      this.updateSheet(payload)
    },
    sendPmBegin(pmBegin){
      let payload = {
        'value': pmBegin,
        'column': this.days[this.currentDay].pmBegin,
        'lines': this.lines
      }
      this.updateSheet(payload)
    },
    sendPmEnd(pmEnd){
      let payload = {
        'value': pmEnd,
        'column': this.days[this.currentDay].pmEnd,
        'lines': this.lines
      }
      this.updateSheet(payload)
    },
  computed: {
    ...mapGetters('authorization', [
      'tableData'
    ])
  },
  mounted() {
    this.currentDay = moment().format('dddd')
    return [
      this.amBegin = this.tableData[this.days[this.currentDay].amBeginIndex],
      this.amEnd = this.tableData[this.days[this.currentDay].amEndIndex],
      this.pmBegin = this.tableData[this.days[this.currentDay].pmBeginIndex],
      this.pmEnd = this.tableData[this.days[this.currentDay].pmEndIndex],
      this.lines = this.tableData[47]
    ]
  }
}
</script>
