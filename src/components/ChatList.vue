<template>
  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
    <div class="users-container">
      <div class="chat-search-box">
        <div class="input-group">
          <input v-model="search" class="form-control" placeholder="Search" />
          <div class="input-group-btn">
            <button v-on:click="this.find" type="button" class="btn btn-info">
              <i class="fa fa-search"></i>
            </button>
            <button
              v-on:click="this.clearFinds"
              type="button"
              class="btn btn-danger"
            >
              <i class="fa fa-close"></i>
            </button>
          </div>
        </div>
      </div>
      <ul class="users">
        <div v-for="chat in chats" v-bind:key="chat.id">
          <ChatRow :id="chat.id" :name="chat.name" />
        </div>
        <div v-for="user in searchUsers" v-bind:key="user.id">
          <UserRow :id="user.id" :full-name="user.fullName" />
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import ChatRow from "./ChatRow";
import UserRow from "./UserRow";
import { getChatQuery, findUserQuery } from "../common/gql-constants";

export default {
  name: "ChatList",
  data: function() {
    return {
      search: ""
    };
  },
  beforeMount() {
    if (!this.$store.getters.authenticated) {
      this.$router.push("login");
    }
    this.getChats();
  },
  computed: {
    chats() {
      return this.$store.state.chats;
    },
    searchUsers() {
      return this.$store.state.searchUsers;
    }
  },
  methods: {
    getChats() {
      this.$apollo
        .query({
          query: getChatQuery,
          context: {
            headers: {
              authorization: `Bearer ${this.$store.getters.token}`
            }
          },
          fetchPolicy: "no-cache"
        })
        .then(res => {
          this.$store.commit("chats", res.data.getChat);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearFinds() {
      this.$store.commit("searchUsers", []);
      this.getChats();
      this.search = "";
    },
    find() {
      this.$apollo
        .query({
          query: findUserQuery,
          context: {
            headers: {
              authorization: `Bearer ${this.$store.getters.token}`
            }
          },
          variables: {
            search: this.search
          }
        })
        .then(res => {
          this.$store.commit("searchUsers", res.data.findUser);
          this.$store.commit("chats", []);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    ChatRow,
    UserRow
  }
};
</script>
