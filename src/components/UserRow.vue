<template>
  <li
    v-on:click="this.createChat"
    class="person"
    v-bind:class="{ 'active-user': isActive }"
  >
    <div class="user">
      <img
        src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
        alt="Retail Admin"
      />
      <span class="status away"></span>
    </div>
    <p class="name-time">
      <span class="name">{{ fullName }}</span>
      <!-- <span class="time">12/02/2019</span> -->
      <button
        v-on:click="this.createChat"
        type="button"
        class="btn btn-success cc_btn"
      >
        create chat
      </button>
    </p>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getChatQuery, createChatQuery } from "../common/gql-constants";

@Component
export default class UserRow extends Vue {
  @Prop() private id!: string;
  @Prop() private fullName!: string;
  private clicked = false;

  data() {
    const vxUser = this.$store.getters.selectedUser;
    return {
      isActive: vxUser == this.id
    };
  }

  createChat() {
    if (!this.clicked) {
      this.$apollo
        .mutate({
          mutation: createChatQuery,
          context: {
            headers: {
              authorization: `Bearer ${this.$store.getters.token}`
            }
          },
          variables: {
            userId: this.id
          }
        })
        .then(res => {
          const newChat = res.data.createChat;

          this.$store.state.chatId = newChat.id;
          this.$store.state.chatName = newChat.name;

          this.$store.commit("messages", []);

          this.getChats();

          this.$store.commit("searchUsers", []);
        })
        .catch(err => console.log(err));
    }
    this.clicked = true;
  }
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
  }
}
</script>
