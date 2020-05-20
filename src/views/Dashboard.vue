<template>
	<div class="dashboard">
		<div>{{ result.firstname }}</div>
		<div>Il te reste {{ result.takeDayCurrentYear }} jours à poser</div>
		<p>petite phrase</p>

		<div>
			<p>Budget temps</p>
			<div>
				Année en cours {{ currentYear }} - {{ result.diffValid }} j
			</div>
			<div>
				Report {{ yearEarlier }} - {{ result.soldeYearEarlier }} j
			</div>
			<div>
				Heures supplémentaires {{ result.overtimeHours }}h
			</div>
		</div> <br>

		<div>
			<p>Consommées</p>
			<div>
				Vacances posées {{ result.budgetOffDay }} 
			</div>
			<div>
				Heures supplémentaires réucpérées {{ result.overtimeRecup }} 
			</div>
		</div><br>

		<div>
			<p>Indicatifs</p>
			<div>
				Maladie {{ result.sickDay }} 
			</div>
			<div>
				Temps formation {{ result.formationDay }}/5j
			</div>
			<div>
				Budget formation CHF {{ result.moneyFormation }}/1200
			</div>
		</div>

		<b-button v-b-modal.setLocalStorage class="btn btn-costum">Horaire habituel</b-button>

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
				<b-button size="sm" class="btn-costum" @click="storeStorage(localAmBegin, localAmEnd, localPmBegin, localPmEnd); ok();">
					Enregistrer
				</b-button>
			</template>
		</b-modal>

	</div> 
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment'

export default {
  name: 'dashboard',
  data: () => ({
		result: {
			firstname: "",
			diffValid: "",
			offDay: "",
			formationDay: "",
			moneyFormation: "",
			sickDay: "",
			overtimeRecup: "",
			percentageWork: "",
			overtimeHours: "",
			budgetOffDay: "",
			soldeYearEarlier: "",
			rowSheetYearEarlier: "",
			takeDayCurrentYear: "",
			localAmBegin : null,
			localAmEnd : null,
			localPmBegin : null,
			localPmEnd : null,
		},
		currentYear: moment().year(),
		yearEarlier: null
	}),
	beforeCreate() {
		this.$store.dispatch('dashboard/getDashboardSheet').then(() => {
      this.setVar()
    })
	},
  methods: {
		storeStorage(amBegin, amEnd, pmBegin, pmEnd) {
      localStorage.setItem('hoursPlanified', JSON.stringify({
        amBegin: amBegin,
        amEnd: amEnd,
        pmBegin: pmBegin,
        pmEnd: pmEnd,
      }))
    },
    setVar() {
			this.result.firstname = this.getDataDashboard[0]
			this.result.diffValid = this.getDataDashboard[1]
			this.result.offDay = this.getDataDashboard[2]
			this.result.formationDay = this.getDataDashboard[3]
			this.result.moneyFormation = this.getDataDashboard[4]
			this.result.sickDay = this.getDataDashboard[5]
			this.result.overtimeRecup = this.getDataDashboard[6]
			this.result.percentageWork = this.getDataDashboard[7]
			this.result.overtimeHours = this.getDataDashboard[8]
			this.result.budgetOffDay = this.getDataDashboard[9]
			this.result.soldeYearEarlier = this.getDataDashboard[10]
			this.result.rowSheetYearEarlier = this.getDataDashboard[11]
			this.result.takeDayCurrentYear = this.getDataDashboard[12]
		}
	},
  computed: {
    ...mapGetters('dashboard', [
      'getDataDashboard'
    ])
  },
  mounted() {
		if(localStorage.getItem('hoursPlanified') != null) {
      this.localAmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).amBegin
      this.localAmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).amEnd
      this.localPmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).pmBegin
      this.localPmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).pmEnd
    }
		this.yearEarlier = moment(this.currentYear, 'YYYY').subtract(1, 'y').format('YYYY')
  }
}
</script>
