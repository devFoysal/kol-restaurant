<template>
  <main>
    <div class="welcome-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 carousel-container long">
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
                <div class="signup carousel-item active">
                  <div class="welcome">
                    <div class="row">
                      <div class="col-12">
                        <h2>{{strings.welcome[lang]}}</h2>
                        <p>{{strings.intro[lang]}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="signin carousel-item">
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
          <div class="col-6 signup-form">
            <div class="row">
              <div class="col-12">
                <h2 class="form-title">{{strings.sign_up[lang]}}</h2>
              </div>
              <div class="form-group col-10">
                <input
                  type="text"
                  class="form-control name"
                  name="name"
                  :placeholder="strings.full_name[lang]"
                  v-model="user.name"
                  v-on:keyup="checkIfNameValid()"
                />
                <span
                  class="error"
                  v-if="user.name.length > 0 && !checkIfNameValid()"
                >{{strings.name_valid_msg[lang]}}</span>
              </div>
              <div class="form-group col-10">
                <input
                  type="number"
                  class="form-control phone"
                  name="phone"
                  :placeholder="strings.phone_number[lang]"
                  v-on:keyup="checkIfPhoneNumberValid()"
                  v-model="user.phone_number"
                />
                <span
                  class="error"
                  v-if="user.phone_number.length > 0
                && !checkIfPhoneNumberValid()"
                >{{strings.phone_valid_msg[lang]}}</span>
              </div>
              <div class="form-group col-10">
                <input
                  type="email"
                  class="form-control email"
                  name="email"
                  :placeholder="strings.email[lang]"
                  v-model="user.email"
                  v-on:keyup="checkIfEmailValid()"
                />
                <span
                  class="error"
                  v-if="user.email.length > 0 && !checkIfEmailValid()"
                >{{strings.email_valid_msg[lang]}}</span>
              </div>
              <div class="form-group col-10">
                <input
                  type="password"
                  class="form-control pass"
                  name="password"
                  :placeholder="strings.password[lang]"
                  v-model="user.password"
                />
                <span
                  class="error"
                  v-if="user.password.length > 0 && !checkIfPasswordValid()"
                >{{strings.pass_valid_msg[lang]}}</span>
              </div>
              <div class="form-group col-10">
                <input
                  type="password"
                  class="form-control pass"
                  name="confirm-password"
                  :placeholder="strings.conf_pass[lang]"
                  v-model="user.confirmPassword"
                />
                <span
                  class="error"
                  v-if="user.confirmPassword.length > 0
                && !checkIfPasswordMatches()"
                >{{strings.pass_match_msg[lang]}}</span>
                <span
                  v-bind:class="responseType"
                  v-if="responseFromServer !== ''"
                >{{responseFromServer}}</span>
              </div>
              <div class="form-group col-10">
                <button
                  v-on:click="signup($event)"
                  class="btn btn-block btn-brand-styled-bordered"
                  v-bind:disabled="!checkIfAllFieldsValid()"
                >
                  <span>{{strings.sign_up[lang]}}</span>
                </button>
              </div>
              <div class="alternate col-10">
                <span>{{strings.have_account[lang]}}</span> &nbsp;
                <router-link to="/signin">{{strings.sign_in[lang]}}</router-link>
              </div>
            </div>

            <footer>{{strings.agree_terms_cond[lang]}}</footer>
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

export default {
  name: "SignUp",
  component: {
    bootstrap
  },
  data() {
    return {
      user: {
        name: "",
        phone_number: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      responseType: "",
      responseFromServer: "",
      lang: window.localStorage.getItem("kol_user_lang"),
      strings: locales
    };
  },
  methods: {
    signup(event) {
      const that = this;
      event.target.disabled = true;
      const userData = new FormData();
      userData.append("user.name", that.user.name);
      userData.append("user.email", that.user.email);
      userData.append("user.phone_number", that.user.phone_number);
      userData.append("user.password", that.user.password);
      axios({
        method: "post",
        url: `${config.base_url}account/restaurant/`,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: userData
      })
        .then(response => {
          if (response.status === 201) {
            that.responseType = "success";
            that.responseFromServer = "Account created successfully";
            setTimeout(() => {
              that.$router.push({ path: "/profile-unverified" });
            }, 2000);
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            that.responseType = "error";
            that.responseFromServer = "Phone or Email already exists";
          }
        })
        .finally(() => {
          event.target.disabled = false;
        });
    },
    checkIfNameValid() {
      const { name } = this.user;
      const namePattern = /^([a-zA-Z .-]){4,40}$/;
      return namePattern.test(name);
    },
    checkIfPhoneNumberValid() {
      const userPhone = `+${this.user.phone_number}`;
      const bdPhoneNumberPattern = /^\+880\d{10}$/;
      const saPhoneNumberPattern = /^\+966\d{9}$/;
      return (
        bdPhoneNumberPattern.test(userPhone) ||
        saPhoneNumberPattern.test(userPhone)
      );
    },
    checkIfEmailValid() {
      const userEmail = this.user.email;
      const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
      return emailPattern.test(userEmail);
    },
    checkIfPasswordValid() {
      const userPassword = this.user.password;
      const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      return passwordPattern.test(userPassword);
    },
    checkIfPasswordMatches() {
      return this.user.password === this.user.confirmPassword;
    },
    checkIfAllFieldsValid() {
      return (
        this.checkIfNameValid() &&
        this.checkIfPhoneNumberValid() &&
        this.checkIfEmailValid() &&
        this.checkIfPasswordValid() &&
        this.checkIfPasswordMatches()
      );
    }
  }
};
</script>
