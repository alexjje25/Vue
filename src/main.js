import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/icons.js";
import vuetify from "./plugins/vuetify";
import { Sentry } from "@/service/sentry";

try {
  //nada
} catch (err) {
  window.console.log(err);
  Sentry.captureException(err);
}

Vue.config.errorHandler = (err, vm, info) => {
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.

  // TODO: Perform any custom logic or log to server
  window.console.log(`typeError: ${info}, details:`, err);
  window.console.log("component do erro:", vm);
};

Vue.config.productionTip = false;

Vue.directive("$model", {
  bind: function(el, binding, vnode) {
    el.oninput = () => (vnode.context[binding.expression] = el.value);
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
