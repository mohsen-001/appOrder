<template>
  <div>
    <div class="p40 m20">
      <b-form-group id="input-group-12" label="Add Product" label-for="input-1">
        <div class="d-flex">
          <span style="width: 100%">
            <!-- ,, -->
            <b-form-select
              id="input-1"
              v-model="form.$model.products[activeIndex].product_code"
              type="text"
              placeholder="Product name"
              required
              :state="validateproducts('product_code')"
              class="mb-3"
            >
              <!-- value-field="pcode"
              text-field="pcode" -->
              <!-- :options="products" -->
              <template #first>
                <b-form-select-option :value="null" disabled>
                  Choose Product
                </b-form-select-option>
                <option
                  v-for="(option, index) in products"
                  :key="index"
                  :value="option.pcode"
                >
                  <div
                    style="display: flex; justify-content: between; width: 100%"
                  >
                    <span> {{ option.pcode }} </span>
                    <span>({{ option.name }}) </span>
                  </div>
                </option>
              </template>
            </b-form-select>
            <b-form-invalid-feedback
              >Product Is Required
            </b-form-invalid-feedback>
          </span>
          <b-button
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
          v-model="form.$model.products[activeIndex].product_size"
          type="text"
          placeholder="Size"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Color" label-for="input-1">
        <b-form-input
          class="ml-2"
          id="input-1"
          v-model="form.$model.products[activeIndex].product_color"
          type="text"
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
export default {
  name: "StepOne",
  props: {
    form: Object,
  },
  data() {
    return {
      checked: false,

      checked: false,
      isDelay: false,
      showPrice: false,
      activeIndex: 0,
      invalidIndexs: [],
      products: [],
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
      } catch (error) {
        console.log("error get producs", error);
      }
    },
    validateproducts(name) {
      const { $dirty, $error } =
        this.form.products.$each[this.activeIndex][name];

      return $dirty ? !$error : null;
    },
    validateState(name) {
      const { $dirty, $error } = this.form[name];
      return $dirty ? !$error : null;
    },
    product() {
      console.log(this.form.$model.products, this.form.$model.products.length);
      this.form.products.$model.push({
        id: this.generateID(),
        product_code: null,
        product_quantity: 1,
        product_size: null,
        product_color: null,
        product_price: null,
      });
      this.activeIndex = this.form.$model.products.length - 1;
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
      if (!this.checkValidation()) return;

      await callback();
      let elem = document.querySelector(".product_holder");
      let elemW = elem.scrollWidth;
      elem.scrollTo(elemW, 0);
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
      let result =
        isValid &&
        !this.form.note.$invalid &&
        !this.form.delay.$invalid &&
        !this.form.price.$invalid;
      if (!result) this.makeToast("danger", "Please Fill all Feilds!");
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
    onActiveProduct(index) {
      this.activeIndex = index;
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
