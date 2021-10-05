/* global gapi */
/* eslint-disable */

import router from "../router";

export default {
  namespaced: true,
  // Variable waiting values
  state: {
    signedIn: false,
    profile: null,
    loading: false,
    clientId: process.env.VUE_APP_CLIENT_ID,
    scope: "profile https://www.googleapis.com/auth/spreadsheets",
    GoogleAuth: false
  },
  // Give the values 
  getters: {
    loggedIn: state => state.signedIn,
    isLoading: state => state.loading,
    profileGet: state => state.profile
  },
  // Store the values in the state corresponding 
  mutations: {
    signIn(state, profile) {
      state.signedIn = true;
      if (profile) {
        state.profile = {
          'firstname' : Object.values(profile)[2],
          'lastname' : Object.values(profile)[3],
          'email' : Object.values(profile)[5]
        };
      }
    },
    loading(state, loadingState) {
      state.logging = loadingState;
    },
    signOut(state) {
      state.signedIn = false;
      state.loading = false;
      state.profile = null;
    },
    getAuthInstance(state, authInstance) {
      if (!state.GoogleAuth) {
        state.GoogleAuth = authInstance;
      }
    }
  },
  // Make the calls to the API
  actions: {
    // Init gapi
    initGapi({ state, commit }) {
      return new Promise(resolve => {
        gapi.load('auth2', {
          callback: () => {
            // Client ID, DiscoveryDocs and scope are required
            gapi.auth2.init({
                client_id: state.clientId,
                discoveryDocs: "https://sheets.googleapis.com/$discovery/rest?version=v4",
                scope: state.scope
            }).then(() => {
              gapi.client
                .load(
                  "https://sheets.googleapis.com/$discovery/rest?version=v4"
                )
                .then(() => {
                  commit("getAuthInstance", gapi.auth2.getAuthInstance());
                  resolve();
                });
            });
          }
        });
      });
    },
    // Get the profile of the user 
    assignUser({ commit, state }, userData) {
      let user = state.GoogleAuth.currentUser.get();
      if (userData) {
        user = userData;
      }
      if (user.getBasicProfile()) {
        return commit("signIn", user.getBasicProfile());
      }
    },
    // Check if the user is signed in
    isSignedIn({ dispatch, commit, state, rootState }) {
      return new Promise((resolve, reject) => {
        dispatch("initGapi").then(() => {
          commit("getAuthInstance", gapi.auth2.getAuthInstance());
          try {
            if (state.GoogleAuth.isSignedIn.get() && state.profile) {
              dispatch("assignUser").then(() => {
                commit("signIn");
              });
            }
            resolve(state.GoogleAuth.isSignedIn.get() && state.profile);
          } catch (e) {
            reject(e);
          }
        }).catch((e) => {
          rootState.error = "Windmill n'as pas pu ce connecter à Google"
          reject(e)
        });
      });
    }, 
    // Call the method for sign in the user 
    signIn({ dispatch, state }) {
      console.log("signing in...");
      return new Promise((resolve, reject) => {
        dispatch("initGapi").then(async () => {
          await state.GoogleAuth.signIn({scope: "profile email"}).then(response => {
            if (response) {
              // The user can access to the spreadsheet 
              dispatch("assignUser", response).then(() => {
                router.push('/home')
                resolve(true);
              });
            } else {
              reject();
            }
          })
          .catch(err => {
            console.log(err);
            dispatch("signOut").then(() => {
              reject();
            });
          });
        });
      });
    },
    // Sign out the user 
    signOut({ commit }) {
      console.log("signing out...");
      return new Promise(resolve => {
        if (gapi && gapi.auth2 && gapi.auth2.getAuthInstance()) {
          gapi.auth2.getAuthInstance().signOut().then(() => {
            commit("signOut");
            router.push('/login')
            resolve();
          });
        } else {
          commit("signOut");
          resolve();
        }
      });
    }
  }
};
