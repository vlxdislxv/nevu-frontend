<template>
  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
    <div class="selected-user">
      <span>
        <span class="name">{{ chatName }}</span>
      </span>
    </div>
    <div class="chat-container">
      <ul class="chat-box chatContainerScroll">
        <div v-for="message in messages" v-bind:key="message.id">
          <li v-if="message.from.id === user.id" class="chat-left">
            <div class="chat-avatar">
              <img
                src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
                alt="Retail Admin"
              />
              <div class="chat-name">{{ message.from.fullName }}</div>
            </div>
            <div class="chat-text">
              {{ message.text }}
            </div>
            <!-- <div class="chat-hour">
              08:55 <span class="fa fa-check-circle"></span>
            </div> -->
          </li>
          <li v-if="message.from.id !== user.id" class="chat-right">
            <!-- <div class="chat-hour">
              08:56 <span class="fa fa-check-circle"></span>
            </div> -->
            <div class="chat-text">
              {{ message.text }}
            </div>
            <div class="chat-avatar">
              <img
                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                alt="Retail Admin"
              />
              <div class="chat-name">{{ message.from.fullName }}</div>
            </div>
          </li>
        </div>
      </ul>
      <div v-if="chatId !== -1" class="form-group mt-3 mb-0">
        <textarea
          class="form-control"
          rows="3"
          placeholder="Type your message here..."
          v-model="message"
        ></textarea>
        <button v-on:click="this.sendMessage" class="btn btn-success">
          send message
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { addMessageQuery, messageReceived } from "@/common/gql-constants";

export default {
  name: "ChatBox",
  mounted() {
    const observer = this.$apollo.subscribe({
      query: messageReceived,
    });

    observer.subscribe({
      next: (({ data }) => {
        const msg = data.messageReceived;
        this.$toasted.show(`new message from ${msg.from.fullName}`, {
          theme: "bubble",
          position: "top-right",
          duration: 5000
        });
        if (msg.chat.id === this.$store.getters.chatId) {
          this.$store.state.messages.push(msg);
          setTimeout(() => {
            const el = this.$el.querySelector(".chatContainerScroll");
            el.scrollTop = el.scrollHeight;
          });
        }
      }).bind(this),
      error (error) {
        console.error(error)
      },
    });
  },
  data() {
    return {
      message: ""
    };
  },
  updated() {
    setTimeout(() => {
      const elf = this.$el.querySelector(".chatContainerScroll");
      elf.scrollTop = elf.scrollHeight;
    });
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    chatName() {
      return this.$store.state.chatName;
    },
    chatId() {
      return this.$store.state.chatId;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    sendMessage() {
      this.$apollo
        .mutate({
          mutation: addMessageQuery,
          context: {
            headers: {
              authorization: `Bearer ${this.$store.getters.token}`
            }
          },
          variables: {
            chatId: this.chatId,
            text: this.message
          }
        })
        .then(res => {
          this.$store.state.messages.push(res.data.addMessage);
          setTimeout(() => {
            const el = this.$el.querySelector(".chatContainerScroll");
            el.scrollTop = el.scrollHeight;
          });
        });
    }
  }
};
</script>
