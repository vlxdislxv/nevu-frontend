<template>
  <div class="login">
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div class="login100-pic js-tilt" data-tilt>
            <img src="images/img-01.png" alt="IMG" />
          </div>
          <form class="login100-form validate-form" @submit.prevent>
            <span class="login100-form-title">Member Login</span>

            <div
              class="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                class="input100"
                type="text"
                name="username"
                placeholder="username"
                v-model.lazy="member.username"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                class="input100"
                type="password"
                name="pass"
                placeholder="Password"
                v-model.lazy="member.password"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div class="container-login100-form-btn">
              <button v-on:click="this.login" class="login100-form-btn">
                Login
              </button>
            </div>

            <div class="text-center p-t-136">
              <router-link class="txt2" to="/register">
                Create your Account
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      member: {
        username: "",
        password: ""
      }
    };
  },
  beforeMount() {
    if (this.$store.getters.authenticated) {
      this.$router.push("home");
    }
  },
  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($username: String!, $password: String!) {
              login(user: { username: $username, password: $password }) {
                token
              }
            }
          `,
          variables: { ...this.member }
        })
        .then(resp => {
          const token = resp.data.login.token;
          this.$store.commit("authenticate", { token });
          this.$router.push("home");
        })
        .catch(err => {
          console.log(err.graphQLErrors);
          alert("invalid input data");
        });
    }
  }
};
</script>
