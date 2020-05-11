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

export default {
  name: 'Home',
  data: () => ({
    amBegin : null,
    amEnd : null,
    pmBegin : null,
    pmEnd : null,
  }),
  methods: {
    ...mapActions('authorization', [
      'updateSheet'
    ]),
    sendAmBegin(amBegin){
      let payload = {
        'value': amBegin,
        'column': 'I',
        'lines': this.tableData[47]
      }
      this.updateSheet(payload)
    },
    sendAmEnd(amEnd){
      let payload = {
        'value': amEnd,
        'column': 'J',
        'lines': this.tableData[47]
      }
      this.updateSheet(payload)
    },
    sendPmBegin(pmBegin){
      let payload = {
        'value': pmBegin,
        'column': 'K',
        'lines': this.tableData[47]
      }
      this.updateSheet(payload)
    },
    sendPmEnd(pmEnd){
      let payload = {
        'value': pmEnd,
        'column': 'L',
        'lines': this.tableData[47]
      }
      this.updateSheet(payload)
    },
  computed: {
    ...mapGetters('authorization', [
      'tableData'
    ])
  },
  mounted() {
    return [
      this.amBegin = this.tableData[8],
      this.amEnd = this.tableData[9],
      this.pmBegin = this.tableData[10],
      this.pmEnd = this.tableData[11]
    ]
  }
}
</script>
