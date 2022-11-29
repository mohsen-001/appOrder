<template>
  <div>
    <CountrySelection v-model="form.country.$model" />
    <div class="error-container mb-3">
      <span class="error" v-show="this.is_touched && form.country.$invalid"
        >Country Is Required</span
      >
    </div>
    <div>
      <projectSelection
        :items="projects"
        v-model="form.project.$model"
        :loading.sync="isFetchingProjects"
      />
      <div class="error-container mb-3">
        <span class="error" v-show="this.is_touched && form.project.$invalid"
          >Company Is Required</span
        >
      </div>
    </div>
    <div class="p40">
      <b-form-checkbox
        class="cus_switch"
        switch
        size="lg"
        v-model="form.no_ad_order.$model"
        >Non Ad Order</b-form-checkbox
      >
    </div>

    <div class="p40 m20">
      <b-form-group
        id="input-group-1"
        label="Add Link"
        label-for="input-1"
        v-show="!form.no_ad_order.$model"
      >
        <b-form-input
          id="input-1"
          type="text"
          placeholder="Link"
          :state="validateState('landing_link')"
          v-model="form.landing_link.$model"
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
  watch: {
    "form.project.$model": function (item) {
      this.form.selected_company.$model = this.projects.find(
        (item) => item.id == this.form.project.$model
      );
      console.log(this.form.selected_company.$model);
    },
    "form.country.$model": function (item) {
      if (this.selectedCompany != item && item != "") {
        this.selectedCompany = item;
        this.form.project.$model = null;
        this.fetchItems({});
      }
    },
  },
  data() {
    return {
      checked: false,
      ColumnAxiosSource: null,
      projects: [],
      isFetchingProjects: false, //
      is_touched: false, //
      selectedCompany: null,
    };
  },
  created() {
    if (this.projects.length < 1) this.fetchItems({});
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.form[name];
      return $dirty ? !$error : null;
    },
    async fetchItems(param) {
      try {
        this.isFetchingProjects = true;
        const url = `orders/fetch-items/projects/1`;

        const { data } = await this.$axios.get(url, {
          params: param,
        });

        if (data.items && data.items.length > 0) this.projects = data.items;
        else
          this.$bvToast.toast("company Not Found", {
            variant: "danger",
            solid: true,
            noCloseButton: true,
            autoHideDelay: "1000",
          });
      } catch (error) {
        console.log(error);
      }
      this.isFetchingProjects = false;
    },

    validate() {
      this.is_touched = true;
      this.form.landing_link.$touch();
      this.form.country.$touch();
      this.form.project.$touch();

      if (
        this.form.landing_link.$invalid ||
        this.form.country.$invalid ||
        this.form.project.$invalid
      ) {
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
