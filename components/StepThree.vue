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

    <div class="p40 m20">
      <b-form-checkbox switch size="lg" v-model="form.price_per_picture.$model"
        >Price Per Picture</b-form-checkbox
      >
    </div>

    <div class="m20 product_holder d-flex justify-content-start">
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
          <b-form-input
            id="input-5"
            type="date"
            placeholder="Choose"
            required
            :state="validateState('delay')"
            v-model="form.delay.$model"
            @blur="form.delay.$touch"
          >
          </b-form-input>
          <b-form-invalid-feedback
            >Delay Date Is Required</b-form-invalid-feedback
          >
        </b-form-group>
      </div>
    </Transition>

    <div class="p40 m20">
      <b-form-group id="input-group-6" label="Order Note" label-for="textarea">
        <b-form-textarea
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
          return this.pcodes.includes(val);
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
    };
  },
  created() {
    this.getProducts();
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
  methods: {
    async getProducts() {
      try {
        // https://api.teebalhoor.net/public/api/projects
        // const url = `https://api.teebalhoor.net/public/products`;
        const { data } = await this.$axios.get("/crm/get-products");

        this.products = data;
        this.pcodes = this.products.map((row) => row.pcode);
        this.$emit("setPcodes", this.pcodes);
      } catch (error) {
        console.log("error get producs", error);
      }
    },
    validateproduct(name) {
      let { $dirty, $error } = this.$v.productFrom[name];

      return $dirty ? !$error : null;
    },
    validateState(name) {
      const { $dirty, $error } = this.form[name];
      return $dirty ? !$error : null;
    },
    resetProductForm() {
      this.productFrom = this.emptyProductForm;

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
      let elemW = elem.scrollWidth;
      elem.scrollTo(elemW, 0);
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
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-form,
.v-leave-to {
  opacity: 0;
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
