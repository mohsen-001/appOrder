<template>
  <div
    :class="`product_container ${
      ifInvalid ? 'invalid' : isActive == index ? 'active' : ''
    } `"
    @click="$emit('click')"
  >
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
      <span class="mt-2 d-block">{{ title ? title : "product" }}</span>
    </div>
    <div class="p40 m20 position-relative">
      <b-form-group id="input-group-1">
        <b-form-input
          pill
          class="mb-2 mt-2 text-center paddingin"
          id="input-1"
          type="number"
          placeholder="Qty"
          v-model="form.$model.products[index].product_quantity"
          :state="validateproducts('product_quantity')"
        >
        </b-form-input>
        <b-form-invalid-feedback> Qty *</b-form-invalid-feedback>
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
    <div class="p40 m20" v-show="form.price_per_picture.$model">
      <b-form-group id="input-group-1">
        <b-form-input
          pill
          id="input-1 "
          class="text-center"
          type="number"
          placeholder="Price"
          required
          v-model="form.$model.products[index].product_price"
          :state="validateproducts('product_price')"
        >
        </b-form-input>
        <b-form-invalid-feedback>Price *</b-form-invalid-feedback>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "showPrice",
    "form",
    "is_touched",
    "index",
    "title",
    "invalidIndexs",
    "isActive",
  ],
  data() {
    return {
      productValue: {
        quantity: "",
        price: "",
      },
    };
  },
  computed: {
    ifInvalid() {
      let exist = this.invalidIndexs.find((value) => value == this.index);

      return exist ? true : false;
    },
  },
  methods: {
    validateproducts(name) {
      if (!this.form.products.$each[this.index]) return null;
      const { $dirty, $error } = this.form.products.$each[this.index][name];
      return $dirty ? !$error : null;
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
.invalid {
  border: 1px solid #ee303054;
}
.active {
  border: 1px solid rgba(0, 123, 255, 0.47059);
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

.was-validated .form-control:invalid,
.form-control.is-invalid {
  background-image: unset !important;
}
.was-validated .form-control:valid,
.form-control.is-valid {
  background-image: unset !important;
}
</style>
