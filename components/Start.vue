<template>
  <div class="fullHeight">
    <div class="w-100" style="height: 100%">
      <div class="step_four_container d-flex justify-content-center align-items-center position-relative">
        <div class="startup_holder">
          <div class="text-center mt-4 startup_text">
            <h2>Create New <br /> <span class="wtsp">WhatsApp</span> Order</h2>
            <span>Please make sure the order<br /> correctly inserted.</span>
          </div>

          <div class="anim_btn position-absolute">
            <b-button @click="$emit('startInsertion')" v-show="showBtn" variant="primary">Start</b-button>
          </div>

          <div class="startup_img ml-2">
            <lottie-vue-player v-show="animateSence" :src="`/start-animation/start-animation-first.json`"
              :player-controls="false" autoplay style="width: 250px">
            </lottie-vue-player>

            <lottie-player v-show="!animateSence" ref="lottieContainer" loop
              src="/start-animation/start-animation-second.json" style="width: 250px;">
            </lottie-player>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Done-animation",
  data() {
    return {
      animateSence: true,
      showBtn: false, 
    }
  },
  mounted() {
    setTimeout(() => {
      this.animateSence = false;
      this.$refs.lottieContainer.play()
    }, 2500)

    setTimeout(() => {
      this.showBtn = true;
      console.log('worked');
    }, 1350)
  },
}


</script>

<style scoped>
.fullHeight {
  height: 100%;
}

.step_four_container {
  width: 100%;
  height: 100%;
}

.startup_img img {
  width: 200px;
}

.startup_text h2 {
  font-weight: 800;
  color: #115598;
  margin-bottom: 20px;
}

.startup_text .wtsp {
  color: #0EBF99;
}

.startup_text>span {
  opacity: 0.5;
}

.anim_btn {
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

/* .startup_text span:first-child {
  font-weight: 700;
  font-size: 1.1rem;
  color: #115598;
}

.startup_text span:last-child {
  opacity: 0.5;
} */
</style>
