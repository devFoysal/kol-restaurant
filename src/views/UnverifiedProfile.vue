<template>
  <div>
    <Header></Header>
    <main class="profile-unverified">
      <div class="consideration-message">
        <p>
          {{strings.account_considered[lang]}}
        </p>
        <a href="#" class="btn btn-block btn-brand-styled-bordered"><span>+995 786298689</span></a>
      </div>
    </main>
  </div>
</template>

<style lang="less">
  main.profile-unverified {
    position: relative;
    min-height: 100vh;
    background-image: url("~@/assets/images/pending-dashboard.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    .consideration-message {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      width: 440px;
      p {
        font-size: 24px;
        line-height: 35px;
        color: #fff;
        text-align: center;
        margin-bottom: 40px;
      }

      .btn-brand-styled-bordered {
        width: 70%;
        margin: 0 auto;
        background-color: #5cb3bc;
        color: #fff;
        border-color: #fff;

        &:before, &:after {
          background-color: #5cb3bc;
        }

        span {
          &:before {
            content: '';
            display: inline-block;
            position: absolute;
            left: -25px;
            top: 2px;
            height: 16px;
            width: 16px;
            background-image: url("~@/assets/images/icons/icon-phone-w.svg");
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
</style>

<script>
import Header from '@/components/Header.vue';
import locales from '../locales';

export default {
  name: 'UnverifiedProfile',
  components: {
    Header,
  },
  data() {
    return {
      lang: window.localStorage.getItem('kol_user_lang'),
      strings: locales,
    };
  },
};
</script>
