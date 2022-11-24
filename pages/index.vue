<template>
  <div>
    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">Notice!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
      </template>
      This is the content of the toast. It is short and to the point.
    </b-toast>
    <b-button @click="$bvToast.show('my-toast')">Show toast</b-button>
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

              <b-button @click="signIn" variant="primary" class="cus-btn"
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
      signKey: 1,
      showVerify: false,
      rememberMe: true,
      disableLoginButton: true,
      error: {},
      invalidCreds: "",
      networkError: false,
      email: "",
      password: "",
      isLoading: false,
      showPass: false,
      gettingLocation: false,
      location: null,
      errorStr: null,
      fetch: true,
      show1: false,
      aniPass: true,
      aniSuccess: false,
      aniError: false,
    };
  },
  methods: {
    login() {
      this.$router.push("/start");
    },
    async signIn() {
      this.aniSuccess = true;
      this.aniPass = false;
      this.aniError = false;

      this.isLoading = true;
      await this.$auth
        .loginWith("local", {
          data: {
            email_username: this.form.username,
            password: this.from.password,
            browser: this.detectBrowser(),
            latitude: this.latitude,
            longitude: this.longitude,
          },
        })
        .then((res) => {
          localStorage.removeItem("company_popup_dialog");
          this.$router.push("/");
          // this.$toastr.s(this.$tr("successfully_logged_in"));
          // this.$toasterNA("green", this.$tr("successfully_logged_in"));
          this.isLoading = false;
        })
        .catch(async (err) => {
          this.aniSuccess = false;
          this.aniPass = false;
          this.aniError = true;
          let play = document.querySelector("#animationError");
          play.getLottie().stop();
          await play.getLottie().play();
          this.showVerify = false;
          this.isLoading = false;
          if (err.response) {
            if (err.response.status == 422) {
              this.error = err.response.data.errors;
              if (this.error.password) {
                // this.$toastr.e(this.$tr(this.error.password[0]));
                // this.$toasterNA("red", this.$tr(this.error.password[0]));
              }
              if (this.error.email) {
                // this.$toastr.e(this.$tr(this.error.email[0]));
                // this.$toasterNA("red", this.$tr(this.error.email[0]));
              }
            } else if (
              err.response.status === 401 &&
              err.response.data.timeLimit
            ) {
              // this.$toastr.e(this.$tr("not_allowed_at_current_time"));
              // this.$toasterNA("red", this.$tr("not_allowed_at_current_time"));
            } else if (err.response.status == 401) {
              this.invalidCreds = err.response.data.message;
              // this.$toastr.e(this.invalidCreds);
              this.$toasterNA("red", this.invalidCreds);
            } else if (err.response.status == 406) {
              // this.$toastr.e(this.$tr("account_not_activated"));
              // this.$toasterNA("red", this.$tr("account_not_activated"));
            } else if (err.response.status == 500) {
              this.networkError = true;
              this.invalidCreds = err.response.data.message;
              // this.$toastr.e(this.$tr("server_error_please_try_again"));
              // this.$toasterNA("red", this.$tr("server_error_please_try_again"));
            } else if (err.response.status == 404) {
              this.invalidCreds = err.response.data.message;
              // this.$toastr.e(
              // 	this.$tr("account_warning_password_incorrect_5_times"),
              // );
              // this.$toasterNA(
              //   "red",
              //   this.$tr("account_warning_password_incorrect_5_times")
              // );
            } else if (err.response.status == 405) {
            } else if (err.response.status == 406) {
            } else if (err.response.status == 307) {
            } else if (err.response.status == 308) {
            }
          } else if (err.message == "Network Error") {
          }
        });
    },

    detectBrowser() {
      let userAgent = navigator.userAgent;
      let browserName;

      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "edge";
      } else {
        browserName = "No browser detection";
      }
      return browserName;
    },
  },
};
</script>

<style scoped>
/* :root {
  --pri-color: #115598;
} */

body {
  font-family: "Poppins", sans-serif;
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
