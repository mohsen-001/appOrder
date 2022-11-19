<template>
  <div>
    <div id="containerOne">
      <div class="btm_pge">
        <Button btn-text="Next"/>
      </div>
      <div id="app_container">
        <!-- lgoin Cover -->

        <div class="login_cover">
          <img class="page_head_img" src="../static/head-img.svg" alt="aracbic person" width="200px" />
        </div>

        <!-- login container -->

        <div class="page_container">
          <div class="page_stepper">
            <div class="stepper_area p40">
              <Stepper />
            </div>

            <div class="form_area">
              <CountrySelection />
              <CompanySelection />

              <div class="p40">
                <b-form-checkbox v-model="checked" class="cus_switch" switch size="lg">Non Ad Order</b-form-checkbox>
              </div>

              <div class="p40 m20">
                <b-form-group
                id="input-group-1"
                label="Add Link"
                label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.link"
                    type="text"
                    placeholder="Link"
                    required
                  >
                  </b-form-input>
              </b-form-group>
              <!-- <font-awesome-icon icon="fa-solid fa-user" /> -->
              </div>
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
  name: "StepOnePage",
  data() {
    return {
      checked: false,
      form: {
        link: "",
      }
    }
  },
  
}
</script>


<style >
body {
  font-family: "Poppins", sans-serif;
}

#containerOne {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

/* .cus-btn {
  padding: 15px;
  width: 100%;
  border-radius: 50px;
  margin-top: 10px;
} */

.btm_pge {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: white;
  padding: 10px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0px -3px 6px -3px rgba(0,0,0,0.3);
  /* -webkit-box-shadow: 1px -4px 5px -8px rgba(0,0,0,0.11);
  -moz-box-shadow: 1px -4px 5px -8px rgba(0,0,0,0.11); */
}

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

.p40 {
  padding: 0 40px;
}

.m20 {
  margin-top: 20px;
}

/* .custom-switch{
  padding-left: 0 !important;
}

  .custom-control {
  padding-left: 0 !important;
}

.custom-switch.b-custom-control-lg .custom-control-label::before, .input-group-lg .custom-switch .custom-control-label::before{
  left: 215% !important;
}

.custom-switch.b-custom-control-lg .custom-control-label::after, .input-group-lg .custom-switch .custom-control-label::after{
  left: calc(
        215% + 2px
      );

} */

input {
    width: 300px;
    height: 50px;
    border-radius: 50px;
  }











@media screen and (max-width: 768px) {
  #app_container {
    width: 100%;
    height: 100vh;
    background-color: #4779ff;
  }
}
</style>