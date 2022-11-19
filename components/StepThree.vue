<template>
    <div>
        <div class="p40 m20">
            <b-form-group id="input-group-1" label="Add Product" label-for="input-1">
                <div class="d-flex">
                    <b-form-input id="input-1" v-model="stepThreeform.productName" type="text"
                        placeholder="Product name" required>
                    </b-form-input>
                    <b-button @click="addProduct" pill variant="primary" class="add_btn ml-2"><span>+</span></b-button>
                </div>
            </b-form-group>
        </div>
        <div class="p40 m20 d-flex">
            <b-form-group id="input-group-2" label="Size" label-for="input-2">

                <b-form-input id="input-2" v-model="stepThreeform.size" type="text" placeholder="Size" required>
                </b-form-input>

            </b-form-group>

            <b-form-group id="input-group-3" label="color" label-for="input-3" class="ml-2">

                <b-form-input id="input-3" v-model="stepThreeform.color" type="text" placeholder="Color" required>
                </b-form-input>

            </b-form-group>
        </div>
        <div class="p40 m20 ">
            <b-form-checkbox v-model="checked" switch size="lg">Price Per Picture</b-form-checkbox>
        </div>

        <div class="m20 product_holder d-flex justify-content-start">
            <div class="wrapper">
                <Product class="mr-2" v-for="(item, index) in stepThreeform.products" :key="index" />
            </div>
        </div>

        <div class="p40 m20">
            <b-form-group id="input-group-4" label="Total Selling Price" label-for="input-4">
                <b-form-input id="input-4" v-model="stepThreeform.link" type="text" placeholder="Total" required>
                </b-form-input>
            </b-form-group>
        </div>
        <div class="p40 m20">
            <b-form-group id="input-group-5" label="Delivery Fee" label-for="input-5">
                <b-form-input id="input-5" v-model="stepThreeform.link" type="text" placeholder="Fee" required>
                </b-form-input>
            </b-form-group>
        </div>
        <div class="p40 m20">
            <div class="total_holder d-flex justify-content-between align-items-center">
                <span class="total_text">Total Price</span>
                <span class="total_price">255 AED</span>
            </div>
        </div>
        <div class="p40 m20 ">
            <b-form-checkbox v-model="isDelay" switch size="lg">Delay Order</b-form-checkbox>
        </div>

        <Transition>
            <div class="p40 m20 if_input" v-show="isDelay">
                <b-form-group id="input-group-5" label="Date" label-for="input-5">
                    <b-form-input id="input-5" v-model="stepThreeform.link" type="date" placeholder="Choose" required>
                    </b-form-input>
                </b-form-group>
            </div>
        </Transition>

        <div class="p40 m20">
            <b-form-group id="input-group-6" label="Order Note" label-for="textarea">
                <b-form-textarea id="textarea" v-model="stepThreeform.address" placeholder="Order note" rows="5"
                    max-rows="6">
                </b-form-textarea>
            </b-form-group>
        </div>

    </div>
</template>

<script>
export default {
    name: "StepOne",
    data() {
        return {
            checked: false,
            stepThreeform: {
                products: [],
            },
            checked: false,
            isDelay: false,

        }
    },
    methods: {
        addProduct() {
            this.stepThreeform.products.push({});
        }
    }

}
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


.custm .add_btn {
    margin-left: 10px;
}

.p40 {
    padding: 0 40px;
}

.m20 {
    margin-top: 20px;
}

.product_holder {
    overflow: scroll;
    padding-left: 40px;
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
    opacity: .5;
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