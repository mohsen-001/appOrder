<template>
  <div>
    <div class="p40 m20">
      <b-form-group id="input-group-12" label="Add Product" label-for="input-1">
        <div class="d-flex">
          <span style="width: 100%">
            <b-form-input
              id="input-1"
              v-model="form.$model.products[0].product_code"
              type="text"
              placeholder="Product name"
              required
              :state="validateproducts('product_code')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              >Product Is Required
            </b-form-invalid-feedback>
          </span>
          <b-button
            @click="addProduct(product)"
            pill
            variant="primary"
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
          v-model="form.$model.products[0].product_size"
          type="text"
          placeholder="Size"
          :state="validateproducts('product_size')"
        >
        </b-form-input>
        <b-form-invalid-feedback
          >Product Size Is Required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-1" label="Color" label-for="input-1">
        <b-form-input
          class="ml-2"
          id="input-1"
          v-model="form.$model.products[0].product_color"
          type="text"
          placeholder="Link"
          :state="validateproducts('product_color')"
          required
        >
        </b-form-input>
        <b-form-invalid-feedback
          >Product Color Is Required</b-form-invalid-feedback
        >
      </b-form-group>
    </div>

    <div class="p40 m20">
      <b-form-checkbox v-model="showPrice" switch size="lg"
        >Price Per Picture</b-form-checkbox
      >
    </div>

    <div class="m20 product_holder d-flex justify-content-start">
      <div class="wrapper">
        <Product
          :showPrice="showPrice"
          :form="form"
          :is_touched="is_touched"
          class="mr-2"
          :index="index"
          v-for="(item, index) in form.products.$each.$iter"
          :key="index"
          @rmBtn="removeProduct(item)"
        />
      </div>
    </div>

    <div class="p40 m20">
      <b-form-group
        id="input-group-4"
        label="Total Selling Price"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="stepThreeform.link"
          type="text"
          placeholder="Total"
          required
        >
        </b-form-input>
      </b-form-group>
    </div>
    <div class="p40 m20">
      <b-form-group id="input-group-5" label="Delivery Fee" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="stepThreeform.link"
          type="text"
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
        <span class="total_price">255 AED</span>
      </div>
    </div>
    <div class="p40 m20">
      <b-form-checkbox v-model="isDelay" switch size="lg"
        >Delay Order</b-form-checkbox
      >
    </div>

    <Transition>
      <div class="p40 m20 if_input" v-show="isDelay">
        <b-form-group id="input-group-5" label="Date" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="stepThreeform.link"
            type="date"
            placeholder="Choose"
            required
          >
          </b-form-input>
        </b-form-group>
      </div>
    </Transition>

    <div class="p40 m20">
      <b-form-group id="input-group-6" label="Order Note" label-for="textarea">
        <b-form-textarea
          id="textarea"
          v-model="stepThreeform.address"
          placeholder="Order note"
          rows="5"
          max-rows="6"
        >
        </b-form-textarea>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepOne",
  props: {
    form: Object,
  },
  data() {
    return {
      checked: false,
      stepThreeform: {
        products: [],
      },
      checked: false,
      isDelay: false,
      showPrice: false,
      is_touched: false,
    };
  },
  methods: {
    validateproducts(name) {
      const { $dirty, $erorr } = this.form.products.$each[0][name];
      console.log($dirty, $erorr, this.form.products.$each[0][name]);
      return $dirty ? !$erorr : null;
    },
    validateState(name) {
      const { $dirty, $erorr } = this.form[name];
      return $dirty ? !$erorr : null;
    },
    product() {
      this.form.products.$model.push({
        id: this.generateID(),
        category: "",
        label_name: "",
        color: "#FF0000FF",
        title: "",
        tab: [],
        status: "",
      });
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
      await callback();
      let elem = document.querySelector(".product_holder");
      let elemW = elem.scrollWidth;
      elem.scrollTo(elemW, 0);
    },
    validate() {
      this.is_touched = true;
      this.form.products.$touch();

      let isValid = !this.form.products.$invalid;
      return isValid;
    },
    removeProduct(item) {
      if (this.form.$model.products.length > 1) {
        this.form.$model.products = this.form.$model.products.filter(
          (row) => row.id != item.$model.id
        );
      }
    },
  },
};
</script>

<style scoped>
/* #input-1 {
} */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
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
