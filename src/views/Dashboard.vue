<template>
	<div class="dashboard" v-if="dataLoaded == false">
		<ErrorPage/>
	</div>
	<div class="dashboard" v-else>

		<!-- Header of the page -->
		<div class="header">
			<span class="icon-right">

				<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" style="margin-right: 7px" class="icon icon-logout" 
					viewBox="0 0 496 496" xml:space="preserve" @click="toggleModaleSetHour">
					<g>
						<path d="M488,200h-37.6c-5.106-21.625-13.678-42.282-25.384-61.168l26.6-26.6c3.123-3.124,3.123-8.188,0-11.312L395.08,44.352
							c-3.124-3.123-8.188-3.123-11.312,0l-26.608,26.6C338.276,59.255,317.622,50.693,296,45.6V8c0-4.418-3.582-8-8-8h-80
							c-4.418,0-8,3.582-8,8v37.6c-21.624,5.103-42.278,13.675-61.16,25.384l-26.608-26.632c-3.124-3.123-8.188-3.123-11.312,0
							L44.352,100.92c-3.123,3.124-3.123,8.188,0,11.312l26.6,26.6C59.257,157.72,50.696,178.377,45.6,200H8c-4.418,0-8,3.582-8,8v80
							c0,4.418,3.582,8,8,8h37.6c5.106,21.625,13.678,42.282,25.384,61.168l-26.632,26.6c-3.123,3.124-3.123,8.188,0,11.312
							l56.568,56.568c3.174,3.001,8.138,3.001,11.312,0l26.6-26.6C157.72,436.743,178.377,445.304,200,450.4V488c0,4.418,3.582,8,8,8h80
							c4.418,0,8-3.582,8-8v-37.6c21.625-5.106,42.282-13.678,61.168-25.384l26.6,26.6c3.124,3.123,8.188,3.123,11.312,0l56.568-56.568
							c3.123-3.124,3.123-8.188,0-11.312l-26.6-26.6C436.74,338.258,445.301,317.612,450.4,296H488c4.418,0,8-3.582,8-8v-80
							C496,203.582,492.418,200,488,200z M480,280h-36c-3.802-0.001-7.08,2.675-7.84,6.4c-4.887,24.078-14.395,46.981-28,67.44
							c-2.105,3.172-1.684,7.388,1.008,10.08l25.504,25.496l-45.256,45.256l-25.496-25.504c-2.692-2.692-6.908-3.113-10.08-1.008
							c-20.459,13.605-43.362,23.113-67.44,28c-3.725,0.76-6.401,4.038-6.4,7.84v36h-64v-36c0.001-3.802-2.675-7.08-6.4-7.84
							c-24.078-4.887-46.981-14.395-67.44-28c-3.172-2.105-7.388-1.684-10.08,1.008l-25.496,25.504L61.32,389.424l25.504-25.496
							c2.692-2.692,3.113-6.908,1.008-10.08c-13.605-20.459-23.113-43.362-28-67.44c-0.757-3.726-4.03-6.404-7.832-6.408H16v-64h36
							c3.802,0.001,7.08-2.675,7.84-6.4c4.887-24.078,14.395-46.981,28-67.44c2.105-3.172,1.683-7.388-1.008-10.08L61.32,106.576
							l45.256-45.256l25.504,25.504c2.692,2.692,6.908,3.113,10.08,1.008c20.457-13.602,43.357-23.111,67.432-28
							c3.726-0.757,6.404-4.03,6.408-7.832V16h64v36c-0.001,3.802,2.675,7.08,6.4,7.84c24.075,4.889,46.975,14.398,67.432,28
							c3.172,2.105,7.388,1.684,10.08-1.008l25.504-25.504l45.256,45.256l-25.504,25.496c-2.692,2.692-3.113,6.908-1.008,10.08
							c13.605,20.459,23.113,43.362,28,67.44c0.76,3.725,4.038,6.401,7.84,6.4h36V280z" fill="#fff"/>
						<path d="M248,160c-48.601,0-88,39.399-88,88c0,48.601,39.399,88,88,88s88-39.399,88-88C335.943,199.423,296.577,160.057,248,160z
							M248,320c-39.764,0-72-32.236-72-72c0-39.765,32.236-72,72-72c39.765,0,72,32.235,72,72C319.956,287.746,287.746,319.956,248,320
							z" fill="#fff"/>
					</g>
				</svg>
				
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
			<p class="header-subtitle-regular">{{ (parseFloat(result.diffValid) + parseFloat(result.soldeYearEarlier) - parseFloat(result.budgetOffDay)).toFixed(2) }} jours de vacances et {{ (parseFloat(result.overtimeHours) / 8.4 - result.overtimeRecup).toFixed(2) }} jour ({{ ((parseFloat(result.overtimeHours) / 8.4 - result.overtimeRecup)*8.4).toFixed(2) }}h) supplémentaires</p>
		</div>

		<!-- Content of the page -->
		<div class="data-tables">
			<table class="table-data table-count">
				<thead>
					<tr>
						<th colspan="2">Budget congés/vacances</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Budget année en cours {{ currentYear }}</td>
						<td>{{ result.diffValid }} j</td>
					</tr>
					<tr>
						<td>Solde année précédente {{ yearEarlier }}</td>
						<td>{{ result.soldeYearEarlier }} j</td>
					</tr>
					<tr>
						<td>Heures supplémentaires totales</td>
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
						<td>Jours supplémentaires récupérés</td>
						<td>{{ result.overtimeRecup }} j</td>
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
						<td>Absences justifiées</td>
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

		<!-- Modal for storing the values in the local storage -->
		<modalJustifyHours :revele="isModalSetHourOpen" :toggleModal="toggleModaleSetHour" :action="storeStorage"></modalJustifyHours>

	</div> 
</template>

<script>
	/* eslint-disable */
	import { mapActions, mapGetters } from 'vuex';
	import moment from 'moment'
	import { BIconBoxArrowRight } from 'bootstrap-vue'
	import ErrorPage from '../components/errorPage'
	import router from '../router/index'
	import modalJustifyHours from '../components/ModalJustifyHours'

	export default {
		name: 'dashboard',
		// Imported components
		components: {
			ErrorPage,
			BIconBoxArrowRight,
			modalJustifyHours
		},
		// Variables
		data: () => ({
			isModalSetHourOpen: false,
			dataLoaded: null,
			result: {
				firstname: "",
				diffValid: "",
				formationDay: "",
				moneyFormation: "",
				sickDay: "",
				overtimeRecup: "",
				percentageWork: "",
				overtimeHours: "",
				budgetOffDay: "",
				soldeYearEarlier: "",
				takeDayCurrentYear: "",
				localAmBegin : null,
				localAmEnd : null,
				localPmBegin : null,
				localPmEnd : null,
			},
			currentYear: moment().year(),
			yearEarlier: null
		}),
		// Call the API for storing the values 
		beforeCreate() {
			this.$store.dispatch('dashboard/getDashboardSheet').then(() => {
				this.$store.getters['dashboard/getDataDashboard'] != undefined ? this.dataLoaded = true : this.dataLoaded = false
				this.setVar()
			})
		},
		methods: {
			// Show modal
			toggleModaleSetHour: function() {
			this.isModalSetHourOpen = !this.isModalSetHourOpen;
			},
			// Set hours in the local storage
			storeStorage(amBegin, amEnd, pmBegin, pmEnd) {
				localStorage.setItem('hoursPlanified', JSON.stringify({
					amBegin: amBegin,
					amEnd: amEnd,
					pmBegin: pmBegin,
					pmEnd: pmEnd,
				}))
				this.isModalSetHourOpen = !this.isModalSetHourOpen
			},
			// Set variables before showing them 
			setVar() {
				// firstname of the user 
				this.result.firstname = this.getDataDashboard[0]

				// Overtime for the year 
				this.result.overtimeHours = this.getDataDashboard[1]

				// Number of day off
				this.result.budgetOffDay = this.getDataDashboard[2]

				// Number of day in formation
				this.result.formationDay = this.getDataDashboard[3]

				// Money used for formation
				this.result.moneyFormation = this.getDataDashboard[4]

				// Justified absences
				this.result.sickDay = this.getDataDashboard[5]

				// Number of day recupered
				this.result.overtimeRecup = this.getDataDashboard[6]

				// Pourcentage work
				this.result.percentageWork = this.getDataDashboard[7]

				// Overtime
				this.result.diffValid = this.getDataDashboard[9]

				// Week off for the last year
				this.result.soldeYearEarlier = this.getDataDashboard[10]

				// Week off for the current year
				this.result.takeDayCurrentYear = this.getDataDashboard[11]
			},
			// Get the function signOut from the store authentication
			...mapActions('authentication', [
				'signOut',
			]),
			logout() {
				this.signOut();
			}
		},
		computed: {
			...mapGetters('dashboard', [
				'getDataDashboard'
			])
		},
		mounted() {
			// Get the current year 
			this.yearEarlier = moment(this.currentYear, 'YYYY').subtract(1, 'y').format('YYYY')
		}
	}
</script>
