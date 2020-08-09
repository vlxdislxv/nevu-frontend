<template>
  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
    <div class="users-container">
      <div class="chat-search-box">
        <div class="input-group">
          <input class="form-control" placeholder="Search" />
          <div class="input-group-btn">
            <button type="button" class="btn btn-info">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <ul class="users">
        <div v-for="chat in chats" v-bind:key="chat.id">
          <ChatRow :id="chat.id" :name="chat.name" />
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import ChatRow from "./ChatRow";
import gql from "graphql-tag";

export default {
  name: "ChatList",
  beforeMount() {
    if (!this.$store.getters.authenticated) {
      this.$router.push("login");
    }
    this.$apollo
      .query({
        query: gql`
          query chats {
            getChat {
              id
              name
            }
          }
        `,
        context: {
          headers: {
            authorization: `Bearer ${this.$store.getters.token}`
          }
        }
      })
      .then(res => {
        this.$store.commit("chats", res.data.getChat);
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    chats() {
      return this.$store.state.chats;
    }
  },
  components: {
    ChatRow
  }
};
</script>
