<template>
  <main>
    <div class="welcome-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 carousel-container">
            <div id="homeCarousel" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#homeCarousel" data-slide-to="0" class="active">
                  <span></span>
                </li>
                <li data-target="#homeCarousel" data-slide-to="1">
                  <span></span>
                </li>
                <li data-target="#homeCarousel" data-slide-to="2">
                  <span></span>
                </li>
                <li data-target="#homeCarousel" data-slide-to="3">
                  <span></span>
                </li>
              </ol>
              <div class="carousel-inner">
                <div class="signin carousel-item active">
                  <div class="welcome">
                    <div class="row">
                      <div class="col-12">
                        <h2>{{strings.welcome[lang]}}</h2>
                        <p>{{strings.intro[lang]}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="signup carousel-item">
                  <div class="welcome">
                    <div class="row">
                      <div class="col-12">
                        <h2>{{strings.welcome[lang]}}</h2>
                        <p>{{strings.intro[lang]}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="forgot carousel-item">
                  <div class="welcome">
                    <div class="row">
                      <div class="col-12">
                        <h2>{{strings.welcome[lang]}}</h2>
                        <p>{{strings.intro[lang]}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="verify carousel-item">
                  <div class="welcome">
                    <div class="row">
                      <div class="col-12">
                        <h2>{{strings.welcome[lang]}}</h2>
                        <p>{{strings.intro[lang]}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 signin-form">
            <div class="row">
              <div class="col-12">
                <h2 class="form-title">{{strings.sign_in[lang]}}</h2>
              </div>
              <div class="form-group col-10">
                <input
                  type="number"
                  class="form-control phone"
                  name="phone"
                  v-bind:placeholder="strings.phone_number[lang]"
                  onkeydown="return event.keyCode !== 69"
                  v-model="phone_number"
                />
                <span
                  class="error"
                  v-if="phone_number.length > 0
                && !checkIfPhoneNumberValid()"
                >{{strings.phone_valid_msg[lang]}}</span>
              </div>
              <div class="form-group col-10">
                <input
                  type="password"
                  class="form-control pass"
                  name="password"
                  :placeholder="strings.password[lang]"
                  v-model="password"
                />
                <span
                  class="error"
                  v-if="password.length > 0 && !checkIfPasswordValid()"
                >{{strings.pass_valid_msg[lang]}}</span>
              </div>
              <div class="error col-10" v-if="responseFromServer !== ''">{{responseFromServer}}</div>
              <div class="forgot-pass col-10">
                <router-link to="/forgot-password">{{strings.forgot_pass[lang]}}</router-link>
              </div>
              <div class="form-group col-10">
                <button
                  class="btn btn-block btn-brand-styled-bordered"
                  v-on:click="signIn($event)"
                  v-bind:disabled="!checkIfAllFieldsValid()"
                >
                  <span>{{strings.sign_in[lang]}}</span>
                </button>
              </div>
              <div class="alternate col-10">
                <span>{{strings.no_account[lang]}}</span> &nbsp;
                <router-link to="/signup">{{strings.sign_up[lang]}}</router-link>
              </div>
            </div>

            <footer>
              <a v-if="lang === 'en'" v-on:click="switchLocaleToArabic()">{{strings.switch_lang.ar}}</a>
              <a
                v-if="lang === 'ar'"
                v-on:click="switchLocaleToEnglish()"
              >{{strings.switch_lang.en}}</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import bootstrap from "bootstrap";
import axios from "axios";
import config from "../config";
import locales from "../locales";
// import { updateLoggedInUser } from "../firebase";
// import { initializeFirebase } from "../firebase";
import firebase from "firebase/app";
import "firebase/messaging";
export default {
  name: "SignIn",
  component: {
    bootstrap
  },
  data() {
    return {
      phone_number: "",
      password: "",
      responseFromServer: "",
      lang: window.localStorage.getItem("kol_user_lang"),
      strings: locales
    };
  },
  mounted() {
    // initializeFirebase();
  },
  methods: {
    checkIfPhoneNumberValid() {
      const userPhone = `+${this.phone_number}`;
      const bdPhoneNumberPattern = /^\+880\d{10}$/;
      const saPhoneNumberPattern = /^\+966\d{9}$/;
      return (
        bdPhoneNumberPattern.test(userPhone) ||
        saPhoneNumberPattern.test(userPhone)
      );
    },
    checkIfPasswordValid() {
      const userPassword = this.password;
      const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      return passwordPattern.test(userPassword);
    },
    checkIfAllFieldsValid() {
      return this.checkIfPhoneNumberValid() && this.checkIfPasswordValid();
    },
    signIn(event) {
      const that = this;
      event.target.disabled = true;
      axios({
        method: "post",
        url: `${config.base_url}auth/api-token-auth/`,
        data: {
          phone_number: `+${that.phone_number}`,
          password: that.password
        }
      })
        .then(response => {
          if (response.status === 200) {
            this.getRegToken(response.data.access);
            // const firebaseConfig = {
            //   apiKey: "AIzaSyATFb48zOVkgD7F0l_k6bv58nl4sJ5iNs0",
            //   authDomain: "kole-application.firebaseapp.com",
            //   databaseURL: "https://kole-application.firebaseio.com",
            //   projectId: "kole-application",
            //   storageBucket: "kole-application.appspot.com",
            //   messagingSenderId: "737498888975",
            //   appId: "1:737498888975:web:50d8d2cc8904f0c3819c7a",
            //   measurementId: "G-RQKLYK3EEY"
            // };

            // firebase.initializeApp(firebaseConfig);

            // const messaging = firebase.messaging();
            // messaging.usePublicVapidKey(
            //   "BCVTu7QCq_KFug_Fdpc-jpRK62w6efiVJwEeubPKz8ddGdjbXH1qV-7lg_S3M11seaP1tYmd5v2iQ7iHxRPmd7M"
            // );

            // messaging
            //   .requestPermission()
            //   .then(() => {
            //     console.log("Permission granted");
            //     return messaging.getToken();
            //   })
            //   .then(token => {
            //     console.log(token);

            //   })
            //   .catch(error => {
            //     if (error.code === "messaging/permission-blocked") {
            //       console.log("Please Unblock Notification Request Manually");
            //     } else {
            //       console.log("Error Occurred", error);
            //     }
            //   });

            const kolKeys = {};
            kolKeys.access = response.data.access;
            kolKeys.refresh = response.data.refresh;
            window.localStorage.setItem("kol_keys", JSON.stringify(kolKeys));
            window.localStorage.setItem(
              "kol_user",
              JSON.stringify(response.data.user[0])
            );
            window.localStorage.setItem(
              "kol_user_public",
              JSON.stringify(response.data.restaurant.is_public)
            );
            if (response.data.restaurant.is_public) {
              this.$router.push({ path: "/dashboard" });
            } else {
              this.$router.push({ path: "/profile-unverified" });
            }
            updateLoggedInUser(response.data.user[0].id);
          }
        })
        .catch(error => {
          // if (error.response.status === 401) {
          this.responseFromServer = error.response.data.detail;
          // }
        })
        .finally(() => {
          event.target.disabled = false;
        });
    },
    switchLocaleToArabic() {
      window.localStorage.setItem("kol_user_lang", "ar");
      this.lang = "ar";
      window.document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", "rtl");
    },
    switchLocaleToEnglish() {
      window.localStorage.setItem("kol_user_lang", "en");
      this.lang = "en";
      window.document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", "ltr");
    },
    getRegToken(userToken) {
      messaging
        .getToken()
        .then(currentToken => {
          if (currentToken) {
            console.log(currentToken);
            this.sendTokenToServer(currentToken, userToken);
          } else {
            // Show permission request.
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            // Show permission UI.
            this.setTokenSentToServer(false);
          }
        })
        .catch(err => {
          console.log("An error occurred while retrieving token. ", err);
          // this.showToken("Error retrieving Instance ID token. ", err);
          this.setTokenSentToServer(false);
        });
    },

    sendTokenToServer(currentToken, userToken) {
      if (!this.isTokenSentToServer()) {
        console.log("Sending token to server...");
        const fcmData = new FormData();
        fcmData.append("registration_id", currentToken);
        fcmData.append("type", "web");
        axios({
          method: "post",
          url: `${config.base_url}account/fcm/`,
          headers: {
            Authorization: `JWT ${userToken}`
          },
          data: fcmData
        })
          .then(res => console.log("fcm result", res))
          .catch(err => console.log(err));
        // TODO(developer): Send the current token to your server.
        this.setTokenSentToServer(true);
      } else {
        console.log(
          "Token already sent to server so won't send it again " +
            "unless it changes"
        );
      }
    },

    setTokenSentToServer(sent) {
      window.localStorage.setItem("sentToServer", sent ? "1" : "0");
    },

    isTokenSentToServer() {
      return window.localStorage.getItem("sentToServer") === "1";
    }
  }
};
</script>
