<template>
  <div>
    <!-- <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">Notice!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
      </template>
      This is the content of the toast. It is short and to the point.
    </b-toast> -->
    <!-- <b-button @click="$bvToast.show('my-toast')">Show toast</b-button> -->
    <div id="container">
      <div id="app_container">
        <!-- lgoin Cover -->

        <div class="login_cover">
          <img
            class="login_cover_img"
            src="../static/ara-char.svg"
            alt="aracbic person"
            width="350px"
          />
        </div>

        <!-- login container -->

        <div class="login_container">
          <div class="login_container_head">
            <h2>Welcome</h2>
            <p>Login to continue.</p>
          </div>

          <div class="login_container-form">
            <form action="/">
              <b-form-group
                id="input-group-1"
                label="Username"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.username"
                  type="text"
                  placeholder="Username"
                  required
                >
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                  required
                >
                </b-form-input>
              </b-form-group>

              <b-button @click="signIn()" variant="primary" class="cus-btn"
                >Primary</b-button
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      signKey: 1,
      showVerify: false,
      rememberMe: true,
      disableLoginButton: true,
      error: {},
      invalidCreds: "",
      networkError: false,
      email: "",
      password: "",
      isLoading: false,
      showPass: false,
      gettingLocation: false,
      location: null,
      errorStr: null,
      fetch: true,
      show1: false,
      aniPass: true,
      aniSuccess: false,
      aniError: false,
    };
  },
  methods: {
    async signIn() {
      try {
        console.log("sign in");
        const result = await this.$auth.loginWith("laravelSanctum", {
          data: { email: this.form.email, password: this.form.password },
        });

        // if user logged in successfully show success message
        if (result.status === 201 && result.data.result) {
          console.log("logged in");
        } else {
          console.log("login failed ");
        }
      } catch (e) {
        console.log("error occured", e);
      }
    },
  },
};
</script>

<style scoped>
/* :root {
  --pri-color: #115598;
} */

body {
  font-family: "Poppins", sans-serif;
}

#container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.cus-btn {
  padding: 15px;
  width: 100%;
  /* max-width: 600px; */
  border-radius: 50px;
  margin-top: 10px;
  /* background-color: #115598; */
}

#app_container {
  width: 600px;
  height: 100vh;
  background-color: #115598 !important;
}

.login_cover {
  width: 100%;
  height: 35%;
  position: relative;
}

.login_cover_img {
  position: absolute;
  bottom: -35px;
}

.login_container {
  background-color: white;
  width: 100%;
  height: 65%;
  border-top-right-radius: 81px;
}

.login_container_head {
  text-align: center;
  padding: 20px;
}

.login_container-form {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

input {
  width: 300px;
  height: 50px;
  border-radius: 50px;
}

.login_container_head {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login_container_head h2 {
  font-weight: 900;
  color: #115598;
}

/* for mobile size */

/* @media screen and (min-width: 767px) {

} */

@media screen and (max-width: 768px) {
  #app_container {
    width: 100%;
    height: 100vh;
    background-color: #4779ff;
  }
}
</style>
