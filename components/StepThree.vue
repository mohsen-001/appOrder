<template>
  <div>
    <div class="p40 m20">
      <b-form-group id="input-group-12" label="Add Product" label-for="input-1">
        <div class="d-flex">
          <span style="width: 100%">
            <!-- ,, -->
            <!-- <b-form-select
              id="input-1"
              v-model="form.$model.products[activeIndex].product_code"
              type="text"
              placeholder="Product name"
              required
              :state="validateproduct('product_code')"
              class="mb-3"
            >

              <template #first>
                <b-form-select-option :value="null" disabled>
                  Choose Product
                </b-form-select-option>

              </template>
            </b-form-select> -->

            <b-form-input
              list="input-222"
              v-model="$v.productFrom.pcode.$model"
              type="text"
              placeholder="Product name"
              required
              :state="validateproduct('pcode')"
              class="mb-3"
              lazy-formatter
              :formatter="
                formatter($v.productFrom.pcode.$model, 'product_code')
              "
              debounce="500"
              :readonly="activeIndex ? true : false"
            ></b-form-input>

            <b-form-datalist
              id="input-222"
              :options="products"
              value-field="pcode"
              text-field="name"
            >
            </b-form-datalist>
            <b-form-invalid-feedback>Invalid Product </b-form-invalid-feedback>
          </span>
          <b-button
            v-show="!activeIndex"
            @click="addProduct(product)"
            pill
            style="background: #115598"
            class="add_btn ml-2"
            ><span>+</span></b-button
          >
        </div>
      </b-form-group>
    </div>
    <div class="p40 m20 d-flex">
      <b-form-group id="input-group-13" label="Size" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="$v.productFrom.size.$model"
          lazy-formatter
          :formatter="formatter($v.productFrom.size.$model, 'product_size')"
          type="text"
          placeholder="Size"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Color" label-for="input-1">
        <b-form-input
          class="ml-2"
          id="input-1"
          v-model="$v.productFrom.color.$model"
          type="text"
          lazy-formatter
          :formatter="formatter($v.productFrom.color.$model, 'product_color')"
          placeholder="Color"
          required
        >
        </b-form-input>
      </b-form-group>
    </div>

    <div class="p40 m20 d-flex justify-content-between">
      <b-form-checkbox switch size="lg" v-model="form.price_per_picture.$model"
        >Price Per Picture</b-form-checkbox
      >

      <div class="product_arrow">
        <span class="flag-icon flag-icon-gr"></span>
        <svg
          :style="{ opacity: opacityL }"
          @click="scrollLeft"
          class="scroll-left mr-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            id="arrow-left"
            d="M-2976-1071h-.036a1.493,1.493,0,0,1-.627-.154h0l-.028-.014h-.007l-.023-.012-.015-.009-.014-.008-.021-.013h-.008l-.025-.016h0l-.028-.019h0a1.5,1.5,0,0,1-.128-.1h0l-.02-.017-.009-.008-.017-.016-.011-.01-.017-.016-.011-.01-.008-.008-10.5-10.5a1.5,1.5,0,0,1,0-2.121,1.5,1.5,0,0,1,2.121,0l7.94,7.94V-1093.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5v17.378l7.94-7.939a1.5,1.5,0,0,1,2.12,0,1.5,1.5,0,0,1,0,2.121l-10.5,10.5a1.506,1.506,0,0,1-.409.291h0l-.025.011-.017.008-.013.006-.027.011h0a1.493,1.493,0,0,1-.491.108H-2976Z"
            transform="translate(-1071 2987.992) rotate(90)"
            fill="#115598"
          />
        </svg>

        <svg
          :style="{ opacity: opacityR }"
          @click="scrollRight"
          class="scroll right"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            id="arrow-right"
            d="M-2976-1071h-.036a1.493,1.493,0,0,1-.627-.154h0l-.028-.014h-.007l-.023-.012-.015-.009-.014-.008-.021-.013h-.008l-.025-.016h0l-.028-.019h0a1.5,1.5,0,0,1-.128-.1h0l-.02-.017-.009-.008-.017-.016-.011-.01-.017-.016-.011-.01-.008-.008-10.5-10.5a1.5,1.5,0,0,1,0-2.121,1.5,1.5,0,0,1,2.121,0l7.94,7.94V-1093.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5v17.378l7.94-7.939a1.5,1.5,0,0,1,2.12,0,1.5,1.5,0,0,1,0,2.121l-10.5,10.5a1.506,1.506,0,0,1-.409.291h0l-.025.011-.017.008-.013.006-.027.011h0a1.493,1.493,0,0,1-.491.108H-2976Z"
            transform="translate(1095 -2963.993) rotate(-90)"
            fill="#115598"
          />
        </svg>
      </div>
    </div>

    <div
      class="m20 product_holder d-flex justify-content-start"
      @scroll="touchScroll"
    >
      <div class="wrapper">
        <Product
          @click="onActiveProduct(index)"
          :showPrice="showPrice"
          :form="form"
          class="mr-2"
          :index="index"
          v-for="(item, index) in form.products.$each.$iter"
          :title="form.$model.products[index].product_code"
          :key="index"
          @rmBtn="removeProduct(item, index)"
          :invalidIndexs.sync="invalidIndexs"
          :isActive.sync="activeIndex"
        />
      </div>
    </div>

    <div class="p40 m20">
      <b-form-group
        id="input-group-4"
        label="Total Selling Price"
        label-for="input-4"
        v-show="!form.price_per_picture.$model"
      >
        <b-form-input
          id="input-4"
          type="number"
          placeholder="price"
          :state="validateState('price')"
          v-model="form.price.$model"
          required
          @blur="form.price.$touch"
        >
        </b-form-input>
        <b-form-invalid-feedback>Invalid Total Price </b-form-invalid-feedback>
      </b-form-group>
    </div>
    <div class="p40 m20">
      <b-form-group id="input-group-5" label="Delivery Fee" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.delivery_fee.$model"
          type="number"
          placeholder="Fee"
          required
        >
        </b-form-input>
      </b-form-group>
    </div>
    <div class="p40 m20">
      <div
        class="total_holder d-flex justify-content-between align-items-center"
      >
        <span class="total_text">Total Price</span>
        <span class="total_price">{{ totalPrice }} AED</span>
      </div>
    </div>
    <div class="p40 m20">
      <b-form-checkbox v-model="form.delay_order.$model" switch size="lg"
        >Delay Order</b-form-checkbox
      >
    </div>

    <Transition>
      <div class="p40 m20 if_input" v-show="form.delay_order.$model">
        <b-form-group id="input-group-5" label="Date" label-for="input-5">
          <!-- <b-form-input id="input-5" type="date" placeholder="Choose" required>
          </b-form-input> -->
          <b-form-datepicker
            style="padding-right: unset !important"
            size="lg"
            class="date-picker"
            id="datepicker-dateformat2"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="en"
            :state="validateState('delay')"
            v-model="form.delay.$model"
            @blur="form.delay.$touch"
            :min="new Date()"
          ></b-form-datepicker>
          <b-form-invalid-feedback
            >Delay Date Is Required</b-form-invalid-feedback
          >
        </b-form-group>
      </div>
    </Transition>

    <div class="p40 m20">
      <b-form-group id="input-group-6" label="Order Note" label-for="textarea">
        <b-form-textarea
          @onkeydown="getDeletedChar(event, this)"
          @keyup.delete="getDeletedChar"
          id="textarea"
          placeholder="Order note"
          rows="5"
          max-rows="6"
          :state="validateState('note')"
          v-model="form.note.$model"
          @blur="form.note.$touch"
        >
        </b-form-textarea>
        <b-form-invalid-feedback
          >Note Must Be 2 Character</b-form-invalid-feedback
        >
      </b-form-group>
    </div>
  </div>
</template>
<script>
import { required, validator } from "vuelidate/lib/validators";
export default {
  name: "StepOne",
  props: {
    form: Object,
  },
  validations: {
    productFrom: {
      pcode: {
        required,
        validator: function (val) {
          let existPcodes = this.form.$model.products.map(
            (row) => row?.product_code
          );
          return this.pcodes.includes(val) && !existPcodes.includes(val);
        },
      },
      color: {},
      size: {},
    },
  },
  data() {
    return {
      checked: false,
      pcodes: [],
      checked: false,
      isDelay: false,
      showPrice: false,
      activeIndex: null,
      invalidIndexs: [],
      products: [],
      productFrom: {
        pcode: null,
        color: null,
        size: null,
      },
      emptyProductForm: {
        pcode: null,
        color: null,
        size: null,
      },
      opacityL: 0.2,
      opacityR: 1,
      width: 0,
      productNames: [],
    };
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.width = window.innerWidth;
    let arrow = document.querySelector(".product_arrow");
    arrow.style.display = "none";
  },
  computed: {
    totalPrice() {
      let exist = this.form.price_per_picture.$model;
      let price = 0;
      if (exist)
        for (let key in this.form.$model.products) {
          price =
            price +
            parseFloat(
              this.form.$model.products[key].product_price
                ? this.form.$model.products[key].product_price
                : 0
            ) *
              parseFloat(this.form.$model.products[key].product_quantity);
        }
      else
        price =
          price +
          parseFloat(this.form.price.$model ? this.form.price.$model : 0);
      price =
        price +
        parseFloat(
          this.form.delivery_fee.$model ? this.form.delivery_fee.$model : 0
        );
      // this.from.total_price.$model = price;
      return price;
      //  return exist ? true : false;
    },
  },

  watch: {
    "form.project.$model": function (item) {
      console.log(this.form.selected_company.$model);
      if (this.form.selected_company.$model != null) {
        this.getProducts({
          country: this.form.country.$model,
          company: this.form.$model.selected_company?.id,
          companyName: this.form.$model.selected_company?.name,
        });
      }
    },
    "form.products.$model": function (item) {
      if (this.products.length > 0) {
        let productsCodes = this.form.$model.products.map(
          (product) => product?.product_code
        );
        let products = this.products?.filter((row) =>
          productsCodes.includes(row?.pcode)
        );
        products = products.map((row) => row?.name);
        let diff = this.getDifference(products, this.productNames);
        let note = this.form.$model.note;
        if (note == null || note === "") {
          this.form.$model.note = products.toString();
        } else {
          if (diff.length == 0) {
            diff = this.getDifference(this.productNames, products);

            note = note.split(",");
            note = note.filter((row) => !diff.includes(row));
            note = note.map((row) => row.replace(diff[0], ""));
            this.form.$model.note = note.toString();
          } else {
            this.form.$model.note =
              this.form.$model.note + diff.toString() + ",";
          }
        }

        this.productNames = products;
      }
    },
  },
  methods: {
    getDifference(a, b) {
      return a.filter((element) => {
        return !b.includes(element);
      });
    },
    resizeHandler() {
      this.width = window.innerWidth;
      let elem = document.querySelector(".product_holder");
      let elemArr = document.querySelector(".product_arrow");
      let elemW = elem.scrollWidth;
      let elemC = elem.clientWidth;
      // console.log(this.width);
      if (elemC >= elemW) {
        elemArr.style.display = "none";
      } else {
        elemArr.style.display = "block";
      }
    },
    scrollRight() {
      let elem = document.querySelector(".product_holder");
      let elemW = elem.scrollWidth;
      let scrollBottom = elemW - elem.scrollLeft - elem.clientWidth;
      elem.scrollLeft += 180;
      this.opacityL = 1;
      if (scrollBottom <= 180) {
        this.opacityR = 0.2;
        return;
      }
    },

    scrollLeft() {
      let elem = document.querySelector(".product_holder");
      let elemW = elem.scrollWidth;
      let scrollBottom = elemW - elem.scrollLeft - elem.clientWidth;
      elem.scrollLeft -= 180;
      this.opacityR = 1;
      if (elem.scrollLeft <= 180) {
        this.opacityL = 0.2;
        return;
      }
    },

    touchScroll() {
      let elem = document.querySelector(".product_holder");
      let elemW = elem.scrollWidth;
      let scrollBottom = elemW - elem.scrollLeft - elem.clientWidth;

      this.opacityL = 1;
      this.opacityR = 1;

      if (scrollBottom <= 0) {
        this.opacityR = 0.2;
      } else if (elem.scrollLeft <= 0) {
        this.opacityL = 0.2;
      }
    },

    async getProducts(body) {
      try {
        // const { data } = await this.$axios.get("/crm/get-products");
        const { data } = await this.$axios.post(
          "orders/get-company-products",
          body
        );

        this.products = data;
        this.pcodes = this.products.map((row) => row.pcode);
        this.$emit("setPcodes", this.pcodes);
      } catch (error) {
        console.log("error get producs", error);
      }
    },
    validateproduct(name) {
      let { $dirty, $error } = this.$v.productFrom[name];
      //       let exist = this.invalidIndexs.filter(
      //               (index) => index != key
      //             );
      // if()
      return $dirty ? !$error : null;
    },
    validateState(name) {
      const { $dirty, $error } = this.form[name];
      return $dirty ? !$error : null;
    },
    resetProductForm() {
      this.productFrom = { color: null, pcode: null, size: null };

      this.activeIndex = null;
      this.$v.productFrom.$reset();
    },
    product() {
      this.form.products.$model.push({
        id: this.generateID(),
        product_code: this.productFrom.pcode,
        product_quantity: 1,
        product_size: this.productFrom.size,
        product_color: this.productFrom.color,
        product_price: null,
      });
      this.resetProductForm();
    },
    generateID() {
      return (
        "Id" +
        Math.floor(
          (Date.now() *
            Math.floor(
              Math.random() * Math.floor(Math.random() * Date.now())
            )) /
            (Math.random() * 1000000000)
        )
      );
    },
    async addProduct(callback) {
      if (this.checkInvalidProductForm()) return;

      await callback();
      let elem = document.querySelector(".product_holder");
      let elemArr = document.querySelector(".product_arrow");
      let elemW = elem.scrollWidth;
      let elemC = elem.clientWidth;
      elem.scrollTo(elemW, 0);
      this.width = window.innerWidth;

      // console.log(this.width);
      if (elemC >= elemW) {
        elemArr.style.display = "none";
      } else {
        elemArr.style.display = "block";
      }
    },

    checkInvalidProductForm() {
      this.$v.productFrom.$touch();
      const form = this.form.$model.products.map((row) => row.product_code);
      const exist = form.includes(this.productFrom.pcode);
      if (exist) this.makeToast("warning", "Product Already Exists!");
      return exist ? true : this.$v.productFrom.$invalid;
    },
    checkValidation() {
      this.form.products.$touch();
      const form = this.form.products.$each.$iter;

      for (var key in form) {
        const { $invalid, $error } = this.form.products.$each[key];
        let exist = this.invalidIndexs.find((index) => index == key);
        if ($invalid) {
          if (!exist) this.invalidIndexs.push(key);
        } else {
          if (exist)
            this.invalidIndexs = this.invalidIndexs.filter(
              (index) => index != key
            );
        }
      }

      return this.invalidIndexs.length > 0 ? false : true;
    },
    validate() {
      this.checkValidation();
      let isValid = !this.form.products.$invalid;
      this.form.$touch();
      if (this.form.$model.products.length < 1) {
        this.makeToast("danger", "Please Add At Least One Product!");
        return false;
      }
      let result =
        isValid &&
        !this.form.note.$invalid &&
        !this.form.delay.$invalid &&
        !this.form.price.$invalid;

      return result;
    },
    removeProduct(item, key) {
      if (this.activeIndex == key) this.activeIndex = 0;
      if (this.form.$model.products.length > 1) {
        this.form.$model.products = this.form.$model.products.filter(
          (row) => row.id != item.$model.id
        );

        if (this.isInValid(key))
          this.invalidIndexs = this.invalidIndexs.filter(
            (index) => index != key
          );
      }
    },
    isInValid(key) {
      let exist = this.invalidIndexs.find((index) => index == key);
      return exist ? true : false;
    },
    async onActiveProduct(index) {
      if (this.activeIndex == index) {
        await this.resetProductForm();
        return;
      }
      this.productFrom = {
        pcode: this.form.$model.products[index].product_code,
        color: this.form.$model.products[index].product_color,
        size: this.form.$model.products[index].product_size,
      };
      this.activeIndex = index;
      return;
    },
    formatter(value, column) {
      if (this.activeIndex)
        this.form.$model.products[this.activeIndex][column] = value;
      return (value) => {
        return value;
      };
    },
    makeToast(variant = null, message = "sss") {
      this.$bvToast.toast(message, {
        variant: variant,
        solid: true,
        noCloseButton: true,
        autoHideDelay: "1000",
      });
    },
    getDeletedChar(e) {},
  },
};
</script>

<style scoped>
.btn {
  padding: unset !important;
}

.date-picker {
  width: 100%;
  height: 50px;
  border-radius: 50px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-form,
.v-leave-to {
  opacity: 0;
}

.product_arrow svg {
  width: 15px;
}

/* .custm .add_btn {
    margin-left: 10px;
} */

.p40 {
  padding: 0 40px;
}

.m20 {
  margin-top: 20px;
}

.product_holder {
  overflow: scroll;
  padding-left: 40px;
  scroll-behavior: smooth;
}

.product_holder .wrapper {
  /* width: 450px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.product_holder::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.product_holder {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.total_holder {
  padding: 15px 20px;
  background-color: #115598;
  color: white;
  border-radius: 10px;
}

.total_text {
  opacity: 0.5;
}

.total_price {
  font-weight: 700;
  font-size: 1.4rem;
}

.if_input {
  border: 1px solid rgba(0, 0, 0, 0.204);
  margin: 20px 40px;
  border-radius: 20px;
  padding: 10px 20px;
}
</style>
