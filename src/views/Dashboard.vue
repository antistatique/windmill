<template>
	<div class="dashboard" v-if="dataLoaded == false">
		<ErrorPage/>
	</div>
	<div class="dashboard" v-else>

		<div class="header">
			<span class="icon-right">
				<BIconBoxArrowRight class="icon icon-logout" @click="logout()"/>
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

<style>
	.username {
		display: inline-block;
		margin: 0;
		padding: .55rem .96rem;
		font-size: 1rem;
		color: #fff!important;
		background-color: hsla(0,0%,100%,.19);
		text-align: center;
	}
	.title, .username {
		border-radius: 4px;
		font-weight: 600;
	}
	h1 {
		display: block;
		font-size: 2em;
		margin-block-start: 0.67em;
		margin-block-end: 0.67em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
	}
	.header {
		background-color: #000032;
		text-align: center;
		padding-top: .5rem;
		padding-bottom: .5rem;
		opacity: .9;
		margin: 0;
	}
	.header .icon-right {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: end;
		-ms-flex-pack: end;
		justify-content: flex-end;
		margin-right: 1.5rem;
	}
	.header .header-title-bold {
		margin-top: 0;
		margin-bottom: 0;
		padding: .5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: #fff;
	}
	.header .header-subtitle-regular {
		margin: 0;
		font-size: .75rem;
		font-weight: 400;
		color: #fff;
	}
	.header .icon-right .icon {
		font-size: 1.25rem;
		color: #fff;
	}
	.data-tables {
		margin: 1rem;
	}
	.table-count {
		margin-bottom: 1.5rem;
	}
	.table-data {
		width: 100%;
		border-collapse: collapse;
	}
	.table-data thead th {
		margin-bottom: .5rem;
		border-radius: 4px;
		padding: .125rem .5rem;
		line-height: 1.5rem;
		color: #000032;
		background-color: #edf0f3;
		text-align: left;
	}
	.table-data tbody tr {
		border-bottom: 1px solid #dbe1e7;
	}
	.table-count tbody td {
		padding: .5rem;
	}
	.table-count tbody td:last-of-type {
		font-weight: 600;
	}
	.table-data tbody td:first-of-type {
		text-align: left;
	}
	.table-data tbody td:last-of-type {
		text-align: right;
	}
</style>