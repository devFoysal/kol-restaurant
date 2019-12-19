<template>
  <header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 header-contents-container">
          <router-link to="/" class="logo">
            <img src="@/assets/kol-logo.svg" />
          </router-link>

          <div class="ac-actions">
            <div class="notification" v-on:click="toggleNotifications($event)">
              <img v-if="!hasNewNotification" src="@/assets/images/icons/icon-bell.svg" />
              <img v-if="hasNewNotification" src="@/assets/images/icons/icon-bell-notify.svg" />
              <div class="notification-box" v-on:click="preventSelfClickClose($event)">
                <h5 class="n-title">{{strings.notifications[lang]}}</h5>
                <div class="notification-scroll">
                  <div class="n-item new">
                    <div class="content">Hey, You just received new order from Table A1</div>
                    <div class="time">Just Now</div>
                  </div>
                  <div class="n-item">
                    <div class="content">Hey, You just received new order from Home</div>
                    <div class="time">6min ago</div>
                  </div>
                  <div class="n-item">
                    <div class="content">
                      Hey, You just received new order from Home
                      and two line example
                    </div>
                    <div class="time">1h ago</div>
                  </div>
                  <div class="n-item">
                    <div class="content">Hey, You just received new order from Table B7</div>
                    <div class="time">2d 6h ago</div>
                  </div>
                  <div class="n-item">
                    <div class="content">Congratulation!. Your account just activated.</div>
                    <div class="time">2d 6h ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="account" v-on:click="toggleProfileMenus($event)">
              <img class="profile-avatar" v-if="user.profile_picture" :src="user.profile_picture" />
              <img
                class="profile-avatar"
                v-if="!user.profile_picture"
                src="@/assets/images/default-user-profile.png"
              />
              <img class="dropdown-arrow" src="@/assets/images/icons/icon-arrow-down.svg" />

              <div class="account-box" v-on:click="preventSelfClickClose($event)">
                <div class="status">
                  {{strings.active_stat[lang]}} :
                  <label class="checkbox-brand">
                    <input
                      type="checkbox"
                      v-bind:checked="userIsPublic"
                      v-bind:disabled="!userIsPublic"
                    />
                    <span class="checkbox-brand-outer">
                      <span class="checkbox-brand-inner"></span>
                    </span>
                  </label>
                </div>
                <a href="#" class="hotline">{{strings.hotline[lang]}} +995&nbsp;87629868</a>
                <ul class="profile-links">
                  <li v-if="userIsPublic">
                    <router-link :to="{ path: '/profile' }">{{strings.profile[lang]}}</router-link>
                  </li>
                  <li v-if="lang === 'en'">
                    <a v-on:click="switchLocaleToArabic()">اللغة العربية</a>
                  </li>
                  <li v-if="lang === 'ar'">
                    <a v-on:click="switchLocaleToEnglish()">English</a>
                  </li>
                  <li v-if="userIsPublic">
                    <router-link :to="{ path: '/tickets' }">{{strings.raise_ticket[lang]}}</router-link>
                  </li>
                  <li>
                    <a v-on:click="logOut($event)">{{strings.logout[lang]}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2500;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
  padding: 1.3rem 2rem;

  .header-contents-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      display: inline-block;
      img {
        max-width: 80px;
      }
    }

    .ac-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .notification {
        border-right: 2px solid #ebebf2;
        padding-right: 15px;
        margin-right: 10px;
        position: relative;
        cursor: pointer;
        .notification-box {
          position: absolute;
          display: none;
          background-color: #fff;
          top: 70px;
          right: -30px;
          width: 460px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
          cursor: default;
          &:before {
            content: "";
            display: inline-block;
            position: absolute;
            width: 14px;
            height: 14px;
            top: -7px;
            right: 50px;
            background-color: #fff;
            transform: rotate(45deg);
            box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.06);
          }
          .n-title {
            padding: 1.5rem 0;
            font-weight: 300;
            text-align: center;
            font-size: 17px;
            line-height: 12px;
            color: #4d4f5c;
            margin-bottom: 0;
          }

          .notification-scroll {
            max-height: 280px;
            overflow-y: scroll;
            .n-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background-color: #fafafa;
              padding: 1rem 1.5rem;
              line-height: 18px;
              color: #454f63;
              border-top: 1px solid #f1f1f3;
              cursor: pointer;
              &.new,
              &:hover {
                background-color: #ecf5f6;
              }
              .content {
                font-size: 12px;
                max-width: 85%;
                padding-right: 15px;
              }

              .time {
                font-size: 11px;
                opacity: 0.8;
                text-align: right;
              }
            }
          }
        }
      }

      .account {
        cursor: pointer;
        position: relative;

        .profile-avatar {
          width: 38px;
          margin-right: 5px;
        }

        .dropdown-arrow {
          width: 10px;
        }

        .account-box {
          position: absolute;
          display: none;
          background-color: #fff;
          top: 77px;
          right: 0;
          width: 270px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
          border-radius: 6px;
          cursor: default;
          padding: 2rem 0 0;
          &:before {
            content: "";
            display: inline-block;
            position: absolute;
            width: 14px;
            height: 14px;
            top: -7px;
            right: 30px;
            background-color: #fff;
            transform: rotate(45deg);
            box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.06);
          }

          .status {
            padding: 0 1rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4d565c;
            font-size: 15px;
            line-height: 24px;
            border-bottom: 1px solid rgba(180, 187, 201, 0.42);
            margin: 0 1rem;
            label.checkbox-brand {
              line-height: 0;
              margin-left: 1rem;
            }
          }

          .hotline {
            display: block;
            background-color: #ecf5f6;
            border-radius: 40px;
            padding: 8px;
            text-align: center;
            font-size: 18px;
            line-height: 27px;
            margin: 1rem 1rem 0;
            color: #449aa3;
            &:hover,
            &:focus,
            &:active {
              color: #449aa3;
              text-decoration: none;
            }
          }

          .profile-links {
            list-style: none;
            text-align: center;
            margin-bottom: 0;
            li {
              font-size: 15px;
              line-height: 24px;
              color: #4d565c;
              background: rgba(68, 154, 163, 0);
              background: linear-gradient(
                0deg,
                rgba(68, 154, 163, 0) 0%,
                rgba(78, 186, 197, 0) 100%
              );
              transition: 0.3s ease-in-out;
              cursor: pointer;
              margin-top: 0.5rem;
              a {
                padding: 0.7rem 0;
                color: #4d565c;
                display: block;
                &:hover {
                  color: #4d565c;
                  text-decoration: none;
                }
              }

              &:hover {
                //opacity: 1;
                background: rgba(68, 154, 163, 1);
                background: linear-gradient(
                  0deg,
                  rgba(68, 154, 163, 1) 0%,
                  rgba(78, 186, 197, 1) 100%
                );
                a {
                  color: #fff;
                  &:hover {
                    color: #fff;
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

html[dir="rtl"] {
  header {
    .header-contents-container {
      .ac-actions {
        .notification {
          border-right: 0;
          border-left: 2px solid #ebebf2;
          padding-right: 0;
          padding-left: 15px;
          margin-right: 0;
          margin-left: 10px;
          .notification-box {
            left: -30px;
            right: auto;
            &:before {
              left: 50px;
              right: auto;
            }
            .notification-scroll {
              .n-item {
                .content {
                  padding-right: 0;
                  padding-left: 15px;
                  text-align: right;
                }
                .time {
                  text-align: left;
                }
              }
            }
          }
        }
        .account {
          .profile-avatar {
            margin-left: 5px;
            margin-right: 0;
          }
          .account-box {
            right: auto;
            left: 0;
            &:before {
              left: 30px;
              right: auto;
            }

            .status {
              label.checkbox-brand {
                margin-right: 1rem;
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
import locales from "../locales";
import getFCMMessage from "../helper";
export default {
  name: "Header",
  data() {
    return {
      user: JSON.parse(window.localStorage.getItem("kol_user")),
      userIsPublic: JSON.parse(window.localStorage.getItem("kol_user_public")),
      hasNewNotification: false,
      lang: window.localStorage.getItem("kol_user_lang"),
      strings: locales
    };
  },
  methods: {
    checkUserData() {
      if (this.user === null || this.userIsPublic === null) {
        this.$router.push({ path: "/signin" });
      } else {
        this.$store.commit(
          "updateUser",
          JSON.parse(window.localStorage.getItem("kol_user"))
        );
        this.$store.commit(
          "updateUserStatus",
          JSON.parse(window.localStorage.getItem("kol_user_public"))
        );
      }
    },
    toggleNotifications(event) {
      if (this.userIsPublic) {
        event.stopPropagation();
        const accountBox = document.getElementsByClassName("account-box")[0];
        accountBox.style.display = "none";
        const notificationBox = document.getElementsByClassName(
          "notification-box"
        )[0];
        if (
          notificationBox.style.display === "none" ||
          notificationBox.style.display === ""
        ) {
          notificationBox.style.display = "block";
        } else {
          notificationBox.style.display = "none";
        }
      }
    },
    toggleProfileMenus(event) {
      event.stopPropagation();
      const notificationBox = document.getElementsByClassName(
        "notification-box"
      )[0];
      notificationBox.style.display = "none";
      const accountBox = document.getElementsByClassName("account-box")[0];
      if (
        accountBox.style.display === "none" ||
        accountBox.style.display === ""
      ) {
        accountBox.style.display = "block";
      } else {
        accountBox.style.display = "none";
      }
    },
    closeDropdown() {
      const notificationBox = window.document.getElementsByClassName(
        "notification-box"
      )[0];
      const accountBox = window.document.getElementsByClassName(
        "account-box"
      )[0];
      notificationBox.style.display = "none";
      accountBox.style.display = "none";
    },
    preventSelfClickClose(event) {
      event.stopPropagation();
    },
    logOut(event) {
      event.preventDefault();
      window.localStorage.removeItem("kol_keys");
      this.$router.push({ path: "/signin" });
    },
    switchLocaleToArabic() {
      window.localStorage.setItem("kol_user_lang", "ar");
      this.lang = "ar";
      window.document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", "rtl");
      window.location.reload();
    },
    switchLocaleToEnglish() {
      window.localStorage.setItem("kol_user_lang", "en");
      this.lang = "en";
      window.document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", "ltr");
      window.location.reload();
    }
  },
  mounted() {
    console.log("header notification", getFCMMessage);
    this.checkUserData();
    window.addEventListener("click", this.closeDropdown);
  },
  destroyed() {
    window.removeEventListener("click", this.closeDropdown);
  }
};
</script>
