<template>
	<div class="bloc-modale" v-if="revele">
		<div class="overlay" style="background: white" v-on:click="toggleModal"></div>

		<div class="modale" style="background: white; top: 10%;">
			<div v-on:click="toggleModal" class="btn-modale">
				<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
				<div class="titleModal" style="padding-bottom: 20px;"><h3>Enregistrez votre journée type</h3></div>
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
								<input type="time" class="form-control col" v-model="localAmBegin" id="amBegin">
							</td>
						</tr>
						<tr>
							<td>Fin</td>
							<td class="form-inline">
								<input type="time" class="form-control col" v-model="localAmEnd" id="amEnd">
							</td>
						</tr>
					</tbody>
				</table>
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
								<input type="time" class="form-control col" v-model="localPmBegin" id="pmBegin">
							</td>
						</tr>
						<tr>
							<td>Fin</td>
							<td class="form-inline"> 
								<input type="time" class="form-control col" v-model="localPmEnd" id="pmEnd">
							</td>
						</tr>
					</tbody>
				</table>

				<button class="button button-validation" @click="action(localAmBegin, localAmEnd, localPmBegin, localPmEnd);">Enregistrer</button>
			</div>
		</div> 
	</div>
</template>
<script>
	export default {
		name: "Modal",
		props: [
			"revele",
			"toggleModal",
			"action"
		],
		data: () => ({
			localAmBegin : null,
			localAmEnd : null,
			localPmBegin : null,
			localPmEnd : null,
		}),
		mounted () {
			if(localStorage.getItem('hoursPlanified') != null) {
				this.localAmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).amBegin
				this.localAmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).amEnd
				this.localPmBegin = JSON.parse(localStorage.getItem('hoursPlanified')).pmBegin
				this.localPmEnd = JSON.parse(localStorage.getItem('hoursPlanified')).pmEnd
			}
		}
	}
</script>