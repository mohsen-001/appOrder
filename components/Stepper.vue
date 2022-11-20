<template>
  <div class="container">
    <div class="stepper_container">
      <div class="progress_holder">
        <div class="progress_line" :style="{ width: progress + 'px' }"></div>
      </div>

      <div class="step" v-for="(step, index) in steppers" :key="index">
        <div class="circle" :class="steppers[index].status">
          <div></div>
        </div>
        <span :class="
          steppers[index].status == 'active_stepper' ? 'active_text' : ''
        ">{{ steppers[index].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { runInThisContext } from "vm";

export default {
  name: "IndexPage",
  data() {
    return {
      steppers: [
        { name: "Source", status: "active_stepper" },
        { name: "Customer", status: null },
        { name: "Order", status: null },
        { name: "Invoice", status: null },
      ],
      activeStepper: 0,
      doneStepper: 0,
      progress: 0,
    };
  },
  mounted() {
    // const progressHolder = document.querySelector('.progress_holder').offsetWidth;
    const stepDis = document.querySelectorAll(".step")[1].offsetLeft;
    this.progress = (stepDis - 40) / 2 + 40;
  },
  methods: {
    nextStep() {
      const stepDis = document.querySelectorAll(".step")[1].offsetLeft;
      this.activeStepper += 1;
      // console.log(this.doneStepper);

      if (this.activeStepper >= this.steppers.length) {
        this.steppers.forEach((item) => {
          item.status = null;
        });

        this.steppers[0].status = "active_stepper";
        this.progress = (stepDis - 40) / 2 + 40;
        this.activeStepper = 0;
        this.doneStepper = 0;
        return;
      } else {

        // console.log("Active Stepper", this.activeStepper);
        // console.log("Done Stepper", this.doneStepper);

        if (this.activeStepper < this.doneStepper) {
          return;
        } else {
          if (this.activeStepper >= 1 && this.activeStepper <= this.steppers.length - 2) {
            this.progress += stepDis;
          } else {
            this.progress += stepDis / 2 + 20;
          }
        }

        // console.log('continue');

        // this.doneStepper++;

        // if (this.activeStepper < this.doneStepper) {
        //   this.steppers[this.activeStepper].status = "active_stepper";
        //   this.steppers[this.activeStepper - 1].status = "done_stepper";
        // } else {


        // }
        this.doneStepper++;
        this.steppers[this.doneStepper - 1].status = "done_stepper";
        this.steppers[this.activeStepper].status = "active_stepper";

        console.log("Active Stepper", this.activeStepper);
        console.log("Done Stepper", this.doneStepper);

        // console.log(this.doneStepper);

        // this.doneStepper++;
        // // this.doneStepper++;
        // console.log("Done Stepper", this.doneStepper);
        // console.log("Active Stepper", this.activeStepper);
        // this.steppers[this.doneStepper - 1].status = "done_stepper";
        // this.steppers[this.activeStepper].status = "active_stepper";
      }
    },
    prevStep() {
      const progressHolder =
        document.querySelector(".progress_holder").offsetWidth;
      const stepDis = document.querySelectorAll(".step")[1].offsetLeft;
      console.log(this.doneStepper);
      console.log(this.activeStepper);

      if (this.activeStepper == this.doneStepper) {
        this.steppers[this.activeStepper].status = null;
        // this.steppers[this.activeStepper -1 ].status = "done_stepper";
      } else {
        this.steppers[this.activeStepper].status = "done_stepper";
      }

      this.activeStepper--;
      this.steppers[this.activeStepper].status = "active_stepper";

      // if (this.progress <= (stepDis - 40) / 2 + 40) {
      //   return;
      // } else if (this.progress == progressHolder || this.progress == (stepDis - 40) / 2 + 40) {
      //   this.progress -= stepDis / 2 + 20;
      // } else {
      //   this.progress -= stepDis;

      // }
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
  border: 5px solid #e9e9e9;
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

.step {
  /* margin: 0 30px; */
  z-index: 10;
  position: relative;
  /* opacity: 0.5; */
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
  background-color: #e9e9e9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress_line {
  position: absolute;
  /* width: 80%; */
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
  font-size: 0.9rem;
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

.done_stepper div {
  transform: scale(8);
  background-color: #115598;
}

.active_text {
  color: #115598 !important;
  font-weight: bold;
}
</style>
