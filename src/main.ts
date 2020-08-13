import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apolloProvider from "./apollo";
import VueApollo from "vue-apollo";
import Toasted from "vue-toasted";

Vue.use(VueApollo);
Vue.use(Toasted);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  beforeCreate() {
    this.$store.commit("initializeStore", {
      apollo: this.$apollo,
      router: this.$router
    });
  },
  render: h => h(App)
}).$mount("#app");
