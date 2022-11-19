<template>
    <div>
        <div class="stepper_container">
            

            <ul>
                <li class="step1 active_stepper"><div></div></li>
                <li class="step2"><div></div></li>
                <li class="step3"><div></div></li>
                <li class="step4"><div></div></li>
            </ul>

            <span class="stepper_progress_place"></span>
            <span class="stepper_progress"></span>
        </div>
        <!-- <button @click="prevStep" style="margin-top: 10px;">back</button>
        <button @click="nextStep" style="margin-top: 10px;">next</button> -->
    </div>
</template>

<script>
export default {
  name: 'Stepper',
  data(){
    return {
        progress: 22,
    }
  },

  mounted(){
    const stepper_progress = document.querySelector('.stepper_progress');
    stepper_progress.style.width = `${this.progress}%`;
    // console.log(stepper_progress);
  },

  methods: {
    nextStep(){
        const activeStep = document.querySelector('.stepper_container .active_stepper');
        const doneSteps = document.querySelectorAll('.stepper_container .done_stepper');
        const stepper_progress = document.querySelector('.stepper_progress');
        const nextStep = activeStep.nextElementSibling;
        // let defaultWidth = 20;
        
        if (nextStep == null){
             return;
        // }else if (doneSteps.length >= 2){
        //     this.progress += 28;    
        //     stepper_progress.style.width = `${this.progress}%`
        }else {
            activeStep.classList.remove("active_stepper");
            activeStep.classList.add("done_stepper");
            nextStep.classList.add("active_stepper");
            this.progress += 28;    
            stepper_progress.style.width = `${this.progress}%`;
            
        }

        // console.log(nextStep);
    },

    prevStep(){
        const activeStep = document.querySelector('.stepper_container .active_stepper');
        const stepper_progress = document.querySelector('.stepper_progress');
        const prevStep = activeStep.previousElementSibling;
        // let defaultWidth = 20;
        
        if (prevStep == null){
             return;
        }else {
            this.progress -= 28;   
            stepper_progress.style.width = `${this.progress}%`;
        }

        // console.log(nextStep);
    }
  },
  
}
</script>


<style scoped>
    .stepper_container {
        width: 100%;
        position: relative;
    }

    .stepper_progress_place  {
        height: 3px;
        width: 100%;
        background-color: #E9E9E9;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
    }

    .stepper_progress  {
        height: 3px;
        /* width: ; */
        background-color: #115598;
        position: absolute;
        top: 50%;
        left: 0;   
        transition: width 0.2s ease-in-out;
    }

    .stepper_container ul {
        width: 100% !important;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
    }

    .stepper_container li{
        width: 50px;
        height: 50px;
        background-color: white;
        z-index: 10;
        border-radius: 50px;
        border: 5px solid #E9E9E9;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .stepper_container li > div{
        background-color: white;
        width: 1px;
        height: 1px;
        border-radius: 50px;
        transition: transform .2s ease-in-out;
    }

    .active_stepper{
        border-color: #115598 !important;
    }

    .active_stepper div{
       transform: scale(20);
       background-color: #115598 !important;
    }

    .done_stepper {
        border-color: #115598 !important;
    }

    .done_stepper div{
        transform: scale(50);
        background-color: #115598 !important;
    }
    
</style>