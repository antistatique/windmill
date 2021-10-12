<template>
  <div class="home mx-auto bg-white min-vh-100 p-1" :style="{maxWidth: '730px', minWidth: '330px'}">
    <div class="stamp-hours">
      <WeekNavigation :store="$store" :currentWeek="this.week" :currentMonth="this.monthYear" :changeWeek="changeWeek"
                      :today="today"/>

      <Justification :store="$store" :currentWeek="this.week" :baseWeek="this.currentWeek" :showSmiley="showSmiley"
                     :toggleModaleJustifyHour="toggleModaleJustifyHour" :tableData="tableData"/>


      <!-- Part days -->
      <div class="calendar">
        <Day day="Lun" daySelector="Monday" :tableDataOffset="0" :tooltip="days.Monday.tooltip"
            :dayDate="dayMonday" :currentDay="this.currentDay" :changeDay="changeDay"
             :tableData="this.tableData"/>
        <Day day="Mar" daySelector="Tuesday" :tableDataOffset="8" :tooltip="days.Tuesday.tooltip"
             :dayDate="dayTuesday" :currentDay="this.currentDay" :changeDay="changeDay"
             :tableData="this.tableData"/>
        <Day day="Mer" daySelector="Wednesday" :tableDataOffset="16" :tooltip="days.Wednesday.tooltip"
             :dayDate="dayWednesday" :currentDay="this.currentDay" :changeDay="changeDay"
             :tableData="this.tableData"/>
        <Day day="Jeu" daySelector="Thursday" :tableDataOffset="24" :tooltip="days.Thursday.tooltip"
            :dayDate="dayThursday" :currentDay="this.currentDay" :changeDay="changeDay"
             :tableData="this.tableData"/>
        <Day day="Ven" daySelector="Friday" :tableDataOffset="32" :tooltip="days.Friday.tooltip"
             :dayDate="dayFriday" :currentDay="this.currentDay" :changeDay="changeDay"
             :tableData="this.tableData"/>
      </div>

      <!-- Part hours -->
      <table class="table-data entry-hours">
        <thead>
        <tr>
          <th :colspan="amBegin === '' || amEnd === '' ? 3 : 2">Matin</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Début</td>
          <td class="d-inline-flex col-2">
            <button class="button button-secondary" v-on:click="sendAmBegin()" :class="amBegin === '' ? '' : 'd-none'">
              <BIconClock class="icon icon-chrono"/>
            </button>
          </td>
          <td class="d-inline-flex col-10">
            <input type="time" class="form-control col" v-model="amBegin" @blur="sendAmBegin(amBegin)" id="amBegin">
          </td>
        </tr>
        <tr>
          <td>Fin</td>
          <td class="d-inline-flex col-2">
            <button class="button button-secondary" v-on:click="sendAmEnd()"
                    :class="amBegin !== '' && amEnd === '' ? '' : 'd-none'">
              <BIconClock style="icon icon-chrono"/>
            </button>
          </td>
          <td class="d-inline-flex col-10">
            <input type="time" class="form-control d-inline col" v-model="amEnd" @blur="sendAmEnd(amEnd)" id="amEnd">
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Part hours -->
      <table class="table-data entry-hours">
        <thead>
        <tr>
          <th :colspan="pmBegin === '' || pmEnd === '' ? 3 : 2">Après-midi</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Début</td>
          <td class="d-inline-flex col-2">
            <button class="button button-secondary" v-on:click="sendPmBegin()"
                    :class="amBegin !== '' && amEnd !== '' && pmBegin === '' ? '' : 'd-none'">
              <BIconClock class="icon icon-chrono"/>
            </button>
          </td>
          <td class="d-inline-flex col-10">
            <input type="time" class="form-control col" v-model="pmBegin" @blur="sendPmBegin(pmBegin)" id="pmBegin">
          </td>
        </tr>
        <tr>
          <td>Fin</td>
          <td class="d-inline-flex col-2">
            <button class="button button-secondary" v-on:click="sendPmEnd()"
                    :class="amBegin !== '' && amEnd !== '' && pmBegin !== ''&& pmEnd === '' ? '' : 'd-none'">
              <BIconClock class="icon icon-chrono"/>
            </button>
          </td>
          <td class="d-inline-flex col-10">
            <input type="time" class="form-control col" v-model="pmEnd" @blur="sendPmEnd(pmEnd)" id="pmEnd">
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Buttons control -->
      <div class="buttons-row">
        <customButton :action="toggleModaleSetHour" :text="'Horaire habituel'" :variant="'button button-primary'"
                      v-if="localAmBegin == null"/>
        <button class="button button-primary" v-else
                @click="storeStorage(localAmBegin, localAmEnd, localPmBegin, localPmEnd)">Horaire habituel
        </button>
        <customButton :action="toggleModaleAddHour" :text="'+'" :variant="'button button-primary'"/>
        <customButton :action="toggleModaleSubtractHour" :text="'-'" :variant="'button button-primary'"/>
        <button class="button button-secondary" v-on:click="clear()">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
               xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="icon icon-trash" aria-hidden="true">
            <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
              <path
                  d="M19.452,7.5H4.547a.5.5,0,0,0-.5.545L5.334,22.181A2,2,0,0,0,7.326,24h9.347a2,2,0,0,0,1.992-1.819L19.95,8.045a.5.5,0,0,0-.129-.382A.5.5,0,0,0,19.452,7.5Zm-9.2,13a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Zm5,0a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Z"
                  fill="#e30074" stroke="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="0"></path>
              <path
                  d="M22,4H17.25A.25.25,0,0,1,17,3.75V2.5A2.5,2.5,0,0,0,14.5,0h-5A2.5,2.5,0,0,0,7,2.5V3.75A.25.25,0,0,1,6.75,4H2A1,1,0,0,0,2,6H22a1,1,0,0,0,0-2ZM9,3.75V2.5A.5.5,0,0,1,9.5,2h5a.5.5,0,0,1,.5.5V3.75a.25.25,0,0,1-.25.25H9.25A.25.25,0,0,1,9,3.75Z"
                  fill="#e30074" stroke="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="0"></path>
            </g>
          </svg>
        </button>
      </div>

    </div>

    <div class="bloc-modale" style="backdrop-filter: blur(5px) brightness(30%)" v-if="isModalJustifyHourOpen">
      <div class="overlay" v-on:click="toggleModaleJustifyHour"></div>

      <div class="modale container rounded-lg px-4 pt-5" style="background: white; max-width: 730px; position: relative;">
        <div v-on:click="toggleModaleJustifyHour" class="btn-modale">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px" y="0px"
               viewBox="0 0 512.001 512.001" xml:space="preserve">
						<g>
							<path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
								L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
								c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
								l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
								L284.286,256.002z"/>
						</g>
					</svg>
        </div>
        <div class="commentary pointer">
          <h2 class="title">Justifier vos heures</h2>

          <textarea v-model="description"
                    :placeholder="description == '' ? 'La raison de votre heure supplémentaire':''" class="form-control"
                    style="min-width: 100%">La raison de votre heure supplémentaire</textarea>
          <button class="button button-validation" @click="sendDescription();">Valider</button>
        </div>
      </div>
    </div>

    <modalJustifyHours :revele="isModalSetHourOpen" :toggleModal="toggleModaleSetHour"
                       :action="storeStorage"></modalJustifyHours>

    <modalHours :revele="isModalAddHourOpen" :toggleModal="toggleModaleAddHour" :action="addHour"
                :name="'Ajouter du temps'"></modalHours>

    <modalHours :revele="isModalSubtractHourOpen" :toggleModal="toggleModaleSubtractHour" :action="subtractHour"
                :name="'Enlever du temps'"></modalHours>

  </div>

</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'
import { BIconArrowLeft, BIconArrowRight, BIconTrash, BIconClock } from 'bootstrap-vue'
import ErrorPage from '../components/errorPage'
import modalHours from '../components/ModalHours'
import modalJustifyHours from '../components/ModalJustifyHours'
import customButton from '../components/Button'
import Justification from '../components/Justification'
import WeekNavigation from '../components/calendar/WeekNavigation'
import Day from '../components/calendar/Day'

export default {
  name: 'Home',
  components: {
    BIconArrowLeft,
    BIconArrowRight,
    BIconTrash,
    BIconClock,
    ErrorPage,
    modalHours,
    modalJustifyHours,
    customButton,
    WeekNavigation,
    Justification,
    Day,
  },
  data: () => ({
    showSmiley: false,
    hoursTot: null,
    isModalAddHourOpen: false,
    isModalSubtractHourOpen: false,
    isModalJustifyHourOpen: false,
    isModalSetHourOpen: false,
    amBegin: null,
    amEnd: null,
    pmBegin: null,
    pmEnd: null,
    localAmBegin: null,
    localAmEnd: null,
    localPmBegin: null,
    localPmEnd: null,
    lines: null,
    currentDay: null,
    currentWeek: null,
    week: null,
    unchangedWeek: null,
    description: null,
    monthYear: null,
    dayMonday: null,
    dayTuesday: null,
    dayWednesday: null,
    dayThursday: null,
    dayFriday: null,
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
        tooltip: null,
      },
      Tuesday: {
        amBegin: 'Q',
        amBeginIndex: (8 + 8),
        amEnd: 'R',
        amEndIndex: (9 + 8),
        pmBegin: 'S',
        pmBeginIndex: (10 + 8),
        pmEnd: 'T',
        pmEndIndex: (11 + 8),
        tooltip: null,
      },
      Wednesday: {
        amBegin: 'Y',
        amBeginIndex: (8 + 16),
        amEnd: 'Z',
        amEndIndex: (9 + 16),
        pmBegin: 'AA',
        pmBeginIndex: (10 + 16),
        pmEnd: 'AB',
        pmEndIndex: (11 + 16),
        tooltip: null,
      },
      Thursday: {
        amBegin: 'AG',
        amBeginIndex: (8 + 24),
        amEnd: 'AH',
        amEndIndex: (9 + 24),
        pmBegin: 'AI',
        pmBeginIndex: (10 + 24),
        pmEnd: 'AJ',
        pmEndIndex: (11 + 24),
        tooltip: null,
      },
      Friday: {
        amBegin: 'AO',
        amBeginIndex: (8 + 32),
        amEnd: 'AP',
        amEndIndex: (9 + 32),
        pmBegin: 'AQ',
        pmBeginIndex: (10 + 32),
        pmEnd: 'AR',
        pmEndIndex: (11 + 32),
        tooltip: null,
      },
    },
  }),
  // Call the API for storing the values
  beforeCreate() {
    this.$store.dispatch('authorization/getSheet').then(() => {
      typeof this.$store.getters['authorization/tableData'] !== 'undefined' ? this.dataLoaded = true : this.dataLoaded = false
      this.unchangedWeek = this.$store.state['authorization'].keyArray
      this.setVar()
      this.calculateHours()
    }).catch((e) => {
      this.$store.state.error = "Windmill n'as pas reçu de données"
    })
  },
  methods: {
    // 4 next functions will show a different modal
    toggleModaleAddHour: function() {
      this.isModalAddHourOpen = !this.isModalAddHourOpen;
    },
    toggleModaleSubtractHour: function() {
      this.isModalSubtractHourOpen = !this.isModalSubtractHourOpen;
    },
    toggleModaleJustifyHour: function() {
      this.isModalJustifyHourOpen = !this.isModalJustifyHourOpen;
    },
    toggleModaleSetHour: function() {
      this.isModalSetHourOpen = !this.isModalSetHourOpen;
    },
    // Back to the current week
    today() {
      this.$store.state['authorization'].keyArray = this.unchangedWeek
      this.currentDay = moment().format('dddd')
      let payload = {
        'value': this.unchangedWeek,
      }
      this.travelWeek(payload).then(() => {
        this.setVar()
      })
    },
    // Show tootips on the emojis
    tooltips(smiley) {
      let data = {
        '🇨🇭': 'Jour férié',
        '💪': 'Jour de travail',
        '✈️': 'Jour de congé',
        '😷': 'Absence justifiée',
        '💤': 'Jour de repos',
        '⚖️': 'Reprise d\'heures supplémentaires',
        '🎓': 'Jour de formation',
      }
      return data[smiley]
    },
    // Set or store values from the local storage
    storeStorage(amBegin, amEnd, pmBegin, pmEnd) {
      if (amBegin !== '' && amEnd !== '' && pmBegin !== '' && pmEnd !== '') {
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
          'ranges': this.days[this.currentDay].amBegin + this.lines + ':' + this.days[this.currentDay].pmEnd + this.lines,
          'line': this.lines,
        }

        this.batchUpdateSheet(payload)
        this.amBegin = amBegin,
            this.amEnd = amEnd,
            this.pmBegin = pmBegin,
            this.pmEnd = pmEnd
        this.isModalSetHourOpen = false;
        this.tableData.splice(this.days[this.currentDay].amBeginIndex, 4, amBegin, amEnd, pmBegin, pmEnd)
        this.setHours()
      }
    },
    // Get methods form the store
    ...mapActions('authorization', [
      'travelWeek',
      'updateSheet',
      'batchUpdateSheet',
      'getSmiley',
    ]),
    // Store description
    sendDescription() {
      let payload = {
        'value': this.description,
        'ranges': 'AV' + this.lines,
      }
      // Send in the spreadsheet
      this.updateSheet(payload)
      // Store value in the table data
      this.tableData.splice(this.days['Friday'].pmEndIndex + 4, 1, this.description)
      this.isModalJustifyHourOpen = !this.isModalJustifyHourOpen;
    },
    changeDay(changedDay) {
      // Get the day when clicked on it
      this.currentDay = changedDay
      this.setVar()
      this.setHours()
    },
    changeWeek(nbWeek) {
      // Get the new week
      let payload = {
        'value': this.$store.state['authorization'].keyArray += (nbWeek),
      }
      this.travelWeek(payload).then(() => {
        this.setVar()
      })
    },
    // Add hour fast
    addHour(hour, minute) {
      let res
      // Get the last input with a hour and add an hour
      if (this.pmEnd !== '') {
        res = moment(this.pmEnd, 'HH:mm').add(hour, 'h').add(minute, 'm').format('HH:mm')
      } else if (this.pmBegin !== '') {
        res = moment(this.pmBegin, 'HH:mm').add(hour, 'h').add(minute, 'm').format('HH:mm')
      } else if (this.amEnd !== '') {
        res = moment(this.amEnd, 'HH:mm').add(hour, 'h').add(minute, 'm').format('HH:mm')
      } else if (this.amBegin !== '') {
        res = moment(this.amBegin, 'HH:mm').add(hour, 'h').add(minute, 'm').format('HH:mm')
      }
      this.sendPmEnd(res)
      this.isModalAddHourOpen = !this.isModalAddHourOpen;
    },
    // Remove hour fast
    subtractHour(hour, minute) {
      let res
      // Get the last input with a hour and subtract an hour
      if (this.pmEnd !== '') {
        res = moment(this.pmEnd, 'HH:mm').subtract(hour, 'h').subtract(minute, 'm').format('HH:mm')
      } else if (this.pmBegin !== '') {
        res = moment(this.pmBegin, 'HH:mm').subtract(hour, 'h').subtract(minute, 'm').format('HH:mm')
      } else if (this.amEnd !== '') {
        res = moment(this.amEnd, 'HH:mm').subtract(hour, 'h').subtract(minute, 'm').format('HH:mm')
      } else if (this.amBegin !== '') {
        res = moment(this.amBegin, 'HH:mm').subtract(hour, 'h').subtract(minute, 'm').format('HH:mm')
      }
      this.sendPmEnd(res)
      this.isModalSubtractHourOpen = !this.isModalSubtractHourOpen;
    },
    // Clear all the inputs
    clear() {
      let payload = {
        'value': '',
        'ranges': this.days[this.currentDay].amBegin + this.lines + ':' + this.days[this.currentDay].pmEnd + this.lines,
        'line': this.lines,
      }
      this.batchUpdateSheet(payload).then(() => {
        // Empty all the inputs
        this.amBegin = ''
        this.amEnd = ''
        this.pmBegin = ''
        this.pmEnd = ''

        // Store the new value in the table data
        this.tableData.splice(this.days[this.currentDay].amBeginIndex, 4, '', '', '', '')
        this.hoursTot = '00:00'
        this.tableData.splice(this.days[this.currentDay].amBeginIndex - 1, 1, this.hoursTot)
        this.tableData.splice(this.days[this.currentDay].amBeginIndex - 2, 1, '0')
      })
      this.tableData.splice(this.days['Friday'].pmEndIndex + 1, 1, (this.tableData.slice(44)[0] - (moment(this.tableData[this.days[this.currentDay].amBeginIndex - 1], 'HH:mm').hours() + moment(this.tableData[this.days[this.currentDay].amBeginIndex - 1], 'HH:mm').minute() / 60)).toFixed(2))
    },
    // Store first hour for the morning
    sendAmBegin(amBegin) {
      // Set current hour (with the chrono)
      // Check if it's the current hour entered or an hour from the input
      typeof amBegin === 'undefined' ? amBegin = moment().format('HH:mm') : null
      let payload = {
        'value': amBegin,
        'ranges': this.days[this.currentDay].amBegin + this.lines,
        'line': this.lines,
      }
      // Store in the spreadsheet
      this.updateSheet(payload)
      this.amBegin = amBegin
      // Store in the table data
      this.tableData.splice(this.days[this.currentDay].amBeginIndex, 1, this.amBegin)
      // Get right hours for the day
      this.setHours()
    },
    // Store last hour for the morning
    sendAmEnd(amEnd) {
      // Check if it's the current hour entered or an hour from the input
      typeof amEnd === 'undefined' ? amEnd = moment().format('HH:mm') : null
      let payload = {
        'value': amEnd,
        'ranges': this.days[this.currentDay].amEnd + this.lines,
        'line': this.lines,
      }
      // Store in the spreadsheet
      this.updateSheet(payload)
      this.amEnd = amEnd
      // Store in the table data
      this.tableData.splice(this.days[this.currentDay].amEndIndex, 1, this.amEnd)
      // Get right hours for the day
      this.setHours()
    },
    // Store first hour for the afternoon
    sendPmBegin(pmBegin) {
      // Check if it's the current hour entered or an hour from the input
      typeof pmBegin === 'undefined' ? pmBegin = moment().format('HH:mm') : null
      let payload = {
        'value': pmBegin,
        'ranges': this.days[this.currentDay].pmBegin + this.lines,
        'line': this.lines,
      }
      // Store in the spreadsheet
      this.updateSheet(payload)
      this.pmBegin = pmBegin
      // Store in the table data
      this.tableData.splice(this.days[this.currentDay].pmBeginIndex, 1, this.pmBegin)
      // Get right hours for the day
      this.setHours()
    },
    // Store last hour for the afternoon
    sendPmEnd(pmEnd) {
      // Check if it's the current hour entered or an hour from the input
      typeof pmEnd === 'undefined' ? pmEnd = moment().format('HH:mm') : null
      let payload = {
        'value': pmEnd,
        'ranges': this.days[this.currentDay].pmEnd + this.lines,
        'line': this.lines,
      }
      // Store in the spreadsheet
      this.updateSheet(payload)
      this.pmEnd = pmEnd
      // Store in the table data
      this.tableData.splice(this.days[this.currentDay].pmEndIndex, 1, this.pmEnd)
      // Get right hours for the day
      this.setHours()
    },
    setVar() {
      // Get hour for a day from the table data and show in the input
      this.amBegin = this.tableData[this.days[this.currentDay].amBeginIndex];
      this.amEnd = this.tableData[this.days[this.currentDay].amEndIndex];
      this.pmBegin = this.tableData[this.days[this.currentDay].pmBeginIndex];
      this.pmEnd = this.tableData[this.days[this.currentDay].pmEndIndex];

      // Get the last line from the table data -> it's going to be the right line in the spreadsheet
      this.lines = this.tableData.slice(-1)[0];

      // Get the month
      this.monthYear = moment(this.tableData[0], 'YYYY-MM-DD', 'Fr', true).format('MMMM YYYY').toUpperCase();

      // Date for a day
      this.dayMonday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).format('DD');
      this.dayTuesday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(1, 'd').format('DD');
      this.dayWednesday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(2, 'd').format('DD');
      this.dayThursday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(3, 'd').format('DD');
      this.dayFriday = moment(this.tableData[0], 'YYYY-MM-DD', 'fr', true).add(4, 'd').format('DD');

      // Tooltips for each day
      this.days['Monday'].tooltip = this.tooltips(this.tableData[4]);
      this.days['Tuesday'].tooltip = this.tooltips(this.tableData[4 + 8]);
      this.days['Wednesday'].tooltip = this.tooltips(this.tableData[4 + 16]);
      this.days['Thursday'].tooltip = this.tooltips(this.tableData[4 + 24]);
      this.days['Friday'].tooltip = this.tooltips(this.tableData[4 + 32]);

      // Get the number of the week
      this.week = this.tableData[1]

      // Check if the emoji is in the table at the key 46
      this.tableData[46] === '🤔' ? this.showSmiley = true : this.showSmiley = false

      // Get the description
      if (this.tableData[46] === '🤔' || this.tableData[46] === '') this.description = this.tableData[47]
    },
    // Modify hours for the day after each insert of hours
    // The values will directly change in the table data to avoid API calls and not to overload the application
    setHours() {
      // In each test it will addition all the hours together and store in the table data
      if (this.amBegin !== '' && this.amEnd !== '' && this.pmBegin !== '' && this.pmEnd !== '') {
        this.hoursTot = moment((moment(this.amEnd, 'HH:mm') - moment(this.amBegin, 'HH:mm')) + (moment(this.pmEnd, 'HH:mm') - moment(this.pmBegin, 'HH:mm'))).subtract(1, 'h').format('HH:mm')
        this.tableData.splice(this.days[this.currentDay].amBeginIndex - 1, 1, this.hoursTot)
        this.tableData.splice(this.days[this.currentDay].amBeginIndex - 2, 1, (moment(this.hoursTot, 'HH:mm').hours() + moment(this.hoursTot, 'HH:mm').minute() / 60).toString())
      } else if (this.amBegin !== '' && this.amEnd !== '') {
        this.hoursTot = moment((moment(this.amEnd, 'HH:mm') - moment(this.amBegin, 'HH:mm'))).subtract(1, 'h').format('HH:mm')
        this.tableData.splice(this.days[this.currentDay].amBeginIndex - 1, 1, this.hoursTot)
        this.tableData.splice(this.days['Friday'].pmEndIndex + 1, 1, this.tableData.slice(44)[0] - ((moment(this.tableData[this.days[this.currentDay].amBeginIndex - 1], 'HH:mm').hours() + moment(this.tableData[this.days[this.currentDay].amBeginIndex - 1], 'HH:mm').minute() / 60)))
      } else if (this.pmBegin !== '' && this.pmEnd !== '') {
        this.hoursTot = moment((moment(this.pmEnd, 'HH:mm') - moment(this.pmBegin, 'HH:mm'))).subtract(1, 'h').format('HH:mm')
        this.tableData.splice(this.days[this.currentDay].amBeginIndex - 1, 1, this.hoursTot)
        this.tableData.splice(this.days['Friday'].pmEndIndex + 1, 1, this.tableData.slice(44)[0] - ((moment(this.tableData[this.days[this.currentDay].amBeginIndex - 1], 'HH:mm').hours() + moment(this.tableData[this.days[this.currentDay].amBeginIndex - 1], 'HH:mm').minute() / 60)))
      } else if (this.amBegin === '' && this.amEnd === '' && this.pmBegin === '' && this.pmEnd === '') {
        this.hoursTot = '00:00'
      }
      this.calculateHours()
    },
    // Same as before but for the total hours for the week
    calculateHours() {
      // Addition all hours together and store in table data
      let time = (moment(this.tableData[this.days['Monday'].amBeginIndex - 1], 'HH:mm').hours() +
              moment(this.tableData[this.days['Monday'].amBeginIndex - 1], 'HH:mm').minute() / 60) +
          (moment(this.tableData[this.days['Tuesday'].amBeginIndex - 1], 'HH:mm').hours() + moment(this.tableData[this.days['Tuesday'].amBeginIndex - 1], 'HH:mm').minute() / 60) +
          (moment(this.tableData[this.days['Wednesday'].amBeginIndex - 1], 'HH:mm').hours() + moment(this.tableData[this.days['Wednesday'].amBeginIndex - 1], 'HH:mm').minute() / 60) +
          (moment(this.tableData[this.days['Thursday'].amBeginIndex - 1], 'HH:mm').hours() + moment(this.tableData[this.days['Thursday'].amBeginIndex - 1], 'HH:mm').minute() / 60) +
          (moment(this.tableData[this.days['Friday'].amBeginIndex - 1], 'HH:mm').hours() + moment(this.tableData[this.days['Friday'].amBeginIndex - 1], 'HH:mm').minute() / 60)
      this.tableData.splice(this.days['Friday'].pmEndIndex + 1, 1, time.toFixed(2))
    },
  },
  computed: {
    // Get table data from the store
    ...mapGetters('authorization', [
      'tableData',
    ]),
  },
  mounted() {
    // Get values from the local storage if exist
    if (localStorage.getItem('hoursPlanified') != null) {
      this.localAmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).amBegin
      this.localAmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).amEnd
      this.localPmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).pmBegin
      this.localPmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).pmEnd
    }
    return [
      // Get current week and day
      this.currentWeek = moment().isoWeek(),
      this.currentDay = moment().format('dddd'),
    ]
  },
}
</script>

<style>

.title, .username {
  border-radius: 4px;
  font-weight: 600;
}

.title {
  margin-bottom: .53rem;
  padding: .13rem .4rem;
  font-size: .93rem;
  line-height: 1.5rem;
  color: #000032;
  background-color: #edf0f3;
  text-align: left;
}

.commentary textarea {
  width: 100%;
  padding: .5rem;
  margin-top: 2.5rem;
  margin-bottom: 3.5rem;
  border: 1px solid #aab2bc;
  border-radius: 4px;
  font-size: 1rem;
  color: #aab2bc;
  resize: none;
}

.titleModal {
  text-align: center;
}

.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: rgb(209, 213, 219);
  color: #333;
  position: fixed;
  bottom: 6.3%;
  width: 100%;
  padding: 50px 20px 30px;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 1em;
  height: 1em;
}

.time-selection {
  background-color: rgb(209, 213, 219);
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (1fr);
  grid-template-columns: repeat(3, 1fr);
  -ms-grid-rows: (1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
  position: relative;
  padding-top: 1.5rem;
}

.button.button-number {
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: #fff;
  color: #52565b;
  -webkit-transition: background-color .2s;
  transition: background-color .2s;
}

.button {
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.button.button-validation {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background-color: #e30074;
  color: #fff;
}

.time-selection .button-validation {
  grid-column-start: 1;
  -ms-grid-column-span: 3;
  grid-column-end: 4;
  grid-row-start: 5;
  -ms-grid-row-span: 1;
  grid-row-end: 6;
}

.button.button-number:hover {
  background-color: #e30074;
  color: #ffff;
}

</style>
