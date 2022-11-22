<template>
  <div>
    <CountrySelection />
    <CompanySelection />

    <div class="p40">
      <b-form-checkbox v-model="checked" class="cus_switch" switch size="lg"
        >Non Ad Order</b-form-checkbox
      >
    </div>

    <div class="p40 m20">
      <b-form-group id="input-group-1" label="Add Link" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.landing_link.$model"
          type="text"
          placeholder="Link"
          :state="validateState('landing_link')"
          required
          @blur="form.landing_link.$touch"
        >
        </b-form-input>
        <b-form-invalid-feedback>Invalid link url</b-form-invalid-feedback>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "StepOne",

  props: {
    form: Object,
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.form[name];
      return $dirty ? !$error : null;
    },

    validate() {
      this.form.landing_link.$touch();
      if (this.form.landing_link.$invalid) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.p40 {
  padding: 0 40px;
}

.m20 {
  margin-top: 20px;
}
</style>
