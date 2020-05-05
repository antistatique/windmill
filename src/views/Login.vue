<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button v-if="!loggedIn" v-on:click="login()">connexion</button>
    <button v-else v-on:click="logout()">déconnexion</button>
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
  props: ['loading'],
  computed: {
    ...mapActions('authentication', [
      'initGapi'
    ]),
    ...mapGetters('authentication', [
      'loggedIn'
    ])
  },
  methods: {
    ...mapGetters('authentication', [
      'loggedIn'
    ]),
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