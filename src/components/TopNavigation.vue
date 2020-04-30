<template>
  <nav class="navbar navbar-expand-lg bg-transparent">
    <a class="navbar-brand" href="/">
      <img src="http://www.findmyroof.com/static/images/find-my-roof.png" />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-if="activity === 'browsing'">
          <state-selector />
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end" v-if="!isLoggedIn">
        <li class="nav-item">
          <router-link class="nav-link" to="/account/register">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/account/login">Log in</router-link>
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end" v-if="(activity === 'browsing' || activity === 'account') && isLoggedIn">
        <li class="nav-item" v-if="!isVerified">
          <router-link class="nav-link" :class="{disabled : $route.path ==='/account/verify'}" to="/account/verify">Verify your account</router-link>
        </li>
        <li class="nav-item" v-if="isVerified">
          <router-link class="nav-link" :class="{disabled : $route.path ==='/placead'}" to="/placead">Place an ad</router-link>
        </li>
        <li class="nav-item" v-if="isVerified">
          <router-link class="nav-link" :class="{disabled : $route.path ==='/account/myads'}" to="/account/myads">My ads</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :class="{disabled : $route.path ==='/account/settings'}" to="/account/settings">Settings</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:;" v-on:click="logout()">Log out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import StateSelector from "./StateSelector"
import AppContext from './AppContext'
import AccountService from '../service/AccountService'

export default {
  data() {
    return {
      activity: AppContext.activity(this.$route),
      isLoggedIn: AccountService.currentUser().id > 0,
      isVerified: AccountService.currentUser().isVerified(),
      verificationSent: AccountService.currentUser().verificationCodeSent()
    }
  },
  components: {
    StateSelector
  },
  beforeMount() {
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
      AccountService.logout()
      window.location = '/'
    }
  },
  watch: {
    '$route.path': function() {
        this.forceLogin()
    }
  }
};
</script>