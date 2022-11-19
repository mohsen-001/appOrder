<template>
    <div class="w-100" style="height: 100%;">
        <div class="step_four_container d-flex justify-content-center align-items-center position-relative">
        <div class="invoice_holder">
            <div class="invoice_img">
                <img src="../static/invoice-step.svg" alt="invoice">
            </div>
            <div class="text-center mt-4 invoice_text">
                <span>Invoice is Ready!</span><br />
                <span>Please download the invoice <br /> and send to the customer.</span>
            </div>
        </div>

        <div class="show_arrow">
            <img src="../static/arrow.svg" alt="invoice">
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: "StepOne",
    data() {
        return {}
    },
}
</script>

<style scoped>
.step_four_container {
    width: 100%;
    height: 100%;
}

.invoice_img img {
    width: 200px;
}

.invoice_text span:first-child {
    font-weight: 700;
    font-size: 1.1rem;
    color: #115598;
}

.invoice_text span:last-child {
    opacity: 0.5;
}

.show_arrow{
    position: absolute;
    bottom: 75px;
    animation-duration: .5s;
    animation-name: arrow;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
.show_arrow img {
    width: 20px;
}

@keyframes arrow {
    0% {
    bottom: 75px;
  }

  50% {
    bottom: 60px;
  }

  100% {
    bottom: 75px;
  }
}
</style>