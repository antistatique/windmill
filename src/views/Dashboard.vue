<template>
   <div class="dashboard">
			<div>{{ result.firstname }}</div>
			<div v-show="result.takeDayCurrentYear >= 1 ">Il te reste {{ result.takeDayCurrentYear }} jours à poser</div>
			<p>petite phrase</p>

			<div>
				<p>Budget temps</p>
				<div>
					Année en cours {{ currentYear }} 
				</div>
				<div>
					Report {{ yearEarlier }} 
				</div>
				<div>
					Heures supplémentaires {{ result.overtimeHours }} 
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
		},
		currentYear: moment().year(),
		yearEarlier: null
	}),
  methods: {},
  computed: {
    ...mapGetters('dashboard', [
      'getDataDashboard'
    ])
  },
  mounted() {
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
		this.yearEarlier = moment(this.currentYear, 'YYYY').subtract(1, 'y').format('YYYY')
  }
}
</script>
