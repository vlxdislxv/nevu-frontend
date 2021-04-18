import Vue from "vue";
import Vuex from "vuex";
import { DollarApollo } from "vue-apollo/types/vue-apollo";
import { profileQuery } from "../common/gql-constants";
import VueRouter from "vue-router";
import { getToken } from "../helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    authenticated: false,
    selectedUser: undefined,
    messages: [],
    chats: [],
    searchUsers: [],
    user: {},
    chatName: "",
    chatId: -1,
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    searchUsers(state, searchUsers) {
      state.searchUsers = searchUsers;
    },
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
    initializeStore(
      state,
      { apollo, router }: { apollo: DollarApollo<unknown>; router: VueRouter }
    ) {
      const token = getToken();
      if (token) {
        state.token = token;
        state.authenticated = true;
        apollo
          .query({
            query: profileQuery,
            context: {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          })
          .then((res) => {
            state.user = res.data.profile;
          })
          .catch(() => {
            state.authenticated = false;
            state.token = "";
            localStorage.removeItem("token");
            router.push("login");
          });
      }
    },
  },
  actions: {},
  modules: {},
  getters: {
    searchUsers(state) {
      return state.searchUsers;
    },
    chats(state) {
      return state.chats;
    },
    chatName(state) {
      return state.chatName;
    },
    chatId(state) {
      return state.chatId;
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
    },
  },
});
