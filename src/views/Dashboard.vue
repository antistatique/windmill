<template>
	<div class="dashboard" v-if="dataLoaded == false">
		<ErrorPage/>
	</div>
	<div class="dashboard" v-else>

		<div class="header">
			<span class="icon-right">
				
				<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" class="icon icon-logout" 
					viewBox="0 0 512 512" xml:space="preserve" @click="logout()">
						<g>
							<path d="M330.667,384h-21.333c-5.891,0-10.667,4.776-10.667,10.667v74.667h-256V42.667h256v74.667
								c0,5.891,4.776,10.667,10.667,10.667h21.333c5.891,0,10.667-4.776,10.667-10.667V42.667C341.333,19.103,322.231,0,298.667,0h-256
								C19.103,0,0,19.103,0,42.667v426.667C0,492.898,19.103,512,42.667,512h256c23.564,0,42.667-19.102,42.667-42.667v-74.667
								C341.333,388.776,336.558,384,330.667,384z" fill="#fff"/>
							<path d="M508.542,248.135l-128-117.333c-3.125-2.844-7.656-3.625-11.5-1.896c-3.875,1.698-6.375,5.531-6.375,9.76V160
								c0,3.021,1.281,5.906,3.531,7.927l74.151,66.74H138.667c-5.896,0-10.667,4.771-10.667,10.667v21.333
								c0,5.896,4.771,10.667,10.667,10.667h301.682l-74.151,66.74c-2.25,2.021-3.531,4.906-3.531,7.927v21.333
								c0,4.229,2.5,8.063,6.375,9.76c1.375,0.615,2.844,0.906,4.292,0.906c2.615,0,5.198-0.969,7.208-2.802l128-117.333
								C510.75,261.844,512,258.99,512,256S510.75,250.156,508.542,248.135z" fill="#fff"/>
						</g>
				</svg>
			</span>
			<h1 class="username">{{ result.firstname }}</h1>
			<p class="header-title-bold">Il te reste {{ result.takeDayCurrentYear }} jours à poser</p>
			<p class="header-subtitle-regular">3 jours de vacances et 1 jour (8.24h) supplémentaire</p>
		</div>

		<div class="data-tables">
			<table class="table-data table-count">
				<thead>
					<tr>
						<th colspan="2">Budget temps</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Année en cours {{ currentYear }}</td>
						<td>{{ result.diffValid }} j</td>
					</tr>
					<tr>
						<td>Report {{ yearEarlier }}</td>
						<td>{{ result.soldeYearEarlier }} j</td>
					</tr>
					<tr>
						<td>Heures supplémentaires</td>
						<td>{{ result.overtimeHours }} h</td>
					</tr>
				</tbody>
			</table>
			<table class="table-data table-count">
				<thead>
					<tr>
						<th colspan="2">Consommées</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Vacances posées</td>
						<td>{{ result.budgetOffDay }} j</td>
					</tr>
					<tr>
						<td>Heures supplémentaires réucpérées</td>
						<td>{{ result.overtimeRecup }}</td>
					</tr>
				</tbody>
			</table>
			<table class="table-data table-count">
				<thead>
					<tr>
						<th colspan="2">Indicatifs</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Maladie</td>
						<td>{{ result.sickDay }} j</td>
					</tr>
					<tr>
						<td>Temps formation</td>
						<td>{{ result.formationDay }}/5 j</td>
					</tr>
					<tr>
						<td>Budget formation CHF</td>
						<td>{{ result.moneyFormation }}/1200</td>
					</tr>
				</tbody>
			</table>
		</div>

		<button v-b-modal.setLocalStorage class="button button-primary">Horaire habituel</button>	
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
	import { BIconBoxArrowRight } from 'bootstrap-vue'
	import ErrorPage from '../components/errorPage'
	import router from '../router/index'

	export default {
		name: 'dashboard',
		components: {
			ErrorPage,
			BIconBoxArrowRight
		},
		data: () => ({
			dataLoaded: null,
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
				this.$store.getters['dashboard/getDataDashboard'] != undefined ? this.dataLoaded = true : this.dataLoaded = false
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
			},
			...mapActions('authentication', [
				'signOut',
			]),
			logout() {
				this.signOut();
				router.push('/login')
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
