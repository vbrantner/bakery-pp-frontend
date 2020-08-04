import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import firebase from "firebase";

import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.axios.defaults.baseURL = `${process.env.VUE_APP_BACKEND_URL}`;
Vue.axios.defaults.headers.common["Authorization"] = process.env.VUE_APP_TOKEN;

var firebaseConfig = {
  apiKey: `${process.env.VUE_APP_API}`,
  authDomain: "jb-brothandwerk-erp.firebaseapp.com",
  databaseURL: "https://jb-brothandwerk-erp.firebaseio.com",
  projectId: "jb-brothandwerk-erp",
  storageBucket: "jb-brothandwerk-erp.appspot.com",
  messagingSenderId: "311100632244",
  appId: "1:311100632244:web:533f5f0a3a317cefe3bbe1",
  measurementId: "G-RCC69X0KWB",
};

firebase.initializeApp(firebaseConfig);
let app;

firebase.auth().onAuthStateChanged((user) => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
