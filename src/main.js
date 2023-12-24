import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "./extend/elementUi";
import "default-passive-events";
import "./assets/public.scss";

Vue.config.productionTip = false;
Vue.use(ElementUi);
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
