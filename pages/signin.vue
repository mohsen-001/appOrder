<template>
  <div>
    <div id="container">
      <div id="app_container">
        <!-- lgoin Cover -->

        <div class="login_cover">
          <img
            class="login_cover_img"
            src="../static/ara-char.svg"
            alt="aracbic person"
            width="350px"
          />
        </div>

        <!-- login container -->

        <div class="login_container">
          <div class="login_container_head">
            <h2>Welcome</h2>
            <p>Login to continue.</p>
          </div>

          <div class="login_container-form">
            <form action="/">
              <b-form-group
                id="input-group-1"
                label="Username"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.username"
                  type="text"
                  placeholder="Username"
                  required
                >
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                  required
                >
                </b-form-input>
              </b-form-group>

              <b-button
                @click="login()"
                :disabled="isInvalid()"
                variant="primary"
                :class="`cus-btn ${isInvalid() ? 'invalid' : ''}`"
                >Primary</b-button
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    isInvalid() {
      return !(this.form.username && this.form.password);
    },
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            email_username: this.form.username,
            password: this.form.password,
            browser: "343343",
            latitude: "444554",
            longitude: "4545454545",
          },
        })
        .then((res) => {
          this.makeToast("success", "successfully loggined");
          this.$router.push("/");
          console.log("login successfully");
        })
        .catch(async (err) => {
          this.makeToast("danger", err.response.data.message);
          console.log("eerror", err.response.data.message);
        });
    },

    makeToast(variant = null, message = "sss") {
      this.$bvToast.toast(message, {
        variant: variant,
        solid: true,
        noCloseButton: true,
        autoHideDelay: "1000",
      });
    },
  },
};
</script>

<style scoped>
/* :root {
  --pri-color: #115598;
} */

/* hey */

body {
  font-family: "Poppins", sans-serif;
}
.invalid {
  cursor: not-allowed;
}
#container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.cus-btn {
  padding: 15px;
  width: 100%;
  /* max-width: 600px; */
  border-radius: 50px;
  margin-top: 10px;
  /* background-color: #115598; */
}

#app_container {
  width: 600px;
  height: 100vh;
  background-color: #115598 !important;
}

.login_cover {
  width: 100%;
  height: 35%;
  position: relative;
}

.login_cover_img {
  position: absolute;
  bottom: -35px;
}

.login_container {
  background-color: white;
  width: 100%;
  height: 65%;
  border-top-right-radius: 81px;
}

.login_container_head {
  text-align: center;
  padding: 20px;
}

.login_container-form {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

input {
  width: 300px;
  height: 50px;
  border-radius: 50px;
}

.login_container_head {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login_container_head h2 {
  font-weight: 900;
  color: #115598;
}

/* for mobile size */

/* @media screen and (min-width: 767px) {

} */

@media screen and (max-width: 768px) {
  #app_container {
    width: 100%;
    height: 100vh;
    background-color: #4779ff;
  }
}
</style>
