<template>
  <div class="brand-navbar">
    <ul class="navbar-left">
      <li class="active">
        <router-link :to="{ path: '/dashboard' }">
          {{strings.manage_order[lang]}} <span class="count">01</span>
        </router-link>
      </li>
      <li class="has-submenu" v-bind:class="{ open : activeRoute === '/tables'}">
        <router-link :to="{ path: '/profile' }" exact>{{strings.manage_profile[lang]}}
          <span class="dropdown-arrow" v-on:click="toggleSubmenu($event)">
            <img src="@/assets/images/icons/icon-arrow-down-teal.svg"
                 v-if="activeRoute !== '/profile'">
            <img src="@/assets/images/icons/icon-arrow-down-white.svg"
            v-if="activeRoute === '/profile'">
          </span>
        </router-link>
      </li>
      <ul class="submenu">
        <li>
          <router-link :to="{ path: '/tables' }" exact>{{strings.manage_table[lang]}}</router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>

<style lang="less">
  .brand-navbar {
    position: fixed;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 260px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    padding: 1rem 1rem 0 0;
    z-index: 2000;
    .navbar-left {
      margin-top: 2rem;
      margin-bottom: 0;
      li {
        font-size: 15px;
        line-height: 23px;
        color: #fff;
        a {
          padding: 1rem 2rem;
          border-radius: 0 30px 30px 0;
          display: block;
          color: #449AA3;
          position: relative;
          &:hover, &:focus, &:active {
            color: #449AA3;
            text-decoration: none;
          }

          span {
            position: absolute;
            top: 12px;
            right: 30px;
            width: 30px;
            height: 30px;
            border-radius: 30px;
            text-align: center;
            line-height: 30px;
          }

          .count {
            background-color: #449AA3;
            color: #fff;
          }
        }
        a.active {
          background: rgb(68,154,163);
          background: linear-gradient(0deg, rgba(68,154,163,1) 0%, rgba(78,186,197,1) 100%);
          color: #fff;
          &:hover, &:focus, &:active {
            color: #fff;
            text-decoration: none;
          }

          .count {
            color: #449AA3;
            background-color: #fff;
          }
        }
      }

      li.has-submenu + ul.submenu {
        height: 0;
        overflow: hidden;
        li {
          a {
            padding: 1rem 1rem 1rem 3rem;
          }
        }
      }

      li.has-submenu.open + ul.submenu {
        height: auto;
      }

      li + li {
        margin-top: 1rem;
      }
    }
  }

  html[dir='rtl'] {
    .brand-navbar {
      left: auto;
      right: 0;
      padding: 1rem 0 0 1rem;
      .navbar-left {
        li {
          a {
            border-radius: 30px 0 0 30px;
            text-align: right;
            span {
              left: 30px;
              right: auto;
            }
          }
        }

        li.has-submenu + ul.submenu {
          li {
            a {
              padding: 1rem 3rem 1rem 1rem;
            }
          }
        }
      }
    }
  }

  // tablet or mobile support
  @media screen and (max-width: 1024px){
    .brand-navbar {
      width: 220px;
    }
  }
</style>

<script>
import Bootstrap from 'bootstrap';
import locales from '../locales';

export default {
  name: 'Navbar',
  component: {
    Bootstrap,
  },
  data() {
    return {
      activeRoute: this.$route.fullPath,
      lang: window.localStorage.getItem('kol_user_lang'),
      strings: locales,
    };
  },
  methods: {
    toggleSubmenu(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.closest('li.has-submenu').classList.contains('open')) {
        e.target.closest('li.has-submenu').classList.remove('open');
      } else {
        e.target.closest('li.has-submenu').classList.add('open');
      }
    },
  },
};
</script>
