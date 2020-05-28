<template>
  <div class="about">

    <div class="centered">
      <h1 style="padding-bottom: 40px;">Windmill</h1>

      <p><button v-on:click="loggedIn ? logout() : login()" class="button button-primary">{{loggedIn ? 'Déconnexion' : 'Connexion avec Google'}}</button></p>
      <!-- <p><button v-on:click="loggedIn ? logout() : login()" class="btn btn-primary">{{loggedIn ? 'Déconnexion' : 'Connexion avec Google'}}</button></p> -->
      <p>Utilisez votre compte Google Antistatique</p>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'login',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('authentication', [
      'loggedIn'
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'signIn',
      'signOut',
      'isSignedIn'
    ]),
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