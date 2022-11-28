<template>
  <div>
    <div class="invoice_page_hide">
      <PdfPage ref="pdfDownload" :form_data.sync="form" />
    </div>
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
        <b-button
          @click="nextStep"
          pill
          style="background: #115598"
          class="btn w-100"
          v-show="currentStepper < 2"
          >Next</b-button
        >
        <b-button
          @click="submit"
          pill
          variant="primary"
          class="btn w-100"
          v-show="currentStepper == 2"
          >Submit
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
        <!-- <b-button class="
            ml-2
            logout_btn
            d-flex
            justify-content-center
            align-items-center
          ">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </b-button> -->
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

          <b-dropdown
            id="dropdown-right"
            right
            :html="`<i class='fa-solid fa-ellipsis-vertical'></i>`"
            variant="primary"
            class="m-2"
          >
            <b-dropdown-item-button
              ><i class="fa-solid fa-user"></i> Profile</b-dropdown-item-button
            >
            <b-dropdown-item-button @click="logOut"
              ><span
                ><i class="fa-solid fa-arrow-right-from-bracket"></i
                >logout</span
              ></b-dropdown-item-button
            >
          </b-dropdown>
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
            <Start @startInsertion="startForm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelection from "../components/CountrySelection.vue";
import {
  required,
  minLength,
  url,
  helpers,
  requiredIf,
} from "vuelidate/lib/validators";
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
        selected_company: null,
        invoice_number: null,
        country: null,
        project: null,
        source: 7,
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
            product_quantity: 1,
            product_size: null,
            product_color: "",
            product_price: null,
          },
        ],
        price_per_picture: false,
        price: null,
        delivery_fee: 0,
        delay: null,
        delay_order: false,
        note: null,
        name: null,
      },
      reset_form: {
        selected_company: null,
        invoice_number: null,
        country: null,
        project: null,
        source: 7,
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
            product_quantity: 1,
            product_size: null,
            product_color: "",
            product_price: null,
          },
        ],
        price_per_picture: false,
        price: null,
        delivery_fee: 0,
        delay: null,
        delay_order: false,
        note: null,
        name: null,
      },
    };
  },
  validations: {
    form: {
      source: {},
      landing_link: {
        url,
        required: requiredIf(function (value) {
          return !this.form.no_ad_order;
        }),
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
          product_size: {},
          product_color: {},
          product_price: {
            required: requiredIf(function (value) {
              return this.form.price_per_picture;
            }),
          },
        },
      },
      price_per_picture: {},
      price: {
        required: requiredIf(function (value) {
          return this.form.price_per_picture == false;
        }),
        // minValue: conditional(
        //   !this.form.price_per_picture,
        //   (value) => value > 0
        // ),
      },
      delivery_fee: {},
      delay_order: {},
      delay: {
        required: requiredIf(function (value) {
          return this.form.delay_order;
        }),
      },

      note: {
        required,
        minLength: minLength(5),
      },
      selected_company: {},
      invoice_number: {},
    },
  },
  methods: {
    conditional(conition1, condition2) {
      return conition1 ? condition2 : true;
    },
    nextStep() {
      this.arrangeData();
      let isvlaid = this.$refs["step" + this.currentStepper].validate();

      if (isvlaid) {
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

    async submit() {
      try {
        let isvlaid = this.$refs["step" + this.currentStepper].validate();
        if (!isvlaid) return;
        const products = this.arrangeData();
        const data = await this.$axios.post("crm-orders", products);
        console.log("data", data);
        if (data.status) {
          this.form.invoice_number.$model = data.data.data;
          this.makeToast("success", "Your Order Successfully added");
          console.log(this.from);
          this.nextStep();
        } else this.makeToast("danger", "Something went wrong");
      } catch (error) {
        this.makeToast("danger", "Something went wrong");
      }
    },
    arrangeData() {
      const products = {};
      try {
        products["province"] = this.form.city;
        products["area"] = this.form.area;
        products["address"] = this.form.address;
        products["name"] = this.form.name;

        products["pcode"] = this.form.products.map((row) => row.product_code);
        products["qty"] = this.form.products.map((row) => row.product_quantity);
        products["prod_size"] = this.form.products.map(
          (row) => row.product_size
        );
        products["prod_color"] = this.form.products.map(
          (row) => row.product_color
        );
        products["prod_price"] = this.form.price_per_picture
          ? this.form.products.map((row) => row.product_price)
          : [];
        products["delay"] = this.form.delay;
        products["project"] = this.form.project;
        products["withtax"] = 0;
        products["buroaz"] = 0;
        products["ad_id"] = "ashraffrotan";
        // this.$auth.user.username;
        products["phone"] = this.form.number;
        products["price"] = parseFloat(this.$refs["step2"].totalPrice);
        products["status"] = this.form.delay_order == true ? 5 : 1;
        products["source"] = this.form.source;
        products["landing_link"] = this.form.landing_link;

        products["notes"] = this.form.note;
        products["delivery_fee"] = this.form.delivery_fee;
      } catch (error) {
        console.log(error);
      }
      return products;
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
      // this.formInsertion = false;
      // this.downloaded = true;
      // this.done = true;
      // this.currentStepper++;
      // e.target.style.display = "none";
      this.$refs.pdfDownload.downnloadPDF();
    },

    backHome() {
      this.currentStepper = 0;
      this.formInsertion = true;
      this.done = false;
      this.downloaded = false;
      this.form = JSON.parse(JSON.stringify(this.reset_form));
      this.resetValidations();
    },
    resetValidations() {
      this.$v.form.$reset();
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
        .then(async (value) => {
          if (value) {
            await this.$auth.logout();
            this.$router.push("/signin");
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },

    startForm() {
      // console.log('hey');
      this.startInsert = false;
      this.formInsertion = true;
      this.showActionBtn = true;
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
body {
  font-family: "Poppins", sans-serif;
}

#dropdown-right {
  position: absolute;
  right: 10px;
  top: 45%;
  transform: translateY(-50%);
  z-index: 20;
}

.invoice_page_hide {
  position: fixed !important;
  top: 2000px !important;
  z-index: 20;
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
  right: 80px;
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
