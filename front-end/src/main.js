import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

let data = {
  pokemon: [],
  pokedex: [],
  user: null,
};

new Vue({
  router,
  data,
  render: (h) => h(App),
}).$mount("#app");
