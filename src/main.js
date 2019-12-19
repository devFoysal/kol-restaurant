import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// firebase
import firebase from "firebase/app";
import "firebase/messaging";

import Swal from "sweetalert2";
window.swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
window.Toast = Toast;

// Firebase config
window.firebase = firebase;

const firebaseConfig = {
  apiKey: "AIzaSyATFb48zOVkgD7F0l_k6bv58nl4sJ5iNs0",
  authDomain: "kole-application.firebaseapp.com",
  databaseURL: "https://kole-application.firebaseio.com",
  projectId: "kole-application",
  storageBucket: "kole-application.appspot.com",
  messagingSenderId: "737498888975",
  appId: "1:737498888975:web:50d8d2cc8904f0c3819c7a",
  measurementId: "G-RQKLYK3EEY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BCVTu7QCq_KFug_Fdpc-jpRK62w6efiVJwEeubPKz8ddGdjbXH1qV-7lg_S3M11seaP1tYmd5v2iQ7iHxRPmd7M"
);

window.messaging = messaging;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
