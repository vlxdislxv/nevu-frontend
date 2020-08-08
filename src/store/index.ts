import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    authenticated: false
  },
  mutations: {
    authenticate(state, payload) {
      state.authenticated = true;
      state.token = payload.token;
      localStorage.setItem("token", state.token);
    },
    initializeStore(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.authenticated = true;
      }
    }
  },
  actions: {},
  modules: {},
  getters: {
    authenticated(state) {
      return state.authenticated;
    }
  }
});
