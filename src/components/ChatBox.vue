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
      <div class="form-group mt-3 mb-0">
        <textarea
          class="form-control"
          rows="3"
          placeholder="Type your message here..."
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatBox",
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    chatName() {
      return this.$store.state.chatName;
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
