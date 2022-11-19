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
          <span
            :class="
              steppers[index].status == 'active_stepper' ? 'active_text' : ''
            "
            >{{ steppers[index].name }}</span
          >
        </div>
      </div>
  
      <div>
        <!-- <button style="margin-top: 100px">Prev</button>
        <button @click="nextStep" style="margin-top: 100px">Next</button> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "IndexPage",
    data() {
      return {
        steppers: [
          { name: "Step 1", status: "active_stepper" },
          { name: "Step 2", status: null },
          { name: "Step 3", status: null },
          { name: "Step 4", status: null },
        ],
        activeStepper: 0,
        // doneStepper: 0,
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
        
        if (this.activeStepper > this.steppers.length - 1) {
          this.steppers.forEach((item) => {
            item.status = null;
          });
          this.steppers[0].status = "active_stepper";
          this.progress = (stepDis - 40) / 2 + 40;
          this.activeStepper = 0;
          return;
        } else {
          if (
            this.activeStepper >= 1 &&
            this.activeStepper <= this.steppers.length - 2
          ) {
            this.progress += stepDis;
            // console.log('worked');
          } else {
            this.progress += stepDis / 2 + 20;
          }
          this.steppers[this.activeStepper - 1].status = "done_stepper";
          this.steppers[this.activeStepper].status = "active_stepper";
        }
      },
      prevStep() {
      const progressLine = document.querySelector('.progress_line').offsetWidth;
      console.log(progressLine);
        const stepDis = document.querySelectorAll(".step")[1].offsetLeft;
        // this.activeStepper += 1;
        // console.log(this.progress);
        if(this.progress <= (stepDis - 40) / 2 + 40){
            return;
        }else if (this.progress < progressLine && this.progress > (stepDis - 40) / 2 + 40) {
            this.progress -= stepDis;
            // console.log('yes');
          } else {
            this.progress -= stepDis / 2 + 20;
            // console.log('no');
          }
        console.log(this.progress);
      },
    },
  };
  </script>
  
  <style scoped>
  /* .container {
    width: 100vw;
    flex-direction: column;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
  } */
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
    background-color: rgb(203, 203, 203);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .progress_line {
    position: absolute;
    /* width: 80%; */
    height: 3px;
    background-color: red;
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
    border-color: red;
  }
  .active_stepper div {
    transform: scale(4);
    background-color: red;
  }
  .done_stepper {
    border-color: red;
  }
  .done_stepper div {
    transform: scale(8);
    background-color: red;
  }
  .active_text {
    color: red !important;
    font-weight: bold;
  }
  </style>