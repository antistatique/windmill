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
              <input type="time" v-model="amBegin" @blur="sendAmBegin(amBegin)">
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td><input type="time" v-model="amEnd" @blur="sendAmEnd(amEnd)"></td>
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
              <input type="time" v-model="pmBegin" @blur="sendPmBegin(pmBegin)">
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td><input type="time" v-model="pmEnd" @blur="sendPmEnd(pmEnd)"></td>
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
    week: null,
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
        amEndIndex: (9+16),
        pmBegin: 'AA',
        pmBeginIndex: (10+16),
        pmEnd: 'AB',
        pmEndIndex: (11+16),
      },
      Thursday: {
        amBegin: 'AG',
        amBeginIndex: (8+24),
        amEnd: 'AH',
        amEndIndex: (9+24),
        pmBegin: 'AI',
        pmBeginIndex: (10+24),
        pmEnd: 'AJ',
        pmEndIndex: (11+24),
      },
      Friday: {
        amBegin: 'AO',
        amBeginIndex: (8+32),
        amEnd: 'AP',
        amEndIndex: (9+32),
        pmBegin: 'AQ',
        pmBeginIndex: (10+32),
        pmEnd: 'AR',
        pmEndIndex: (11+32),
      }
    }
  }),
  methods: {
    ...mapActions('authorization', [
      'travelWeek',
      'updateSheet'
    ]),
    changeDay(changedDay) {
      this.amBegin = this.tableData[this.days[changedDay].amBeginIndex]
      this.amEnd = this.tableData[this.days[changedDay].amEndIndex]
      this.pmBegin = this.tableData[this.days[changedDay].pmBeginIndex]
      this.pmEnd = this.tableData[this.days[changedDay].pmEndIndex]
      this.currentDay = changedDay
    },
    changeWeek(nbWeek) {
      this.week = this.week+(nbWeek)
      let payload = {
        'value': this.week,
      }
      this.travelWeek(payload).then(() => {
        this.setVar()
      })
    },
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
    setVar() {
      this.amBegin = this.tableData[this.days[this.currentDay].amBeginIndex],
      this.amEnd = this.tableData[this.days[this.currentDay].amEndIndex],
      this.pmBegin = this.tableData[this.days[this.currentDay].pmBeginIndex],
      this.pmEnd = this.tableData[this.days[this.currentDay].pmEndIndex],
      this.lines = this.tableData.slice(-1)[0]
    }
  },
  computed: {
    ...mapGetters('authorization', [
      'tableData'
    ])
  },
  mounted() {
    return [
      this.week = moment().isoWeek(),
      this.currentDay = moment().format('dddd'),
      this.setVar()
    ]
  }
}
</script>
