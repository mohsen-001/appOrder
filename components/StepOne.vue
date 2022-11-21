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
          v-model="$v.form.link.$model"
          type="text"
          placeholder="Link"
          :state="validateState('link')"
          required
          @blur="$v.form.link.$touch"
        >
        </b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback"
          >This is a required field and must be at least 3
          characters.</b-form-invalid-feedback
        >
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "StepOne",

  validations: {
    form: {
      link: {
        required,
        minLength: minLength(3),
      },
    },
  },
  data() {
    return {
      checked: false,
      form: {
        link: "",
      },
    };
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        name: null,
        food: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    validate() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
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
