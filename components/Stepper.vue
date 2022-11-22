<template>

  <div class="stepper_container">
    <div class="progress_holder">
      <div class="progress_line" :style="{ width: progress + 'px' }"></div>
    </div>

    <div class="step" v-for="(step, index) in steppers" :key="index">
      <div class="circle"
        :class="` ${index < doneStepper && index != activeStepper ? 'done_stepper' : ''} ${index == activeStepper ? 'active_stepper' : ''}`">
        <div class="check_holder">
          
        </div>
        <i class="fa-solid fa-check position-absolute"></i>
      </div>
      <span :class="
        index == activeStepper ? 'active_text' : ''
      ">{{ steppers[index] }}</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      steppers: ["Source", "Customer", "Order", "Invoice"],
      activeStepper: 0,
      doneStepper: 0,
      progress: 0,
    };
  },

  mounted() {
    const stepDis = document.querySelectorAll(".step")[1].offsetLeft;
    this.progress = (stepDis - 40) / 2 + 40;
  },

  methods: {
    nextStep() {
      const stepDis = document.querySelectorAll(".step")[1].offsetLeft;
      this.activeStepper += 1;
      if (this.doneStepper > this.activeStepper) {
        return;
      } else if (this.doneStepper != this.activeStepper - 1) {
        return;
      }
      else {
        this.doneStepper += 1;
      }

      if (this.activeStepper > this.steppers.length - 1) {

        this.progress = (stepDis - 40) / 2 + 40;
        this.activeStepper = 0;
        this.doneStepper = 0;
        return;
      } else {
        if (
          this.activeStepper >= 1 &&
          this.activeStepper <= this.steppers.length - 2
        ) {
          this.progress += stepDis;
        } else {
          this.progress += stepDis / 2 + 20;
        }
      }
      console.log(this.activeStepper);
    },

    prevStep() {
      const progressLine = document.querySelector('.progress_line').offsetWidth;
      const stepDis = document.querySelectorAll(".step")[1].offsetLeft;

      if (this.activeStepper <= 0) {
        return;
      } else {
        this.activeStepper -= 1;
      }

      if (this.progress <= (stepDis - 40) / 2 + 40) {
        return;
      } else if (this.doneStepper != this.activeStepper - 1) {
        return;
      } else if (this.progress < progressLine && this.progress > (stepDis - 40) / 2 + 40) {
        this.progress -= stepDis;
      } else {
        this.progress -= stepDis / 2 + 20;
      }
    },
  },
};
</script>

<style scoped>
.stepper_container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.circle {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  border: 5px solid rgb(203, 203, 203);
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle div {
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 20px;
  transition: transform 0.2s ease-in-out;
}

.step i {
  /* width: ; */
  color: white;
  display: none;
}

.step {
  z-index: 10;
  position: relative;
}

.step:nth-child(2) {
  margin-left: 0 !important;
}

.step:last-child {
  margin-right: 0;
}

.progress_holder {
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: rgb(203, 203, 203);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress_line {
  position: absolute;
  height: 3px;
  background-color: #115598;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: width 0.2s ease-out;
}

.step span {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(203, 203, 203);
  width: 80px;
  text-align: center;
}

.active_stepper {
  border-color: #115598;
}

.active_stepper div {
  transform: scale(4);
  background-color: #115598;
}

.done_stepper {
  border-color: #115598;
}

.done_stepper i {
  display: block;
  transform: scale(1.2);
}

.done_stepper div {
  transform: scale(8);
  background-color: #115598;
}

.active_text {
  color: #115598 !important;
  font-weight: bold;
}
</style>