/* global gapi */
/* eslint-disable */

export default {
  namespaced: true,
  state: {
    signedIn: false,
    loading: false,
    clientId: process.env.VUE_APP_CLIENT_ID,
    scope: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email",
    GoogleAuth: false
  },
  getters: {
    loggedIn: state => state.signedIn,
    isLoading: state => state.loading,
  },
  mutations: {
    signIn(state) {
      state.signedIn = true;
    },
    signOut(state) {
      state.signedIn = false;
    }
  },
  actions: {
    initGapi({ commit, state }) {
      return new Promise((resolve, reject) => {
        gapi.load('auth2', {
          callback: () => {
            gapi.auth2.init({
              client_id: state.clientId,
              discoveryDocs: "https://sheets.googleapis.com/$discovery/rest?version=v4",
              scope: state.scope,
            }).then(() => {
              gapi.auth2.getAuthInstance().isSignedIn.get() ? commit('signIn') : commit('signOut');
              resolve();
            });
          }
        });
      })
    },
    isSignedIn({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        dispatch('initGapi').then(() => {
          var currentUser = null;
          try { currentUser = gapi.auth2.getAuthInstance().isSignedIn.get(); }
          catch (e) { resolve(false); }
  
          // not signed in - delete persisted user
          if (!currentUser) {
            commit('signOut');
            resolve(false);
          }
          // persisted user id same with signed in google user's id
          // if (state.profile && state.profile.google_id === currentUser.getId()) {
          if (currentUser) {
            commit('signIn');
            resolve(true);
          }
          // persisted user id different with signed in google user's id
          else {
            dispatch('signOut').then(() => {
              resolve(false);
            })
          }
        })
      })
    },
    signIn({ dispatch, commit }) {
      console.log('signing in...');
      dispatch('initGapi').then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          commit('signIn');
        })
      });
    },
    signOut({ dispatch, commit }) {
      console.log('signing out...');
      dispatch('initGapi').then(() => {
        gapi.auth2.getAuthInstance().signOut().then(() => {
          commit('signOut');
        })
      })
    },
  }
};
