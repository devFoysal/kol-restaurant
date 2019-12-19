<template>
  <main>
    <div class="welcome-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-6 carousel-container">
            <div id="homeCarousel" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#homeCarousel" data-slide-to="0" class="active"><span></span></li>
                <li data-target="#homeCarousel" data-slide-to="1"><span></span></li>
                <li data-target="#homeCarousel" data-slide-to="2"><span></span></li>
                <li data-target="#homeCarousel" data-slide-to="3"><span></span></li>
              </ol>
              <div class="carousel-inner">
                <div class="forgot carousel-item active">
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
          <div class="col-6 forgot-pass-form">
            <div class="row">
              <div class="col-12">
                <h2 class="form-title">{{strings.forgot_pass[lang]}}</h2>
              </div>
              <div class="col-10">
                <p>{{strings.recover_tip[lang]}}</p>
              </div>
              <div class="form-group col-10">
                <input type="number" class="form-control phone" name="phone"
                   :placeholder="strings.phone_number[lang]" onkeydown="return event.keyCode !== 69"
                       v-model="phone_number" v-on:keyup="checkIfPhoneNumberValid()">
                <span class="error" v-if="phone_number.length > 0
                && !checkIfPhoneNumberValid()">{{strings.phone_valid_msg[lang]}}</span>
                <span class="error" v-if="responseFromServer !== ''">{{responseFromServer}}</span>
              </div>

              <div class="form-group col-10">
                <button v-on:click="sendVerificationCode($event)"
                        v-bind:disabled="!checkIfPhoneNumberValid()"
                        class="btn btn-block btn-brand-styled-bordered">
                  <span>{{strings.send_code[lang]}}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import bootstrap from 'bootstrap';
import axios from 'axios';
import config from '../config';
import locales from '../locales';

export default {
  name: 'ForgotPassword',
  component: {
    bootstrap,
  },
  data() {
    return {
      phone_number: '',
      responseFromServer: '',
      lang: window.localStorage.getItem('kol_user_lang'),
      strings: locales,
    };
  },
  methods: {
    checkIfPhoneNumberValid() {
      const userPhone = `+${this.phone_number}`;
      const bdPhoneNumberPattern = /^\+880\d{10}$/;
      const saPhoneNumberPattern = /^\+966\d{11}$/;
      return bdPhoneNumberPattern.test(userPhone) || saPhoneNumberPattern.test(userPhone);
    },
    sendVerificationCode(event) {
      event.target.disabled = true;
      const that = this;
      axios({
        method: 'post',
        url: `${config.base_url}account/forgot-password/`,
        data: {
          phone_number: `+${that.phone_number}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          this.$store.commit('updatePhoneToBeVerfied', `+${that.phone_number}`);
          this.$router.push({ path: '/verify' });
        }
      }).catch((error) => {
        if (error.response.status === 400) {
          that.responseFromServer = error.response.data.phone_number;
        }
        if (error.response.status === 429) {
          that.responseFromServer = error.response.data.non_field_errors;
        }
      }).finally(() => {
        event.target.disabled = false;
      });
    },
  },
};
</script>
