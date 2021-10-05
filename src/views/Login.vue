<template>
  <div class="about mx-auto bg-white min-vh-100" v-bind:style="{maxWidth: '500px'}">

    <div class="centered">
      <h1 style="padding-bottom: 40px;">Windmill</h1>

      <p><button v-on:click="loggedIn ? logout() : login()" class="button button-primary">{{loggedIn ? 'Déconnexion' : 'Connexion avec Google'}}</button></p>
      <p>Utilisez votre compte Google Antistatique</p>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'login',
  beforeCreate() {
    this.$store.state.error  = !this.loggedIn ? "L'utilisateur n'est pas connecté" : ''
  },
  data() {
    return {};
  },
  // Get a getters from the store authentication
  computed: {
    ...mapGetters('authentication', [
      'loggedIn'
    ]),
  },
  // Get methods from the store authentication
  methods: {
    ...mapActions('authentication', [
      'signIn',
      'signOut',
      'isSignedIn'
    ]),
    // Use method from the store 
    login() {
      this.signIn();
    },
    logout() {
      this.signOut();
    }
  }
};
</script>

<style>
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
</style>