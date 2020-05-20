<template>
   <div class="home">
    <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12">
      <div class="d-flex justify-content-around" style="margin-top: 3%; margin-bottom: 3%">
        <div>
          <button class="btn" v-show="week > 1" v-on:click="changeWeek(-1)">
            <BIconArrowLeft/>
          </button>
        </div>
        <div>
          <div>{{ monthYear }}</div>
          <div>Semaine {{ week }}</div>
        </div>
        <div>
          <button class="btn" v-show="week < 53" v-on:click="changeWeek(1)">
            <BIconArrowRight/>
          </button>
        </div>
      </div>
    </div>

    <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 border" style="margin-bottom: 3%; background-color: #edf0f3;">
      <div class="d-flex justify-content-around align-items-center" v-if="smileyMan == '🤔' && smileyDanger == '⚠️'">
        <div>
          <div>Heures 🤔</div>
          <div><b style="font-size: 20px">{{ this.tableData[44] }}</b> / {{ this.tableData[45] }}</div>
        </div>
        <div>
          <b-button v-b-modal.modal-scoped class="btn-costum">Justifier les heures</b-button>
        </div>
      </div>
      <!-- I put the padding-bottom to 6px, like this there is not difference between the two blocks -->
      <div class="d-flex justify-content-center" style="padding-top: 10px; padding-bottom: 6px" v-else>
        <b-button v-b-modal.modal-scoped class="btn-costum">Modifier la justification</b-button>
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

    <div class="d-flex justify-content-center justify-content-around">
      <button class="btn" v-on:click="changeDay('Monday')">
        {{ this.tableData[4] }} <br>
        Lun <br>
        {{ dayMonday }} <br>
        {{ this.tableData[7] }}
      </button>
      <button class="btn" v-on:click="changeDay('Tuesday')">
        {{ this.tableData[4+8] }} <br>
        Mar <br>
        {{ dayTuesday }} <br>
        {{ this.tableData[7+8] }}
      </button>
      <button class="btn" v-on:click="changeDay('Wednesday')">
        {{ this.tableData[4+16] }} <br>
        Mer <br>
        {{ dayWednesday }} <br>
        {{ this.tableData[7+16] }}
      </button>
      <button class="btn" v-on:click="changeDay('Thursday')">
        {{ this.tableData[4+24] }} <br>
        Jeu <br>
        {{ dayThursday }} <br>
        {{ this.tableData[7+24] }}
      </button>
      <button class="btn" v-on:click="changeDay('Friday')">
        {{ this.tableData[4+32] }} <br>
        Ven <br>
        {{ dayFriday }} <br>
        {{ this.tableData[7+32] }}
      </button>
    </div>

    <div style="margin-top: 3%;">
      <div class="form-row">
        <div class="col-md-12">
          <label class="col-form-label d-flex justify-content-start" style="background-color: #edf0f3; margin-bottom: 1%; padding-left: 10px">Matin</label>
          
          <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
            <label for="amBegin" class="col-7 col-sm-9 col-md-9 col-md-9 col-lg-9 col-xl-9 col-form-label d-flex justify-content-start">Début</label>
            <div class="col-5 col-sm-3 col-md-3 col-md-3 col-lg-3 col-xl-3">
              <input type="time" class="form-control" v-model="amBegin" style="text-align: center" @blur="sendAmBegin(amBegin)" id="amBegin">
            </div>
          </div>
          <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
            <label for="amEnd" class="col-7 col-sm-9 col-md-9 col-md-9 col-lg-9 col-xl-9 col-form-label d-flex justify-content-start">Fin</label>
            <div class="col-5 col-sm-3 col-md-3 col-md-3 col-lg-3 col-xl-3">
              <input type="time" class="form-control absolute-center" style="text-align: center" v-model="amEnd" @blur="sendAmEnd(amEnd)" id="amEnd">
            </div>
          </div>

        </div>
        <div class="col-md-12">
          <label class="col-form-label d-flex justify-content-start" style="background-color: #edf0f3; margin-bottom: 1%; padding-left: 10px">Après-midi</label>
          
          <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
            <label for="pmBegin" class="col-7 col-sm-9 col-md-9 col-md-9 col-lg-9 col-xl-9 col-form-label d-flex justify-content-start">Début</label>
            <div class="col-5 col-sm-3 col-md-3 col-md-3 col-lg-3 col-xl-3">
              <input type="time" class="form-control" style="text-align: center" v-model="pmBegin" @blur="sendPmBegin(pmBegin)" id="pmBegin">
            </div>
          </div>
          <div class="form-group row" style="padding-left: 10px; padding-right: 10px;">
            <label for="amEnd" class="col-7 col-sm-9 col-md-9 col-md-9 col-lg-9 col-xl-9 col-form-label d-flex justify-content-start">Fin</label>
            <div class="col-5 col-sm-3 col-md-3 col-md-3 col-lg-3 col-xl-3">
              <input type="time" class="form-control" style="text-align: center" v-model="pmEnd" @blur="sendPmEnd(pmEnd)" id="pmEnd">
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="form-group col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-between">
      <b-button v-b-modal.setLocalStorage class="btn btn-costum">Horaire habituel</b-button>
      <b-button v-b-modal.addHours class="btn btn-costum">+</b-button>
      <b-button v-b-modal.substractHours class="btn btn-costum">-</b-button>
      <button class="btn" style="background-color: #faddea" v-on:click="clear()"><BIconTrash style="color: #e30074"/></button>
    </div>

    <b-modal id="setLocalStorage" class="modal">
      <template v-slot:modal-header="{ cancel }">
        <h5>Définition de l'horaire habituel</h5>
        <button type="button" class="close">
          <span aria-hidden="true" @click="cancel()">&times;</span>
        </button>
      </template>

      <template v-slot:default>
        <div style="margin-top: 3%;">
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
        <b-button size="sm" class="btn-costum" @click="storeStorage(localAmBegin, localAmEnd, localPmBegin, localPmEnd); ok();">
          Enregistrer
        </b-button>
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
          <button class="btn" v-on:click="addHour(0, 15); ok()">15'</button>
          <button class="btn" v-on:click="addHour(0, 30); ok()">30'</button>
          <button class="btn" v-on:click="addHour(0, 45); ok()">45'</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="btn" v-on:click="addHour(1, 0); ok()">1h</button>
          <button class="btn" v-on:click="addHour(1, 15); ok()">1h15</button>
          <button class="btn" v-on:click="addHour(1, 30); ok()">1h30</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="btn" v-on:click="addHour(1, 45); ok()">1h45</button>
          <button class="btn" v-on:click="addHour(2, 0); ok()">2h</button>
          <button class="btn" v-on:click="addHour(2, 15); ok()">2h15</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="btn" v-on:click="addHour(2, 30); ok()">2h30</button>
          <button class="btn" v-on:click="addHour(2, 45); ok()">2h45</button>
          <button class="btn" v-on:click="addHour(3, 0); ok()">3h</button>
        </div>
      </template>

      <template v-slot:modal-footer="{ close }">
        <b-button size="sm" class="btn-costum" @click="close();">
          Fermer
        </b-button>
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
          <button class="btn" v-on:click="subtractHour(0, 15); ok()">15'</button>
          <button class="btn" v-on:click="subtractHour(0, 30); ok()">30'</button>
          <button class="btn" v-on:click="subtractHour(0, 45); ok()">45'</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="btn" v-on:click="subtractHour(1, 0); ok()">1h</button>
          <button class="btn" v-on:click="subtractHour(1, 15); ok()">1h15</button>
          <button class="btn" v-on:click="subtractHour(1, 30); ok()">1h30</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="btn" v-on:click="subtractHour(1, 45); ok()">1h45</button>
          <button class="btn" v-on:click="subtractHour(2, 0); ok()">2h</button>
          <button class="btn" v-on:click="subtractHour(2, 15); ok()">2h15</button>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-around">
          <button class="btn" v-on:click="subtractHour(2, 30); ok()">2h30</button>
          <button class="btn" v-on:click="subtractHour(2, 45); ok()">2h45</button>
          <button class="btn" v-on:click="subtractHour(3, 0); ok()">3h</button>
        </div>
      </template>

      <template v-slot:modal-footer="{ close }">
        <b-button size="sm" class="btn-costum" @click="close();">
          Fermer
        </b-button>
      </template>
    </b-modal>

  </div> 

</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'
import { BIconArrowLeft, BIconArrowRight, BIconTrash } from 'bootstrap-vue'

export default {
  name: 'Home',
  components: {
    BIconArrowLeft, 
    BIconArrowRight,
    BIconTrash
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
  methods: {
    storeStorage(amBegin, amEnd, pmBegin, pmEnd) {
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
      this.batchUpdateSheet(payload).then(() => {
        this.amBegin = amBegin,
        this.amEnd = amEnd,
        this.pmBegin = pmBegin,
        this.pmEnd = pmEnd
      })
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
      else
      {
        this.smileyMan = null
        this.smileyDanger = null
      }
      if(this.tableData[46] == '🤔') this.description = this.tableData[47]
    }
  },
  computed: {
    ...mapGetters('authorization', [
      'tableData'
    ])
  },
  mounted() {
    if(localStorage.getItem('hoursPlanified') != null) {
      this.localAmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).amBegin
      this.localAmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).amEnd
      this.localPmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).pmBegin
      this.localPmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).pmEnd
    }
    return [
      this.week = moment().isoWeek(),
      this.currentDay = moment().format('dddd'),
      this.setVar()
    ]
  }
}
</script>

<style>
  .btn.btn-costum {
    font-size: 16px;
    background-color: #e30074;
    color: white;
    border-color: #edf0f3;
  }
  .btn.btn-costum:hover {
    font-size: 16px;
    background-color: #e30074;
    color: white;
    border-color: #edf0f3;
  }
</style>