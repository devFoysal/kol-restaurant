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
                <div class="reset carousel-item active">
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
          <div class="col-6 reset-pass-form">
            <div class="row">
              <div class="col-12">
                <h2 class="form-title">{{strings.reset_ur_pass[lang]}}</h2>
              </div>
              <div class="form-group col-10">
                <input type="password" class="form-control pass"
                       name="password" :placeholder="strings.password[lang]" v-model="password">
                <span class="error" v-if="password.length > 0 && !checkIfPasswordValid()">
                  {{strings.pass_valid_msg[lang]}}
                </span>
              </div>
              <div class="form-group col-10">
                <input type="password" class="form-control pass" v-model="confirmPassword"
                       name="confirm-password" :placeholder="strings.conf_pass[lang]">
                <span class="error" v-if="confirmPassword.length > 0 && !checkIfPasswordMatches()">
                  {{strings.pass_match_msg[lang]}}
                </span>
                <span v-bind:class="responseType" v-if="responseFromServer !== ''">
                  {{responseFromServer}}
                </span>
              </div>
              <div class="form-group col-10">
                <button v-on:click="resetPassword()"
                        class="btn btn-block btn-brand-styled-bordered">
                  <span>{{strings.reset[lang]}}</span>
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
  name: 'ResetPassword',
  component: {
    bootstrap,
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      responseFromServer: '',
      responseType: '',
      lang: window.localStorage.getItem('kol_user_lang'),
      strings: locales,
    };
  },
  methods: {
    checkIfPasswordValid() {
      const userPassword = this.password;
      const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
      return passwordPattern.test(userPassword);
    },
    checkIfPasswordMatches() {
      return this.password === this.confirmPassword;
    },
    resetPassword() {
      const that = this;
      if (this.$store.state.phoneToBeVerfied !== ''
        && this.$store.state.validVerficationCode !== 0) {
        axios({
          method: 'post',
          url: `${config.base_url}account/reset-password/`,
          data: {
            phone_number: this.$store.state.phoneToBeVerfied,
            code: this.$store.state.validVerficationCode,
            new_password: that.password,
          },
        }).then((response) => {
          if (response.status === 200) {
            that.responseType = 'success';
            that.password = '';
            that.confirmPassword = '';
            let counter = 5;
            const interval = setInterval(() => {
              counter -= 1;
              that.responseFromServer = `Password changed successfully.
              Redirecting to homepage in: ${counter}s`;
              if (counter === 0) {
                clearInterval(interval);
                that.$router.push({ path: '/signin' });
              }
            }, 1000);
          }
        }).catch((error) => {
          if (error.response.status === 400) {
            that.responseType = 'error';
            that.responseFromServer = 'The verification code is invalid or expired.';
          }
        });
      } else {
        this.$router.push({ path: '/forgot-password' });
      }
    },
  },
};
</script>
