<!-- <div class="invoice_page_hide">
  <PdfPage ref="pdfDownload" />
</div> -->
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
          <img @click="prevStep" class="back" src="../static/arrow-back.svg" alt="back"
            v-show="currentStepper > 0 && currentStepper <= 3" />
          <img class="page_head_img" src="../static/head-img.svg" alt="aracbic person" width="200px" />
        </div>

        <!-- login container -->

        <div class="page_container">
          <div class="h-100" v-if="formInsertion">
            <div class="page_stepper">
              <div class="stepper_area p40">
                <Stepper ref="stepper" />
              </div>
            </div>

            <div class="form_area">
              <StepOne v-show="currentStepper == 0" ref="step0" :form="$v.form" />
              <StepTwo v-show="currentStepper == 1" ref="step1" :form="$v.form" />
              <StepThree v-show="currentStepper == 2" ref="step2" :form="$v.form" />
              <StepFour v-show="currentStepper == 3" ref="step3" :form="$v.form" />
            </div>
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
import CountrySelection from "../components/CountrySelection.vue";
import { required, minLength, url, helpers } from "vuelidate/lib/validators";
import { jsPDF } from "jspdf";

export default {
  name: "StepOnePage",
  data() {
    return {
      checked: true,

      log_out: "",
      currentStepper: 0,
      // isInvoice: false,
      showActionBtn: false,
      downloaded: false,
      formInsertion: false,
      startInsert: true,
      done: false,
      invalidSteps: [],
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
body {
  font-family: "Poppins", sans-serif;
}

.invoice_page_hide{
  position: fixed !important;
  top: -2000px !important;
}

.logout_btn {
  width: 66px;
  height: 66px;
  border-radius: 50px;
}

.logout_btn {
  border: none;
  background-color: #007bff17;
}

.logout_btn:active {
  background-color: #007bff2b;
}

.logout_btn:focus {
  background-color: #007bff2b;
  border-color: #0062cc;
  box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
}

.logout_btn i {
  font-size: 1.3rem;
  width: 66px;
  color: #007bff;
}

.back {
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  width: 20px;
}

#containerOne {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.btm_pge {
  position: fixed;
  width: 100%;
  max-width: 820px;
  bottom: 0;
  background-color: white;
  padding: 10px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0px -3px 6px -3px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

#app_container {
  width: 820px;
  height: 100vh;
  background-color: #115598 !important;
}

.form_area {
  margin-top: 40px;
  height: 80%;
  overflow: auto;
  padding-bottom: 20px;
  /* padding: 30px; */
}

.login_cover {
  width: 100%;
  height: 12%;
  position: relative;
}

.page_head_img {
  position: absolute;
  bottom: 0px;
  right: 20px;
}

.page_container {
  background-color: white;
  width: 100%;
  height: 88%;
  border-top-left-radius: 81px;
  padding: 20px 0;
}

.p40 {
  padding: 0 40px;
}

.m20 {
  margin-top: 20px;
}

@media screen and (max-width: 768px) {
  #app_container {
    width: 100%;
    height: 100vh;
    background-color: #4779ff;
  }
}
</style>
