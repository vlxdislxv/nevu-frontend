<template>
  <div class="home">
    <h1>home</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  beforeMount() {
    if (!this.$store.getters.authenticated) {
      this.$router.push("login");
    }
  }
};
</script>
