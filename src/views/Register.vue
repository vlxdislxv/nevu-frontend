<template>
  <div class="login">
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div class="login100-pic js-tilt" data-tilt>
            <img src="images/sign.png" alt="IMG" />
          </div>
          <form class="login100-form validate-form" @submit.prevent>
            <span class="login100-form-title">Member Signup</span>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                type="text"
                name="full_name"
                placeholder="Full Name"
                :value="member.fullName"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-address-card"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                type="text"
                name="email"
                placeholder="Email"
                :value="member.email"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                type="text"
                name="username"
                placeholder="Username"
                :value="member.username"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                type="password"
                name="pass"
                placeholder="Password"
                :value="member.password"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div class="container-login100-form-btn">
              <button v-on:click="this.signUp" class="login100-form-btn">
                Register
              </button>
            </div>

            <div class="text-center p-t-40">
              <router-link class="txt2" to="/login">
                login
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
export default {
  data() {
    return {
      member: {
        fullName: "",
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp() {
      console.log("test");
    }
  }
};
</script>
