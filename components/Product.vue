<template>

    <div class="product_container">
        <div>
            <div class="product_img">
                <img src="https://img.freepik.com/premium-psd/cosmetic-product-packaging-mockup_1150-40282.jpg?w=2000"
                    alt="">
            </div>
            <span class="mt-2 d-block">Flora Dress</span>
        </div>
        <div class="p40 m20 position-relative">
            <b-form-input v-model="productValue.quantity" pill class="mb-2 mt-2 text-center paddingin" id="input-1" 
                type="text" placeholder="Qty" required>
            </b-form-input>

            <b-button @click="minsBtn" pill variant="primary" class="incBtn left-0 d-flex position-absolute ml-1">
                <span>-</span></b-button>
            <b-button @click="addBtn" pill variant="primary" class="incBtn right-0 d-flex position-absolute mr-1">
                <span>+</span></b-button>

        </div>
        <div class="p40 m20">
            <b-form-input v-model="productValue.price" pill id="input-1 " class="text-center" type="text"
                placeholder="Price" required>
            </b-form-input>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            productValue: {
                quantity: "",
                price: '',
            }
        }
    },
    methods: {
        addBtn() {
            // this.productValue.quantity = 0;
            this.productValue.quantity++;
        },
        minsBtn() {
            // this.productValue.quantity = 0;
            if (this.productValue.quantity > 0) {
                this.productValue.quantity--;
            }
        }
    },
    
}
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
}

.product_img img {
    width: 100%;
}

input {
    border-radius: 50px;
    background-color: #F5F5F5;
    border-color: #F5F5F5;
}

.paddingin {
    padding: 0 35px;
}
</style>