<template>
	<div class="bloc-modale" v-if="revele">
		<div class="overlay" v-on:click="toggleModal"></div>

		<div class="modale">
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
			<div class="titleModal">{{name}}</div>
			<div class="time-selection">
				<button class="button button-number" v-on:click="action(0, 15);">15'</button>
				<button class="button button-number" v-on:click="action(0, 30);">30'</button>
				<button class="button button-number" v-on:click="action(0, 45);">45'</button>
				<button class="button button-number" v-on:click="action(1, 0);">1h</button>
				<button class="button button-number" v-on:click="action(1, 15);">1h15</button>
				<button class="button button-number" v-on:click="action(1, 30);">1h30</button>
				<button class="button button-number" v-on:click="action(1, 45);">1h45</button>
				<button class="button button-number" v-on:click="action(2, 0);">2h</button>
				<button class="button button-number" v-on:click="action(2, 15);">2h15</button>
				<button class="button button-number" v-on:click="action(2, 30);">2h30</button>
				<button class="button button-number" v-on:click="action(2, 45);">2h45</button>
				<button class="button button-number" v-on:click="action(3, 0);">3h</button>
				<button class="button button-validation" v-on:click="toggleModal">Fermer</button>
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
			"action",
			"name"
		],
	}
</script>