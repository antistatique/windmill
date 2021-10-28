<template>
	<b-card title="Une erreur est survenue" tag="article" style="max-width: 500px;  margin: auto; margin-top: 3%;">
		<b-card-text>
            {{ this.message }}
        </b-card-text>
        <button class="button button-primary" v-on:click="reload()">Recharger l'app</button>
	</b-card>
</template>


<script>
  export default {
    name: "ErrorMessage",
    props: {
        message: String,
    },
    methods: {
        reload() {
            window.location.reload()
        }
    }
  };
</script>