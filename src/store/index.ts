import Vue from "vue";
import Vuex from "vuex";
import { DollarApollo } from "vue-apollo/types/vue-apollo";
import { gql } from "apollo-boost";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    authenticated: false,
    selectedUser: undefined,
    messages: [],
    chats: [],
    user: {},
    chatName: ""
  },
  mutations: {
    chats(state, chats) {
      state.chats = chats;
    },
    messages(state, messages) {
      state.messages = messages;
    },
    authenticate(state, payload) {
      state.authenticated = true;
      state.token = payload.token;
      localStorage.setItem("token", state.token);
    },
    initializeStore(state, apollo: DollarApollo<object>) {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.authenticated = true;
        apollo
          .query({
            query: gql`
              query {
                profile {
                  id
                  username
                  fullName
                }
              }
            `,
            context: {
              headers: {
                authorization: `Bearer ${token}`
              }
            }
          })
          .then(res => {
            state.user = res.data.profile;
          })
          .catch(() => {
            state.authenticated = false;
            state.token = "";
            localStorage.removeItem("token");
          });
      }
    }
  },
  actions: {},
  modules: {},
  getters: {
    chats(state) {
      return state.chats;
    },
    chatName(state) {
      return state.chatName;
    },
    authenticated(state) {
      return state.authenticated;
    },
    selectedUser(state) {
      return state.selectedUser;
    },
    token(state) {
      return state.token;
    },
    messages(state) {
      return state.messages;
    },
    user(state) {
      return state.user;
    }
  }
});
