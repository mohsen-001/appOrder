<template>
  <div>
    <div id="containerOne">
      <div class="btm_pge">
        <b-button
          @click="nextStep"
          pill
          variant="primary"
          class="btn w-100"
          v-show="currentStepper < 3"
          >Next</b-button
        >
        <b-button
          @click="download"
          pill
          variant="primary"
          class="btn w-100"
          v-show="currentStepper == 3"
          >Download PDF</b-button
        >
        <b-button
          @click="backHome"
          pill
          variant="primary"
          class="btn w-100"
          v-show="downloaded"
          >Back to Home</b-button
        >
      </div>
      <div id="app_container">
        <!-- lgoin Cover -->

        <div class="login_cover">
          <img
            class="back"
            src="../static/arrow-back.svg"
            alt="back"
            v-show="currentStepper !== 0"
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
              <StepOne v-show="currentStepper == 0" ref="step0" />
              <StepTwo v-show="currentStepper == 1" ref="step1" />
              <StepThree v-show="currentStepper == 2" ref="step2" />
              <StepFour v-show="currentStepper == 3" ref="step3" />
            </div>
          </div>

          <div class="h-100" v-if="done">
            <Done />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelection from "../components/CountrySelection.vue";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "StepOnePage",
  data() {
    return {
      checked: true,
      form: {
        link: "",
      },
      currentStepper: 0,
      // isInvoice: false,
      downloaded: false,
      formInsertion: true,
      done: false,
      invalidSteps: [],
    };
  },
  validations: {
    form: {
      link: {
        required,
        minLength: minLength(3),
      },
      name: {
        required,
        minLength: minLength(3),
      },
      number: {
        required,
        minLength: minLength(3),
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
    },
  },
  methods: {
    nextStep() {
      let isvlaid = this.$refs["step" + this.currentStepper].validate();
      if (isvlaid) {
        if (this.currentStepper >= 3) {
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

      // console.log(this.currentStepper);
    },
    prevStep() {
      if (this.currentStepper == 0) {
        return;
      } else {
        this.currentStepper--;
        this.$refs.stepper.prevStep();
      }

      // console.log('hey');
    },

    download(e) {
      this.formInsertion = false;
      this.downloaded = true;
      this.done = true;
      // console.log(e.target);
      e.target.style.display = "none";
    },

    backHome() {
      this.currentStepper = 0;
      this.formInsertion = true;
      this.done = false;
      this.downloaded = false;
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
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

/* .cus-btn {
  padding: 15px;
  width: 100%;
  border-radius: 50px;
  margin-top: 10px;
} */

.btm_pge {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: white;
  padding: 10px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0px -3px 6px -3px rgba(0, 0, 0, 0.3);
  z-index: 10;
  /* -webkit-box-shadow: 1px -4px 5px -8px rgba(0,0,0,0.11);
  -moz-box-shadow: 1px -4px 5px -8px rgba(0,0,0,0.11); */
}

#app_container {
  width: 600px;
  height: 100vh;
  background-color: #115598 !important;
}

.form_area {
  margin-top: 40px;
  height: 80%;
  overflow: scroll;
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
