<template>
  <div>
    <div class="p40 m20">
      <b-form-group id="input-group-2" label="Phone Number" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.number.$model"
          type="number"
          placeholder="Number"
          required
          :state="validateState('number')"
          @blur="form.number.$touch"
        >
        </b-form-input>
        <b-form-invalid-feedback>Invalid Phone Number</b-form-invalid-feedback>
      </b-form-group>
    </div>
    <div class="p40 m20">
      <b-form-group id="input-group-1" label="Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name.$model"
          type="text"
          placeholder="Name"
          required
          :state="validateState('name')"
          @blur="form.name.$touch"
        >
        </b-form-input>
        <b-form-invalid-feedback
          >Customer Name Is Required
        </b-form-invalid-feedback>
      </b-form-group>
    </div>

    <div class="p40 m20">
      <!-- <b-progress :value="12" :max="34" show-progress animated></b-progress> -->
      <b-form-group id="input-group-3" label="City" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.city.$model"
          type="text"
          placeholder="Choose city"
          required
          :state="validateState('city')"
          @blur="form.city.$touch"
          :options="cities"
          class="mb-3"
          value-field="name"
          text-field="name"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
              Choose City
            </b-form-select-option>
          </template>
        </b-form-select>
        <b-form-invalid-feedback
          >Customer City Is Required</b-form-invalid-feedback
        >
      </b-form-group>
    </div>
    <div class="p40 m20">
      <b-form-group id="input-group-4" label="Area" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="form.area.$model"
          type="text"
          placeholder="Choose area"
          required
          :state="validateState('area')"
          @blur="form.area.$touch"
          :options="areas"
          class="mb-3"
          value-field="name"
          text-field="name"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
              Choose Area
            </b-form-select-option>
          </template>
        </b-form-select>
        <b-form-invalid-feedback
          >Customer Area Is Required</b-form-invalid-feedback
        >
      </b-form-group>
    </div>
    <div class="p40 m20">
      <b-form-group
        id="input-group-5"
        label="Address Information"
        label-for="textarea"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.address.$model"
          placeholder="Address"
          rows="5"
          @blur="form.address.$touch"
          max-rows="6"
          :state="validateState('address')"
        >
        </b-form-textarea>
        <b-form-invalid-feedback
          >Customer Address Is Required</b-form-invalid-feedback
        >
      </b-form-group>
    </div>
  </div>
</template>

<script>
import allcities from "../static/cities.js";
export default {
  name: "StepOne",
  props: {
    form: Object,
  },
  data() {
    return {
      checked: false,
      cities: allcities(this).Emaratscities,
      areas: [],
    };
  },
  watch: {
    "form.city.$model": function (item) {
      this.cities = allcities(this).Emaratscities;
      const city = this.cities.filter(
        (city) => city.name == this.form.city.$model
      );
      this.areas = city.map((row) => row.subcities);

      this.areas = this.areas[0];
    },
    "form.country.$model": function (item) {
      if (item == "United Arab Emirates")
        this.cities = allcities(this).Emaratscities;
      else if (item == "Qatar") this.cities = allcities(this).KuwaitCities;
      else if (item == "Kuwait") this.cities = allcities(this).KuwaitCities;
      else if (item == "Iraq") this.cities = allcities(this).QatarCities;
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.form[name];

      return $dirty ? !$error : null;
    },
    validate() {
      this.form.name.$touch();
      this.form.city.$touch();
      this.form.area.$touch();
      this.form.address.$touch();
      this.form.number.$touch();
      if (
        this.form.name.$invalid ||
        this.form.city.$invalid ||
        this.form.area.$invalid ||
        this.form.number.$invalid ||
        this.form.address.$invalid
      )
        return false;
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
