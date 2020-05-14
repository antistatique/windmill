<template>
   <div class="home">
      <div class="wrap-status" v-if="this.tableData[46] == '🤔' && this.tableData[48] == '⚠️'">
        <div>
          <span class="hours">{{ this.tableData[46] }}</span>
          <div class="denominator"><span class="numerator">34</span>/ 33.6</div>
        </div>
          <!-- Button trigger modal -->
          <b-button v-b-modal.modal-scoped variant="primary">Launch demo modal</b-button>
      </div>
      <div class="wrap-status" v-else>
          <!-- Button trigger modal -->
          <b-button v-b-modal.modal-scoped variant="primary">Modifier la justification</b-button>
      </div>
      
      <b-modal id="modal-scoped">
        <template v-slot:modal-header>
          <h5>Justification des heurs</h5>
        </template>

        <template v-slot:default>
          <textarea v-model="description"></textarea>
        </template>

        <template v-slot:modal-footer="{ ok, cancel }">
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="success" @click="sendDecription(); ok();">
            Valider
          </b-button>
          <b-button size="sm" variant="danger" @click="cancel()">
            Abandonner
          </b-button>
        </template>
      </b-modal>

      <button class="btn btn-primary" v-on:click="changeDay('Monday')">Lundi</button>
      <button class="btn btn-primary" v-on:click="changeDay('Tuesday')">Mardi</button>
      <button class="btn btn-primary" v-on:click="changeDay('Wednesday')">Mercredi</button>
      <button class="btn btn-primary" v-on:click="changeDay('Thursday')">Jeudi</button>
      <button class="btn btn-primary" v-on:click="changeDay('Friday')">Vendredi</button>
      <table>
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
      <table>
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
    <button class="btn btn-primary" v-on:click="changeWeek(-1)">gauche (-)</button>
    <button class="btn btn-primary" v-on:click="changeWeek(1)">droite (+)</button>
    
    <button class="btn btn-primary" v-show="this.tableData.length > 47">test</button><br>

    <button class="btn btn-primary" v-on:click="addHour(0, 15)">15'</button>
    <button class="btn btn-primary" v-on:click="subtractHour(0, 15)">-15'</button><br>

    <button class="btn btn-primary" v-on:click="addHour(0, 30)">30'</button>
    <button class="btn btn-primary" v-on:click="subtractHour(0, 30)">-30'</button><br>

    <button class="btn btn-primary" v-on:click="addHour(0, 45)">45'</button>
    <button class="btn btn-primary" v-on:click="subtractHour(0, 45)">-45'</button><br>

    <button class="btn btn-primary" v-on:click="addHour(1, 0)">1h</button>
    <button class="btn btn-primary" v-on:click="subtractHour(1, 0)">-1h</button><br>

    <button class="btn btn-primary" v-on:click="addHour(2, 15)">2h15</button>
    <button class="btn btn-primary" v-on:click="subtractHour(2, 15)">-2h15</button><br><br>


    <button class="btn btn-primary" v-on:click="clear()">Clear</button>

  </div> 

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
    description: null,
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
      'updateSheet',
      'batchUpdateSheet'
    ]),
    sendDecription() {
      let payload = {
        'value': this.description,
        'ranges': 'AV' + this.lines
      }
      this.updateSheet(payload)
    },
    changeDay(changedDay) {
      this.currentDay = changedDay
      this.setVar()
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
    addHour(hour, minute) {
      this.pmEnd = moment(this.pmEnd, 'HH:mm').add(hour, 'h').add(minute, 'm').format('HH:mm')
      this.sendPmEnd(this.pmEnd)
    },
    subtractHour(hour, minute) {
      this.pmEnd = moment(this.pmEnd, 'HH:mm').subtract(hour, 'h').subtract(minute, 'm').format('HH:mm')
      this.sendPmEnd(this.pmEnd)
    },
    clear() {
      let payload = {
        'value': "",
        'ranges': this.days[this.currentDay].amBegin + this.lines + ":" + this.days[this.currentDay].pmEnd + this.lines,
      }
      this.batchUpdateSheet(payload).then(() => {
        this.amBegin = ""
        this.amEnd = ""
        this.pmBegin = ""
        this.pmEnd = ""
      })
    },
    sendAmBegin(amBegin){
      let payload = {
        'value': amBegin,
        'ranges': this.days[this.currentDay].amBegin + this.lines
      }
      this.updateSheet(payload)
    },
    sendAmEnd(amEnd){
      let payload = {
        'value': amEnd,
        'ranges': this.days[this.currentDay].amEnd + this.lines
      }
      this.updateSheet(payload)
    },
    sendPmBegin(pmBegin){
      let payload = {
        'value': pmBegin,
        'ranges': this.days[this.currentDay].pmBegin + this.lines
      }
      this.updateSheet(payload)
    },
    sendPmEnd(pmEnd){
      let payload = {
        'value': pmEnd,
        'ranges': this.days[this.currentDay].pmEnd + this.lines
      }
      this.updateSheet(payload)
    },
    setVar() {
      this.amBegin = this.tableData[this.days[this.currentDay].amBeginIndex],
      this.amEnd = this.tableData[this.days[this.currentDay].amEndIndex],
      this.pmBegin = this.tableData[this.days[this.currentDay].pmBeginIndex],
      this.pmEnd = this.tableData[this.days[this.currentDay].pmEndIndex],
      this.lines = this.tableData.slice(-1)[0]
      if(this.tableData[46] == '🤔') this.description = this.tableData[47]
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
