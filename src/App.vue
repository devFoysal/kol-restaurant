<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import 'assets/fonts/stylesheet.css';

*{
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F7F7FA;
}

main.dashboard {
  padding-top: 100px;
}

// common elements
.btn-brand {
  border: 4px solid transparent;
  border-radius: 40px;
  background-color: #fff;
  padding: 12px 35px;
  box-shadow: 0 10px 16px rgba(69, 91, 99, 0.06);
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 10px;
}

.btn-brand-styled-bordered {
  position: relative;
  border-radius: 40px;
  background-color: #fff;
  color: #449AA3;
  padding: 8px 35px;
  box-shadow: 0 10px 16px rgba(69, 91, 99, 0.06);
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 10px;
  text-transform: uppercase;
  border: 4px solid rgba(78, 186, 197, .8);
  box-sizing: border-box;
  span {
    position: relative;
    z-index: 5;
  }

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% + 10px);
    background-color: #fff;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: 2;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    width: calc(100% + 10px);
    height: 4px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: 3;
  }

  &:focus, &:hover {
    color: #449AA3;
    outline: 0;
    box-shadow: 0 10px 16px rgba(69, 91, 99, 0.06);
    border: 4px solid rgba(78, 186, 197, .8);
  }
}

label.checkbox-brand {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  cursor: pointer;
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + .checkbox-brand-outer {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: rgb(180,187,201);
    background: linear-gradient(0deg, rgba(180,187,201,1) 0%, rgba(180,187,201,1) 100%);
    border-radius: 20px;
    position: relative;
    transition: .3s ease-in-out;
    .checkbox-brand-inner {
      position: absolute;
      right: 23px;
      top: 3px;
      display: inline-block;
      width: 14px;
      height: 14px;
      background-color: #fff;
      border-radius: 10px;
      transition: .3s ease-in-out;
    }
  }

  input[type="checkbox"]:checked + .checkbox-brand-outer {
    background: rgb(68,154,163);
    background: linear-gradient(0deg, rgba(68,154,163,1) 0%, rgba(78,186,197,1) 100%);
    transition: .3s ease-in-out;
    .checkbox-brand-inner {
      right: 3px;
      transition: .3s ease-in-out;
    }
  }
}

label.checkbox-brand-circle {
  display: inline-block;
  margin: 0 0 0 10px;
  vertical-align: middle;
  cursor: pointer;

  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + .checkbox-brand-bg {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("~@/assets/images/icons/icon-payment-to-be-done.svg") no-repeat center;
    border-radius: 30px;
  }

  input[type="checkbox"]:checked + .checkbox-brand-bg {
    background: url("~@/assets/images/icons/icon-payment-paid.svg") no-repeat center;
  }
}

label.radio-brand,
label.radio-brand-red {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-bottom: 0;
  vertical-align: middle;
  position: relative;
  input[type="radio"] {
    display: none;
  }

  input[type="radio"] + .radio-brand-view,
  input[type="radio"]:checked + .radio-brand-view {
    display: inline-block;
    width: 18px;
    height: 18px;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("~@/assets/images/icons/icon-brand-radio.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 18px;
  }

  input[type="radio"]:checked + .radio-brand-view {
    background-image: url("~@/assets/images/icons/icon-brand-radio-checked.svg");
  }
}

label.radio-brand-red {
  input[type="radio"] + .radio-brand-view {
    background-image: url("~@/assets/images/icons/icon-red-radio.svg");
  }

  input[type="radio"]:checked + .radio-brand-view {
    background-image: url("~@/assets/images/icons/icon-red-radio-checked.svg");
  }
}

select.brand-select {
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 5px 5px rgba(0,0,0,0.05);
  color: #449AA3;
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  padding: 5px 30px 5px 10px;
  min-width: 120px;
  background-image: url("~@/assets/images/icons/icon-arrow-down-teal.svg");
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  &:focus {
    outline: 0;
  }
}

select.brand-select-minimal {
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #449AA3;
  color: #449AA3;
  font-size: 15px;
  margin-left: 5px;
  padding: 0 30px 0 5px;
  background-image: url("~@/assets/images/icons/icon-arrow-down-teal.svg");
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  &:focus {
    outline: 0;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {

  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}

a {
  cursor: pointer;
}
// stylize srollbar, only works on chrome :(

/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.3);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.5);
}


.welcome-page {
  .carousel-container {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    ol.carousel-indicators {
      display: block;
      width: 100%;
      position: absolute;
      left: 0;
      top: 5rem;
      bottom: auto;
      margin: 0;
      list-style: none;
      text-align: center;
      li {
        display: inline;
        background: none;
        margin: 0;
        span {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          margin: 0 6px;
        }
      }

      li.active {
        span {
          background-color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }

  .carousel-container.long {
    .welcome {
      min-height: 120vh;
    }
  }

  .signin, .signup, .forgot, .verify, .reset {
    background-image: url("~@/assets/images/sign-in-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: 0;
    .welcome {
      background-color: rgba(0,0,0,0.3);
      min-height: 100vh;
      padding-top: 9rem;
      color: #fff;
      h2 {
        font-size: 50px;
        line-height: 70px;
        font-weight: 600;
        padding: 0 6rem 0 12rem;
      }

      p {
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 0;
        padding: 0 6rem 0 12rem;
      }
    }
  }

  .signin-form, .signup-form, .forgot-pass-form, .verify-code-form, .reset-pass-form {
    background-image: url("~@/assets/images/public-page-bg.svg");
    background-repeat: no-repeat;
    background-size: 180%;
    background-position: right top;
    padding: 10rem 12rem 10rem 6rem;
    min-height: 100vh;
    .form-title {
      font-size: 40px;
      line-height: 50px;
      font-weight: bold;
      text-transform: uppercase;
      color: #fff;
      margin-bottom: 1.8rem;
      text-shadow: 0 0 6px rgba(0,0,0,0.1);
    }

    p {
      font-size: 15px;
      line-height: 20px;
      color: #454F63;
      margin-bottom: 40px;
    }

    .form-control {
      border: 0;
      border-radius: 40px;
      background-color: #fff;
      padding: 12px 35px 12px 40px;
      box-shadow: 0 10px 16px rgba(69, 91, 99, 0.06);
      font-size: 15px;
      line-height: 23px;
      margin-bottom: 15px;
      height: auto;
    }

    ::placeholder {
      color: #B4BBC9;
      opacity: 1;
    }

    .error, .success {
      display: block;
      font-size: 10px;
      line-height: 14px;
      color: #ff8d00;
      position: relative;
      top: -10px;
      left: 20px;
      width: calc(100% - 30px);
    }

    .success {
      color: #44A377;
    }

    .form-control.name, .form-control.phone,
    .form-control.email, .form-control.pass {
      background-repeat: no-repeat;
      background-position: 20px center;
    }

    .form-control.name {
      background-image: url('~@/assets/images/icons/icon-user.svg');
    }

    .form-control.phone {
      background-image: url('~@/assets/images/icons/icon-phone.svg');
    }

    .form-control.email {
      background-image: url('~@/assets/images/icons/icon-envelop.svg');
    }

    .form-control.pass {
      background-image: url('~@/assets/images/icons/icon-lock.svg');
    }

    .forgot-pass, .alternate {
      font-size: 12px;
      line-height: 14px;
      text-transform: uppercase;
      color: #B4BBC9;
      text-align: center;
      a {
        color: #B4BBC9;
        &:hover, &:focus, &:active {
          color: #B4BBC9;
          text-decoration: none;
        }
      }
    }

    .alternate {
      span {
        color: #B4BBC9;
      }
      a {
        color: #449AA3;
        opacity: 1;
        &:hover, &:focus, &:active {
          color: #449AA3;
          text-decoration: none;
        }
      }
    }

    .btn-brand-styled-bordered {
      margin-top: 40px;
    }

    footer {
      font-size: 12px;
      color: #B4BBC9;
      padding: 2rem 17rem 2rem 6rem;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      text-align: center;

      a {
        color: #449aa3;
        &:hover, &:focus, &:active, &:visited {
          color: #449aa3;
          text-decoration: none;
        }
      }
    }
  }

  .signup {
    background-image: url("~@/assets/images/sign-up-bg.png");
  }

  .signup-form {
    footer {
      padding: 2rem 8rem 2rem 2rem;
    }
  }

  .forgot {
    background-image: url("~@/assets/images/forgot-pass-bg.png");
  }

  .forgot-pass-form {
    .form-title {
      text-transform: none;
      margin-bottom: 10px;
    }

    .btn-brand-styled-bordered {
      margin-top: 20px;
    }
  }

  .verify {
    background-image: url("~@/assets/images/verification-code-bg.png");
  }

  .verify-code-form {
    .form-title {
      text-transform: none;
    }

    .form-control.verify-code {
      background-image: url("~@/assets/images/icons/icon-spaced-bars.svg");
      background-repeat: no-repeat;
      background-size: 80%;
      background-position: center;
      padding: 12px 0 12px 67px;
      letter-spacing: 60px;
    }

    .btn-brand-styled-bordered {
      margin-top: 50px;
    }

    .resend-code {
      margin-top: 16px;
      text-align: center;
      color: #B4BBC9;
      font-size: 12px;
      line-height: 14px;
      text-transform: uppercase;
      a {
        color: #449AA3;
        &:hover, &:focus, &:active {
          color: #449AA3;
          text-decoration: none;
        }
      }
    }
  }

  .reset {
    background-image: url("~@/assets/images/reset-pass-bg.png");
  }

  .reset-pass-form {
    .form-title {
      text-transform: none;
    }
  }
}

main.dashboard {
  //  modal styles
  .modal {
    .modal-dialog {
      max-width: inherit;
      margin: 6rem auto;
      .custom-row {
        margin: 0;
        .modal-content {
          border: 1px solid transparent;
          border-radius: 10px;
          .modal-body {
            padding: 3rem 0;
            position: relative;
            .close-modal {
              display: inline-block;
              position: absolute;
              top: 35px;
              right: 30px;
              cursor: pointer;
            }
            .order-details-modal, .invoice-modal {
              padding: 2rem 4rem;
              //  order item styles
              .customer-name {
                font-size: 14px;
                line-height: 14px;
                font-weight: 500;
                color: #A6AEBE;
                opacity: 0.6;
              }
              .order-card {
                border-radius: 10px;
                border: 1px solid #439AA1;
                margin: 10px 0 20px;
                padding: 2rem;
                .order-item {
                  .name-price {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .item-name, .item-price {
                      font-size: 16px;
                      line-height: 25px;
                      font-weight: 500;
                      color: #3E3E3E;
                    }
                  }
                  .quantity {
                    font-size: 16px;
                    line-height: 25px;
                    font-weight: 500;
                    color: #3E3E3E;
                    text-align: right;
                  }

                  .attributes {
                    font-size: 12px;
                    line-height: 22px;
                    display: flex;
                    margin-top: 10px;
                    .property {
                      color: #454F63;
                      flex-basis: 20%;
                    }

                    .value {
                      color: #B4BBC9;
                      flex-basis: 80%;
                      .attribute-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      }
                    }
                  }

                  .subtotal {
                    padding-top: 10px;
                    margin-top: 1rem;
                    border-top: 1px solid #439AA1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 16px;
                    line-height: 25px;
                    font-weight: 500;
                    color: #3E3E3E;
                  }
                }
              }
            }

            .confirm-payment-modal {
              padding: 2rem 4rem 0;
              .customer-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
                .customer-detail {
                  display: flex;
                  flex-basis: 60%;
                  .customer-avatar {
                    width: 48px;
                    height: 48px;
                    overflow: hidden;
                    border-radius: 48px;
                    margin-right: 15px;
                    img {
                      width: 100%;
                    }
                  }
                  .name-amount {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .name {
                      font-size: 16px;
                      line-height: 25px;
                      font-weight: 500;
                      margin-bottom: 0;
                      color: #454F63;
                    }
                    .amount {
                      font-size: 12px;
                      line-height: 18px;
                      color: #454F63;
                      opacity: 0.6;
                      margin-top: -2px;
                    }
                  }
                }

                .payment-status {
                  display: flex;
                  align-items: center;
                  font-size: 14px;
                  line-height: 21px;
                  img {
                    margin-left: 10px;
                  }
                }
              }

              .customer-row.paid {
                .customer-detail {
                  .customer-avatar {
                    border: 2px solid #449AA3;
                  }
                }
                .payment-status {
                  span {
                    color: #454F63;
                    opacity: 0.6;
                  }
                }
              }

              .customer-row.decided {
                .payment-status {
                  span {
                    color: #44A377;
                  }
                }
              }

              .customer-row.undecided {
                .payment-status {
                  span {
                    color: #FF6969;
                  }
                }
              }

              .btn.btn-brand-styled-bordered {
                text-transform: none;
                display: block;
                width: 70%;
                margin: 0 auto;
              }
            }


            .notify-modal {
              padding: 2rem 4rem 0;
              .status {
                font-size: 15px;
                color: #454F63;
                label[for] {
                  margin-bottom: 0;
                }

                label.radio-brand,
                label.radio-brand-red {
                  vertical-align: sub;
                  margin-right: 10px;
                }
              }

              .status + .status {
                margin-top: 1.5rem;
              }

              .btn.btn-brand-styled-bordered {
                text-transform: none;
                display: block;
                width: 70%;
                margin: 2rem auto 0;
              }
            }

            .invoice-modal {
              .restaurant-info {
                .name {
                  font-size: 20px;
                  line-height: 30px;
                  font-weight: 500;
                  color: #454F63;
                  text-align: center;
                }
                .address {
                  font-size: 15px;
                  line-height: 23px;
                  color: #A6AEBE;
                  text-align: center;
                }
              }

              .invoice-info {
                border-top: 1px solid #439AA1;
                border-bottom: 1px solid #439AA1;
                padding: 5px 0;
                font-size: 14px;
                line-height: 25px;
                font-weight: 500;
                color: #454F63;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 25px;
                .invoice-no {
                  text-align: right;
                }
              }

              .customer-detail {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .customer-paid-via {
                  font-size: 14px;
                  line-height: 14px;
                  font-weight: 500;
                  color: #A6AEBE;
                  opacity: 0.6;
                }
              }

              .payment-details {
                font-size: 16px;
                line-height: 28px;
                font-weight: 500;
                color: #3E3E3E;
                border-top: 1px solid #439AA1;
                border-bottom: 1px solid #439AA1;
                padding: 15px 0;
                margin-top: 30px;
                .pay-type, .via-card, .via-cash {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                }
              }

              .totals {
                font-size: 16px;
                line-height: 28px;
                font-weight: 500;
                color: #3E3E3E;
                padding: 15px 0;
                margin-top: 5px;
                .subtotal, .tax, .total {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                }

                .total {
                  padding-top: 10px;
                  margin-top: 10px;
                  border-top: 1px solid #439AA1;
                }
              }

              .print {
                font-size: 16px;
                line-height: 20px;
                font-weight: 500;
                color: #439AA1;
                background-color: #ECF5F6;
                border-radius: 40px;
                margin-top: 2rem;
                padding: 0.6rem .75rem;
                &:focus {
                  outline: 0;
                  box-shadow: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
html[dir='rtl'] {
  body {
    text-align: right;
  }
  select.brand-select {
    padding: 5px 10px 5px 30px;
    background-position: 10px center;
  }
  label.checkbox-brand-circle {
    margin: 0 10px 0 0;
  }
  .welcome-page {
    .welcome {
      h2, p {
        padding: 0 12rem 0 6rem;
      }
    }
    .signin-form, .signup-form, .forgot-pass-form, .verify-code-form, .reset-pass-form {
      .error {
        left: auto;
        right: 20px;
      }
      footer {
        padding : 2rem 12rem 2rem 11rem;
      }
    }
  }
  main.dashboard {
    .order-box {
      .order-card {
        .order-item {
          .quantity {
            text-align: left;
          }
        }
        .order-type-icon {
          left: auto;
          right: 1.5rem;
        }
      }
      .order-card.new {
        &:before {
          left: auto;
          right: 0;
        }
      }
    }
    .modal {
      .modal-dialog {
        .custom-row {
          .modal-content {
            .modal-body {
              .confirm-payment-modal {
                .customer-row {
                  .customer-detail {
                    .customer-avatar {
                      margin-left: 15px;
                      margin-right: 0;
                    }
                  }
                  .payment-status {
                    img {
                      margin-left: 0;
                      margin-right: 10px;
                    }
                  }
                }
              }
              .notify-modal {
                .status {
                  label.radio-brand, label.radio-brand-red {
                    margin-left: 10px;
                    margin-right: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script>
import axios from 'axios';
import config from './config';

export default {
  name: 'App',
  data() {
    return {
      authKeys: JSON.parse(window.localStorage.getItem('kol_keys')),
      lang: '',
    };
  },
  methods: {
    redirectToSignIn() {
      if (this.$route.fullPath !== '/signin') {
        this.$router.push({ path: '/signin' });
      }
    },
    refreshToken() {
      const that = this;
      if (JSON.parse(window.localStorage.getItem('kol_keys')) === null) {
        this.redirectToSignIn();
      } else {
        axios({
          method: 'post',
          url: `${config.base_url}auth/api-token-refresh/`,
          data: {
            refresh: that.authKeys.refresh,
          },
        }).then((response) => {
          if (response.status === 200) {
            this.$store.commit('updateAuthData', response.data);
            window.localStorage.setItem('kol_keys', JSON.stringify(response.data));
          }
        }).catch(() => {
          this.redirectToSignIn();
        });
      }
    },
    setLocale() {
      const language = window.localStorage.getItem('kol_user_lang');
      if (language === 'en' || language === null) {
        window.document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        window.localStorage.setItem('kol_user_lang', 'en');
        this.lang = 'en';
      } else {
        window.document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        window.localStorage.setItem('kol_user_lang', 'ar');
        this.lang = 'ar';
      }
    },
  },
  mounted() {
    this.refreshToken();
    this.setLocale();
  },
};
</script>
