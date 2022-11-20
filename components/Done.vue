<template>
  <div class="fullHeight">
    <div class="w-100" style="height: 100%">
      <div
        class="step_four_container d-flex justify-content-center align-items-center"
      >
        <div class="invoice_holder">
          <div class="invoice_img">
            <lottie-vue-player
              :src="`/data.json`"
              :player-controls="false"
              autoplay
              loop
              style="width: 250px"
            >
            </lottie-vue-player>
          </div>
          <div class="text-center mt-4 invoice_text">
            <span>Done!</span><br />
            <span
              >The request has been <br />
              successfully completed.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Done-animation",
  data(){
    return {
        options: {

        }
    }
  }
};
</script>

<style scoped>
.fullHeight {
  height: 100%;
}

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
</style>
