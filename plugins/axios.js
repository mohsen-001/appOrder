import Vue from "vue";
import axios from "axios";

export default () => {
  Vue.prototype.$axios = axios;
};
