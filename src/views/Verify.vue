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
                <div class="verify carousel-item active">
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
              </div>
            </div>
          </div>
          <div class="col-6 verify-code-form">
            <div class="row">
              <div class="col-12">
                <h2 class="form-title">{{strings.enter_code[lang]}}</h2>
              </div>
              <div class="form-group col-10">
                <input type="number" class="form-control verify-code"
                       name="verification-code" maxlength="4" v-model="verification_code">
                <span class="error" v-if="verification_code.length > 0 && !checkIfCodeValid()">
                  {{strings.verify_valid_code_msg[lang]}}
                </span>
                <span class="error" v-if="responseFromServer !== ''">{{responseFromServer}}</span>
              </div>

              <div class="form-group col-10">
                <button v-on:click="verifyPhone()" id="continue"
                        v-bind:disabled="!checkIfCodeValid()"
                   class="btn btn-block btn-brand-styled-bordered">
                  <span>{{strings.continue[lang]}}</span>
                </button>
              </div>
              <div class="col-10">
                <p class="resend-code">
                  <a href="#" v-on:click="resendVerificationCode()">
                    {{strings.resend[lang]}}
                  </a>&nbsp;{{strings.verification_code[lang]}}
                </p>
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
  name: 'Verify',
  component: {
    bootstrap,
  },
  data() {
    return {
      verification_code: '',
      responseFromServer: '',
      lang: window.localStorage.getItem('kol_user_lang'),
      strings: locales,
    };
  },
  methods: {
    checkIfCodeValid() {
      const verificationCode = this.verification_code;
      const codePattern = /^\d{4}$/;
      return codePattern.test(verificationCode);
    },
    verifyPhone() {
      if (this.$store.state.phoneToBeVerfied !== '') {
        const that = this;
        axios({
          method: 'post',
          url: `${config.base_url}account/check-reset-token/`,
          data: {
            phone_number: this.$store.state.phoneToBeVerfied,
            code: that.verification_code,
          },
        }).then((response) => {
          if (response.status === 200) {
            if (response.data.valid) {
              this.$store.commit('updateVerificationCode', that.verification_code);
              this.$router.push({ path: '/reset-password' });
            } else {
              that.responseFromServer = 'Code is incorrect';
            }
          }
        });
      } else {
        this.$router.push({ path: '/forgot-password' });
      }
    },
    resendVerificationCode() {
      if (this.$store.state.phoneToBeVerfied !== '') {
        const that = this;
        axios({
          method: 'post',
          url: `${config.base_url}account/resend-verification-code/`,
          data: {
            phone_number: this.$store.state.phoneToBeVerfied,
          },
        }).then((response) => {
          if (response.status === 200) {
            that.responseFromServer = 'New verification code sent';
            setTimeout(() => { that.responseFromServer = ''; }, 2000);
          }
        }).catch((error) => {
          if (error.response.status === 400) {
            that.responseFromServer = error.response.data.phone_number;
          }
          if (error.response.status === 429) {
            that.responseFromServer = error.response.data.non_field_errors;
          }
        });
      } else {
        this.$router.push({ path: '/forgot-password' });
      }
    },
  },
};
</script>
