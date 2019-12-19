import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userIsPublic: null,
    authData: null,
    phoneToBeVerfied: '',
    validVerficationCode: '',
  },
  mutations: {
    updateAuthData(state, data) {
      state.authData = data;
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateUserStatus(state, stat) {
      state.userIsPublic = stat;
    },
    updatePhoneToBeVerfied(state, phone) {
      state.phoneToBeVerfied = phone;
    },
    updateVerificationCode(state, code) {
      state.validVerficationCode = code;
    },
  },
  actions: {

  },
});
