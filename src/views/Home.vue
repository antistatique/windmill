<template>
  <div v-if="dataLoaded == false" class="home">
		<ErrorPage/>
  </div>
  <div v-else class="home">

    <div class="stamp-hours">

      <!-- Navigations weeks -->
      <div class="header-calendar">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-arrow-left" v-on:click="changeWeek(-1)">
          <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
            <path d="M16.25,23.25,5.53,12.53a.749.749,0,0,1,0-1.06L16.25.75" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
          </g>
        </svg>
        <div>
          <div class="month">{{ monthYear }}</div>
          <div class="week">Semaine {{ week }}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-arrow-right" v-on:click="changeWeek(1)">
          <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
            <path d="M5.5.75,16.22,11.47a.749.749,0,0,1,0,1.06L5.5,23.25" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
          </g>
        </svg>
      </div>

      <!-- Justification hours -->
      <div class="wrap-status">
        <div>
          <span class="hours">Heures 🤔</span>
          <div class="denominator"><span class="numerator">{{ this.tableData[44] }}</span>/ {{ this.tableData[45] }}</div>
        </div>
        <button v-b-modal.modal-scoped class="button button-primary">Justifier les heures</button>
      </div>

      <!-- Part days -->
      <div class="calendar">
        <div class="date" :class="this.currentDay == 'Monday' ? 'selected' : ''" v-on:click="changeDay('Monday')">
          <span>{{ this.tableData[4] }}</span>
          <span class="week">Lun</span>
          <span class="day">{{ dayMonday }}</span>
          <span class="time">{{ this.tableData[7] }}</span>
        </div>
        <div class="date" :class="this.currentDay == 'Tuesday' ? 'selected' : ''" v-on:click="changeDay('Tuesday')">
          <span>{{ this.tableData[4+8] }}</span>
          <span class="week">Mar</span>
          <span class="day">{{ dayTuesday }}</span>
          <span class="time">{{ this.tableData[7+8] }}</span>
        </div>
        <div class="date" :class="this.currentDay == 'Wednesday' ? 'selected' : ''" v-on:click="changeDay('Wednesday')">
          <span>{{ this.tableData[4+16] }}</span>
          <span class="week">Mer</span>
          <span class="day">{{ dayWednesday }}</span>
          <span class="time extra-hours">{{ this.tableData[7+16] }}</span>
        </div>
        <div class="date" :class="this.currentDay == 'Thursday' ? 'selected' : ''" v-on:click="changeDay('Thursday')">
          <span>{{ this.tableData[4+24] }}</span>
          <span class="week">Jeu</span>
          <span class="day">{{ dayThursday }}</span>
          <span class="time">{{ this.tableData[7+24] }}</span>
        </div>
        <div class="date" :class="this.currentDay == 'Friday' ? 'selected' : ''" v-on:click="changeDay('Friday')">
          <span>{{ this.tableData[4+32] }}</span>
          <span class="week">Ven</span>
          <span class="day">{{ dayFriday }}</span>
          <span class="time">{{ this.tableData[7+32] }}</span>
        </div>
      </div>

      <!-- Part hours -->
      <table class="table-data entry-hours">
        <thead>
          <tr>
            <th colspan="2">Matin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Début</td>
            <td class="form-inline">
              <!-- <button class="button button-secondary" v-on:click="sendAmBegin()" :class="amBegin == '' ? '' : 'd-none'">
                <svg class="icon icon-chrono" aria-hidden="true">
                  <use :xlink:href="require('@/assets/sprite.svg')+info.icon"></use>
                </svg>
              </button> -->
              <button class="button button-secondary" v-on:click="sendAmBegin()" :class="amBegin == '' ? '' : 'd-none'">
                <BIconClock class="icon icon-chrono"/>
              </button>
              <input type="time" class="form-control d-inline col" v-model="amBegin" @blur="sendAmBegin(amBegin)" id="amBegin">
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td class="form-inline">
              <button class="button button-secondary" v-on:click="sendAmEnd()" :class="amBegin != '' && amEnd == '' ? '' : 'd-none'">
                <BIconClock style="icon icon-chrono"/>
              </button>
              <input type="time" class="form-control d-inline col" v-model="amEnd" @blur="sendAmEnd(amEnd)" id="amEnd">
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Part hours -->  
      <table class="table-data entry-hours">
        <thead>
          <tr>
            <th colspan="2">Après-midi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Début</td>
            <td class="form-inline">
              <button class="button button-secondary" v-on:click="sendPmBegin()" :class="amBegin != '' && amEnd != '' && pmBegin == '' ? '' : 'd-none'">
                <BIconClock class="icon icon-chrono"/>
              </button> 
              <input type="time" class="form-control col" v-model="pmBegin" @blur="sendPmBegin(pmBegin)" id="pmBegin">
            </td>
          </tr>
          <tr>
            <td>Fin</td>
            <td class="form-inline">
              <button class="button button-secondary" v-on:click="sendPmEnd()" :class="amBegin != '' && amEnd != '' && pmBegin != ''&& pmEnd == '' ? '' : 'd-none'">
                <BIconClock class="icon icon-chrono"/>
              </button>  
              <input type="time" class="form-control col" v-model="pmEnd" @blur="sendPmEnd(pmEnd)" id="pmEnd">
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Buttons control -->
      <div class="buttons-row">
        <button v-b-modal.setLocalStorage class="button button-primary" v-if="localAmBegin == null">Horaire habituel</button>
        <button class="button button-primary" v-else @click="storeStorage(localAmBegin, localAmEnd, localPmBegin, localPmEnd)">Horaire habituel</button>
        <button v-b-modal.addHours class="button button-primary">
          +
        </button>
        <button v-b-modal.substractHours class="button button-primary">
          -
        </button>
        <button class="button button-secondary" v-on:click="clear()">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-trash" aria-hidden="true">
            <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
              <path d="M19.452,7.5H4.547a.5.5,0,0,0-.5.545L5.334,22.181A2,2,0,0,0,7.326,24h9.347a2,2,0,0,0,1.992-1.819L19.95,8.045a.5.5,0,0,0-.129-.382A.5.5,0,0,0,19.452,7.5Zm-9.2,13a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Zm5,0a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Z" fill="#e30074" stroke="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="0"></path>
              <path d="M22,4H17.25A.25.25,0,0,1,17,3.75V2.5A2.5,2.5,0,0,0,14.5,0h-5A2.5,2.5,0,0,0,7,2.5V3.75A.25.25,0,0,1,6.75,4H2A1,1,0,0,0,2,6H22a1,1,0,0,0,0-2ZM9,3.75V2.5A.5.5,0,0,1,9.5,2h5a.5.5,0,0,1,.5.5V3.75a.25.25,0,0,1-.25.25H9.25A.25.25,0,0,1,9,3.75Z" fill="#e30074" stroke="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="0"></path>
            </g>
          </svg>
        </button>
      </div>

    </div>

    <b-modal id="modal-scoped" class="modal">
      <template v-slot:modal-header="{ cancel }">
        <h5>Justification des heures</h5>
        <button type="button" class="close">
          <span aria-hidden="true" @click="cancel()">&times;</span>
        </button>
      </template>

      <template v-slot:default>
        <textarea v-model="description" class="form-control" style="min-width: 100%"></textarea>
      </template>

      <template v-slot:modal-footer="{ ok }">
        <b-button size="sm" class="btn-costum" @click="sendDecription(); ok();">
          Valider
        </b-button>
      </template>
    </b-modal>

    <b-modal id="setLocalStorage" class="modal">
      <template v-slot:modal-header="{ cancel }">
        <h5>Définition de l'horaire habituel</h5>
        <button type="button" class="close">
          <span aria-hidden="true" @click="cancel()">&times;</span>
        </button>
      </template>

      <template v-slot:default>
        <div style="margin-top: 3%;">
					<p>Ce modal sert uniquement à sauvegarder l'horaire choisi</p>
          <div class="form-row">
            <div class="col-md-12">
              <label class="col-form-label d-flex justify-content-start" style="background-color: #edf0f3; margin-bottom: 1%; padding-left: 10px">Matin</label>
              
              <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
                <label for="amBegin" class="col-7 col-sm-7 col-md-7 col-md-9 col-lg-7 col-xl-7 col-form-label d-flex justify-content-start">Début</label>
                <div class="col-5 col-sm-5 col-md-3 col-md-5 col-lg-5 col-xl-5">
                  <input type="time" class="form-control" v-model="localAmBegin" style="text-align: center" id="amBegin">
                </div>
              </div>
              <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
                <label for="amEnd" class="col-7 col-sm-7 col-md-7 col-md-9 col-lg-7 col-xl-7 col-form-label d-flex justify-content-start">Fin</label>
                <div class="col-5 col-sm-5 col-md-3 col-md-5 col-lg-5 col-xl-5">
                  <input type="time" class="form-control absolute-center" style="text-align: center" v-model="localAmEnd" id="amEnd">
                </div>
              </div>

            </div>
            <div class="col-md-12">
              <label class="col-form-label d-flex justify-content-start" style="background-color: #edf0f3; margin-bottom: 1%; padding-left: 10px">Après-midi</label>
              
              <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
                <label for="pmBegin" class="col-7 col-sm-7 col-md-7 col-md-9 col-lg-7 col-xl-7 col-form-label d-flex justify-content-start">Début</label>
                <div class="col-5 col-sm-5 col-md-3 col-md-5 col-lg-5 col-xl-5">
                  <input type="time" class="form-control" style="text-align: center" v-model="localPmBegin" id="pmBegin">
                </div>
              </div>
              <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
                <label for="amEnd" class="col-7 col-sm-7 col-md-7 col-md-9 col-lg-7 col-xl-7 col-form-label d-flex justify-content-start">Fin</label>
                <div class="col-5 col-sm-5 col-md-3 col-md-5 col-lg-5 col-xl-5">
                  <input type="time" class="form-control" style="text-align: center" v-model="localPmEnd" id="pmEnd">
                </div>
              </div>

            </div>
          </div>
        </div>
      </template>

      <template v-slot:modal-footer="{ ok }">
        <button class="button button-validation" @click="storeStorage(localAmBegin, localAmEnd, localPmBegin, localPmEnd); ok();">
          Enregistrer
        </button>
      </template>
    </b-modal>

    <b-modal id="addHours" class="modal">
      <template v-slot:modal-header="{ cancel }">
        <h5>Ajouter du temps</h5>
        <button type="button" class="close">
          <span aria-hidden="true" @click="cancel()">&times;</span>
        </button>
      </template>

      <template v-slot:default="{ ok }"> 
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="addHour(0, 15); ok()">15'</button>
          <button class="button button-number" v-on:click="addHour(0, 30); ok()">30'</button>
          <button class="button button-number" v-on:click="addHour(0, 45); ok()">45'</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="addHour(1, 0); ok()">1h</button>
          <button class="button button-number" v-on:click="addHour(1, 15); ok()">1h15</button>
          <button class="button button-number" v-on:click="addHour(1, 30); ok()">1h30</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="addHour(1, 45); ok()">1h45</button>
          <button class="button button-number" v-on:click="addHour(2, 0); ok()">2h</button>
          <button class="button button-number" v-on:click="addHour(2, 15); ok()">2h15</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="addHour(2, 30); ok()">2h30</button>
          <button class="button button-number" v-on:click="addHour(2, 45); ok()">2h45</button>
          <button class="button button-number" v-on:click="addHour(3, 0); ok()">3h</button>
        </div>
      </template>

      <template v-slot:modal-footer="{ close }">
        <button class="button button-validation" @click="close();">
          Fermer
        </button>
      </template>
    </b-modal>

    <b-modal id="substractHours" class="modal">
      <template v-slot:modal-header="{ cancel }">
        <h5>Enlever du temps</h5>
        <button type="button" class="close">
          <span aria-hidden="true" @click="cancel()">&times;</span>
        </button>
      </template>

      <template v-slot:default="{ ok }">
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="subtractHour(0, 15); ok()">15'</button>
          <button class="button button-number" v-on:click="subtractHour(0, 30); ok()">30'</button>
          <button class="button button-number" v-on:click="subtractHour(0, 45); ok()">45'</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="subtractHour(1, 0); ok()">1h</button>
          <button class="button button-number" v-on:click="subtractHour(1, 15); ok()">1h15</button>
          <button class="button button-number" v-on:click="subtractHour(1, 30); ok()">1h30</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="subtractHour(1, 45); ok()">1h45</button>
          <button class="button button-number" v-on:click="subtractHour(2, 0); ok()">2h</button>
          <button class="button button-number" v-on:click="subtractHour(2, 15); ok()">2h15</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="button button-number" v-on:click="subtractHour(2, 30); ok()">2h30</button>
          <button class="button button-number" v-on:click="subtractHour(2, 45); ok()">2h45</button>
          <button class="button button-number" v-on:click="subtractHour(3, 0); ok()">3h</button>
        </div>
      </template>

      <template v-slot:modal-footer="{ close }">
        <button class="button button-validation" @click="close();">
          Fermer
        </button>
      </template>
    </b-modal>

  </div> 

</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'
import { BIconArrowLeft, BIconArrowRight, BIconTrash, BIconClock } from 'bootstrap-vue'
import ErrorPage from '../components/errorPage'

export default {
  name: 'Home',
  components: {
    BIconArrowLeft, 
    BIconArrowRight,
    BIconTrash,
    BIconClock,
    ErrorPage
  },
  data: () => ({
    amBegin : null,
    amEnd : null,
    pmBegin : null,
    pmEnd : null,
    localAmBegin : null,
    localAmEnd : null,
    localPmBegin : null,
    localPmEnd : null,
    lines: null,
    currentDay: null,
    week: null,
    description: null,
    monthYear: null,
    dayMonday: null,
    dayTuesday: null,
    dayWednesday: null,
    dayThursday: null,
    dayFriday: null,
    smileyMan: null,
    smileyDanger: null,
    dataLoaded: null,
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
        pmEndIndex: (11+8)
      },
      Wednesday: {
        amBegin: 'Y',
        amBeginIndex: (8+16),
        amEnd: 'Z',
        amEndIndex: (9+16),
        pmBegin: 'AA',
        pmBeginIndex: (10+16),
        pmEnd: 'AB',
        pmEndIndex: (11+16)
      },
      Thursday: {
        amBegin: 'AG',
        amBeginIndex: (8+24),
        amEnd: 'AH',
        amEndIndex: (9+24),
        pmBegin: 'AI',
        pmBeginIndex: (10+24),
        pmEnd: 'AJ',
        pmEndIndex: (11+24)
      },
      Friday: {
        amBegin: 'AO',
        amBeginIndex: (8+32),
        amEnd: 'AP',
        amEndIndex: (9+32),
        pmBegin: 'AQ',
        pmBeginIndex: (10+32),
        pmEnd: 'AR',
        pmEndIndex: (11+32)
      }
    }
  }),
  beforeCreate() {
    this.$store.dispatch('authorization/getSheet').then(() => {
      this.$store.getters['authorization/tableData'] != undefined ? this.dataLoaded = true : this.dataLoaded = false
      this.setVar()
    })
  },
  methods: {
    storeStorage(amBegin, amEnd, pmBegin, pmEnd) {
      if(amBegin != '' && amEnd != '' && pmBegin != '' && pmEnd != '') {
        localStorage.setItem('hoursPlanified', JSON.stringify({
          amBegin: amBegin,
          amEnd: amEnd,
          pmBegin: pmBegin,
          pmEnd: pmEnd,
        }))
  
        let payload = {
          'value': {
            amBegin,
            amEnd,
            pmBegin,
            pmEnd,
          },
          'ranges': this.days[this.currentDay].amBegin + this.lines + ":" + this.days[this.currentDay].pmEnd + this.lines,
        }
        
        this.batchUpdateSheet(payload)
        this.amBegin = amBegin,
        this.amEnd = amEnd,
        this.pmBegin = pmBegin,
        this.pmEnd = pmEnd
      }
    },
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
      this.$store.state['authorization'].week = this.week
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
      amBegin == undefined ? amBegin = moment().format('HH:mm') : null
      let payload = {
        'value': amBegin,
        'ranges': this.days[this.currentDay].amBegin + this.lines
      }
      this.updateSheet(payload)
      this.amBegin = amBegin
    },
    sendAmEnd(amEnd){
      amEnd == undefined ? amEnd = moment().format('HH:mm') : null
      let payload = {
        'value': amEnd,
        'ranges': this.days[this.currentDay].amEnd + this.lines
      }
      this.updateSheet(payload)
      this.amEnd = amEnd
    },
    sendPmBegin(pmBegin){
      pmBegin == undefined ? pmBegin = moment().format('HH:mm') : null
      let payload = {
        'value': pmBegin,
        'ranges': this.days[this.currentDay].pmBegin + this.lines
      }
      this.updateSheet(payload)
      this.pmBegin = pmBegin
    },
    sendPmEnd(pmEnd){
      pmEnd == undefined ? pmEnd = moment().format('HH:mm') : null
      let payload = {
        'value': pmEnd,
        'ranges': this.days[this.currentDay].pmEnd + this.lines
      }
      this.updateSheet(payload)
      this.pmEnd = pmEnd
    },
    setVar() {
      this.amBegin = this.tableData[this.days[this.currentDay].amBeginIndex],
      this.amEnd = this.tableData[this.days[this.currentDay].amEndIndex],
      this.pmBegin = this.tableData[this.days[this.currentDay].pmBeginIndex],
      this.pmEnd = this.tableData[this.days[this.currentDay].pmEndIndex],
      this.lines = this.tableData.slice(-1)[0],
      this.monthYear = moment(this.tableData[0], 'YYYY-MM-DD', 'Fr', true).format('MMMM YYYY').toUpperCase(),
      this.dayMonday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).format('DD'),
      this.dayTuesday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(1, 'd').format('DD'),
      this.dayWednesday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(2, 'd').format('DD'),
      this.dayThursday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(3, 'd').format('DD'),
      this.dayFriday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(4, 'd').format('DD')
      if (this.tableData[46] == '🤔' && this.tableData[48] == '⚠️') {
        this.smileyMan = this.tableData[46]
        this.smileyDanger = this.tableData[48]
      }
      else {
        this.smileyMan = null
        this.smileyDanger = null
      }
      if(this.tableData[46] == '🤔' || this.tableData[46] == '') this.description = this.tableData[47]
    }
  },
  computed: {
    ...mapGetters('authorization', [
      'tableData'
    ])
  },
  mounted() {
    if(localStorage.getItem('hoursPlanified') != null){
      this.localAmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).amBegin
      this.localAmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).amEnd
      this.localPmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).pmBegin
      this.localPmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).pmEnd
    }
    return [
      this.week = moment().isoWeek(),
      this.currentDay = moment().format('dddd'),
    ]
  }
}
</script>