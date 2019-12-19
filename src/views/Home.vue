<template>
  <div class="splash">
    <img alt="kol-logo" class="kol-logo" src="@/assets/kol-logo.svg">
  </div>
</template>

<style lang="less">
.splash {
  min-height: 100vh;
  background-image: url("~@/assets/images/splash-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right bottom;
  position: relative;

  .kol-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 190px;
    transform: translate(-50%, -50%);
  }
}
</style>

<script>
export default {
  name: 'Home',
  methods: {
    redirectToSignIn() {
      setTimeout(() => {
        this.$router.push({ path: '/signin' });
      }, 1500);
    },
  },
  mounted() {
    this.redirectToSignIn();
  },
};
</script>
