<template>
  <div class="fmr-bordered-area">
    <message />
    <div class="header">
      <h1>Account login</h1>
    </div>
    <div class="fmr-form mt-2 p-2 col-lg-6 offset-lg-3">
      <form v-on:submit.prevent>
        <div class="border-bottom lead pl-1 mb-4">
          Login to your account
        </div>
        <div class="form-group pl-1">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group pl-1">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="form-group pl-1">
          <a href="javascript:" @click="$router.push({name: 'RequestPasswordReset'})" tabindex="-1">I lost my password</a>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-primary" v-on:click="login()" :disabled="posting">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from '../Message'
import AccountService from '../../service/AccountService'
import EventManager from '../../util/EventManager'
import AppEvent from '../../util/AppEvent'

export default {
  components: {
    Message
  },
  data() {
    return {
      email: '',
      password: '',
      posting: false
    }
  },
  mounted() {
    AccountService.serviceCheck()
  },
  methods: {
    login() {
      const self = this
      self.posting = true
      AccountService.login(this.email, this.password)
      .then((user) => {
        console.log(user)
        if (user.isVerified()) {
          if (self.$route.query['returnUrl']) {
            window.location.href = self.$route.query['returnUrl']
          } else {
            window.location.href = '/account/myads'
          }
        } else {
          window.location.href = '/account/verify'
        }
      })
      .catch((error) => {
        console.error(error)
        EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
        self.posting = false
      })
    }
  }
}
</script>