<template>
    <div>
        <div id="container">
      <div id="app_container">
        <!-- lgoin Cover -->

        <div class="login_cover">
          <img
            class="page_head_img"
            src="../static/head-img.svg"
            alt="aracbic person"
            width="200px"
          />
        </div>

        <!-- login container -->

        <div class="page_container">
          <div class="page_stepper">
            <div class="stepper_area">
              <Stepper />
            </div>

            <div class="form_area">
              <CountrySelection />
            </div>
          </div>

          <div class="login_container-form">
            
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import CountrySelection from '../components/CountrySelection.vue';

export default {
    name: "StepTwoPage",
    components: { CountrySelection }
}
</script>


<style scoped>

body {
  font-family: "Poppins", sans-serif;
}

#container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

/* .cus-btn {
  padding: 15px;
  width: 100%;
  border-radius: 50px;
  margin-top: 10px;
} */


#app_container {
    width: 600px;
    height: 100vh;
    background-color: #115598 !important;
  }

  .login_cover {
    width: 100%;
    height: 12%;
    position: relative;
  }

  .page_head_img {
    position: absolute;
    bottom: 0px;
    right: 20px;

  }

  .page_container {
    background-color: white;
    width: 100%;
    height: 88%;
    border-top-left-radius: 81px;
    padding: 20px 0;
  }

  .stepper_area {
    padding: 0 40px;
  }













@media screen and (max-width: 768px) {
  #app_container {
    width: 100%;
    height: 100vh;
    background-color: #4779ff;
  }
}
</style>