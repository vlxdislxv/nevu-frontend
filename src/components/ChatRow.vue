<template>
  <li
    v-on:click="this.selectChat"
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
      <span class="name">{{ name }}</span>
      <!-- <span class="time">12/02/2019</span> -->
    </p>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { gql } from "apollo-boost";

@Component
export default class ChatRow extends Vue {
  @Prop() private id!: string;
  @Prop() private name!: string;

  data() {
    const vxUser = this.$store.getters.selectedUser;
    return {
      isActive: vxUser == this.id
    };
  }

  selectChat() {
    this.$apollo
      .query({
        query: gql`
          query {
            getMessage(chatId: ${this.id}) {
              id
              text
              from {
                id
                username
                fullName
              }
            }
          }
        `,
        context: {
          headers: {
            authorization: `Bearer ${this.$store.getters.token}`
          }
        },
        fetchPolicy: "no-cache"
      })
      .then(res => {
        this.$store.commit("messages", res.data.getMessage);
        this.$store.state.chatId = this.id;
        this.$store.state.chatName = this.name;
      })
      .catch(err => console.log(err));
  }
}
</script>
