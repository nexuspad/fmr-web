<template>
  <nav class="navbar navbar-expand-lg bg-transparent">
    <a class="navbar-brand" :href="homePath">
      <img src="@/assets/images/findmyroof.png" />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#AccountNav"
      aria-controls="AccountNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="AccountNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-if="activity === 'browsing'">
          <state-selector />
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end" v-if="!isLoggedIn">
        <li class="nav-item">
          <router-link class="nav-link" :class="{disabled: $route.path ==='/account/register'}" to="/account/register">
            Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :class="{disabled: $route.path ==='/account/login'}" to="/account/login">
            Log In
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end" v-if="(activity === 'browsing' || activity === 'account') && isLoggedIn">
        <li class="nav-item" v-if="!isVerified">
          <router-link class="nav-link" :class="{disabled: $route.path ==='/account/verify'}" to="/account/verify">Verify Your Account</router-link>
        </li>
        <li class="nav-item" v-if="isVerified">
          <router-link class="nav-link" :class="{disabled: $route.path ==='/placead'}" to="/placead">Place an Ad</router-link>
        </li>
        <li class="nav-item" v-if="isVerified">
          <router-link class="nav-link" :class="{disabled: $route.path ==='/account/myads'}" to="/account/myads">My Ads</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :class="{disabled: $route.path ==='/account/settings'}" to="/account/settings">Settings</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:;" v-on:click="logout()">Log Out</a>
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end" v-if="(activity === 'editing') && isLoggedIn">
        <li class="nav-item" v-if="isVerified">
          <router-link class="nav-link" :class="{disabled : $route.path ==='/account/myads'}" to="/account/myads">My Ads</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import StateSelector from "./StateSelector"
import AccountService from '../service/AccountService'
import AppContext from './AppContext';

export default {
  data() {
    return {
      homePath: '/',
      activity: this.$route.meta.activity ? this.$route.meta.activity : 'browsing',
      isLoggedIn: AccountService.currentUser().id > 0,
      isVerified: AccountService.currentUser().isVerified(),
      verificationSent: AccountService.currentUser().verificationCodeSent()
    }
  },
  components: {
    StateSelector
  },
  beforeMount() {
    let {path} = AppContext.makePath({categoryId: 0})
    this.homePath = path
    const self = this
    AccountService.getToken().then((token) => {
      if (token) {
        self.isLoggedIn = true
        self.isVerified = AccountService.currentUser().isVerified()
        self.verificationSent = AccountService.currentUser() && AccountService.currentUser().verificationCodeSent()

        if (self.$router.currentRoute.meta.redirectIfLoggedIn) {
          self.$router.push('/account/myads')
        }
      } else {
        self.isLoggedIn = false
        self.forceLogin()
      }
    })
    .catch(() => {
      self.isLoggedIn = false
      self.forceLogin()
    })
  },
  methods: {
    forceLogin() {
      if (this.$router.currentRoute.meta.requiresAuth) {
        AccountService.forceLogin({checkAuth: true, returnUrl: this.$route.path})
      }
    },
    logout() {
      AccountService.logout().then(() => {
        window.location = '/'
      })
      .catch(() => {
        window.location = '/'
      })
    }
  },
  watch: {
    '$route.path': function() {
      const {path} = AppContext.makePath({categoryId: 0})
      this.homePath = path
      this.forceLogin()
      this.activity = this.$route.meta.activity ? this.$route.meta.activity : 'browsing'
    }
  }
};
</script>