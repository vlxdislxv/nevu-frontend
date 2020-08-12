<style>
@import "../assets/styles/home.css";
</style>
<template>
  <div class="home">
    <div class="container">
      User: {{ fullName }}
      <div class="content-wrapper">
        <div class="row gutters">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="card m-0">
              <div class="row no-gutters">
                <ChatList />
                <ChatBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";

export default {
  name: "Home",
  components: {
    ChatBox,
    ChatList
  },
  computed: {
    fullName() {
      return this.$store.state.user.fullName;
    }
  }
};
</script>
