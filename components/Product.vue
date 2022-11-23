<template>
  <div class="product_container">
    <div>
      <div class="product_img">
        <img
          src="https://img.freepik.com/premium-psd/cosmetic-product-packaging-mockup_1150-40282.jpg?w=2000"
          alt=""
        />
        <div
          @click="$emit('rmBtn')"
          class="position-absolute d-flex justify-content-center align-items-center"
        >
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <span class="mt-2 d-block">Flora Dress</span>
    </div>
    <div class="p40 m20 position-relative">
      <b-form-group id="input-group-1">
        <b-form-input
          pill
          class="mb-2 mt-2 text-center paddingin"
          id="input-1"
          type="text"
          placeholder="Qty"
          v-model="form.$model.products[index].product_quantity"
          :state="validateproducts('product_quantity')"
        >
        </b-form-input>
        <b-form-invalid-feedback
          >Product Color Is Required</b-form-invalid-feedback
        >
      </b-form-group>
      <b-button
        @click="minsBtn"
        pill
        variant="primary"
        class="incBtn left-0 d-flex position-absolute ml-1"
      >
        <span>-</span></b-button
      >
      <b-button
        @click="addBtn"
        pill
        variant="primary"
        class="incBtn right-0 d-flex position-absolute mr-1"
      >
        <span>+</span></b-button
      >
    </div>
    <div class="p40 m20" v-show="showPrice">
      <b-form-group id="input-group-1">
        <b-form-input
          pill
          id="input-1 "
          class="text-center"
          type="text"
          placeholder="Price"
          required
          v-model="form.$model.products[index].product_price"
          :state="validateproducts('product_price')"
        >
        </b-form-input>
        <b-form-invalid-feedback
          >Product Color Is Required</b-form-invalid-feedback
        >
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showPrice", "form", "is_touched", "index"],
  data() {
    return {
      productValue: {
        quantity: "",
        price: "",
      },
    };
  },
  methods: {
    validateproducts(name) {
      const data = this.form.$model.products[this.index][name];
      console.log(this.form.products);
      return !this.is_touched ? null : data ? true : false;
    },
    addBtn() {
      this.form.$model.products[this.index].product_quantity++;
    },
    minsBtn() {
      // this.productValue.quantity = 0;
      if (this.form.$model.products[this.index].product_quantity > 0) {
        this.form.$model.products[this.index].product_quantity--;
      }
    },
  },
};
</script>

<style scoped>
.incBtn {
  width: 30px;
  height: 30px;
  font-size: 1.3rem;
  font-weight: bold;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  padding: 0 !important;
  top: 50%;
  transform: translateY(-50%);
  background-color: #007bff25;
  border: #007bff78;
}

.left-0 {
  left: 0;
}

.right-0 {
  right: 0;
}

.incBtn span {
  margin-bottom: 5px;
  color: #007bff;
}

.incBtn:active span {
  color: white;
}

.product_container {
  width: 150px;
  border-radius: 15px;
  border: 1px solid #70707054;
  padding: 10px;
  display: inline-block;
  margin-bottom: 10px;
  /* margin: 0 5px; */
}

.product_img {
  width: 100%;
  height: 80px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.product_img > div {
  top: 8px;
  right: 10px;
  width: 20px;
  height: 20px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  cursor: pointer;
}

.product_img img {
  width: 100%;
}

input {
  border-radius: 50px;
  background-color: #f5f5f5;
  border-color: #f5f5f5;
}

.paddingin {
  padding: 0 35px;
}
</style>
