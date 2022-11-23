<template>
  <div>
    <div id="containerOne">
      <div>
        <b-modal
          id="modal-center"
          class="logout_model"
          centered
          title="BootstrapVue"
        >
          <p class="my-4">Vertically centered modal!</p>
        </b-modal>
      </div>

      <div class="btm_pge d-flex" v-if="showActionBtn">
        <b-button @click="nextStep" pill variant="primary" class="btn w-100" v-show="currentStepper < 2">Next</b-button>
        <b-button @click="nextStep" pill variant="primary" class="btn w-100" v-show="currentStepper == 2">Submit
        </b-button>
        <b-button
          @click="download"
          pill
          variant="primary"
          class="btn w-100"
          v-show="currentStepper == 3"
          >Download PDF
        </b-button>
        <b-button
          @click="backHome"
          pill
          variant="primary"
          class="btn w-100"
          v-show="downloaded"
          >Back to Home</b-button
        >
        <!-- <button class="ml-2 logout_btn d-flex justify-content-center align-items-center"><i
            class="fa-solid fa-arrow-right-from-bracket" v-b-modal.modal-center></i></button> -->
        <b-button
          class="ml-2 logout_btn d-flex justify-content-center align-items-center"
          @click="logOut"
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </b-button>
      </div>
      <div id="app_container">
        <!-- lgoin Cover -->

        <div class="login_cover">
          <img
            @click="prevStep"
            class="back"
            src="../static/arrow-back.svg"
            alt="back"
            v-show="currentStepper > 0 && currentStepper <= 3"
          />
          <img
            class="page_head_img"
            src="../static/head-img.svg"
            alt="aracbic person"
            width="200px"
          />
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
              <StepOne
                v-show="currentStepper == 0"
                ref="step0"
                :form="$v.form"
              />
              <StepTwo
                v-show="currentStepper == 1"
                ref="step1"
                :form="$v.form"
              />
              <StepThree
                v-show="currentStepper == 2"
                ref="step2"
                :form="$v.form"
              />
              <StepFour
                v-show="currentStepper == 3"
                ref="step3"
                :form="$v.form"
              />
            </div>
          </div>

          <div class="h-100" v-if="done">
            <Done />
          </div>

          <div class="h-100" v-if="startInsert">
            <Start @startInsertion="startForm"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelection from "../components/CountrySelection.vue";
import { required, minLength, url, helpers } from "vuelidate/lib/validators";

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
        country: null,
        project: null,
        no_ad_order: false,
        landing_link: null,
        number: null,
        city: null,
        area: null,
        address: null,
        products: [
          {
            id: 1,
            product_code: null,
            product_image: null,
            product_quantity: null,
            product_size: null,
            product_color: "#FF0000FF",
            product_price: null,
          },
        ],

        price: 0,
        send_brochure: true,
        with_tax: true,
        delay: false,
        start_date: null,
        note: null,
        selectedAddress: null,
        name: null,
      },
    };
  },
  validations: {
    form: {
      landing_link: {
        url,
      },
      name: {
        required,
        minLength: minLength(3),
      },
      number: {
        required,
        phoneNumber: helpers.regex("phoneNumber", /^[\d()+]{7,14}$/),
      },
      city: {
        required,
        minLength: minLength(3),
      },
      area: {
        required,
        minLength: minLength(3),
      },
      address: {
        required,
        minLength: minLength(3),
      },
      project: { required },
      country: { required },
      no_ad_order: {},
      products: {
        $each: {
          id: {},
          product_code: { required },
          product_quantity: { required },
          product_size: { required },
          product_color: { required },
          product_price: { required },
        },
      },
    },
  },
  methods: {
    nextStep() {
      let isvlaid = this.$refs["step" + this.currentStepper].validate();

      if (true) {
        if (this.currentStepper == 3) {
          this.currentStepper = 0;
          this.$refs.stepper.nextStep();
          return;
        } else {
          this.currentStepper++;
          this.$refs.stepper.nextStep();
        }
      } else {
        this.invalidSteps.push(this.currentStepper);
      }
    },
    prevStep() {
      if (this.currentStepper == 0) {
        return;
      } else {
        this.currentStepper--;
        this.$refs.stepper.prevStep();
      }
    },

    download(e) {
      this.formInsertion = false;
      this.downloaded = true;
      this.done = true;
      this.currentStepper++;
      e.target.style.display = "none";
    },

    backHome() {
      this.currentStepper = 0;
      this.formInsertion = true;
      this.done = false;
      this.downloaded = false;
    },

    logOut() {
      this.log_out = "";
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to exit?", {
          title: "Logout",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Logout",
          cancelTitle: "Cancel",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
          .then(value => {
            this.log_out = value;
            if (value) {
              this.$router.push('/')
            }
          })
          .catch(err => {
            // An error occurred
          })
      },

      startForm(){
        // console.log('hey');
        this.startInsert = false;
        this.formInsertion = true;
        this.showActionBtn = true;
      }
  }
  
};
</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
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
