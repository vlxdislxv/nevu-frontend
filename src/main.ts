import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apolloProvider from "./apollo";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  beforeCreate() {
    this.$store.commit("initializeStore", this.$apollo);
  },
  render: h => h(App)
}).$mount("#app");
