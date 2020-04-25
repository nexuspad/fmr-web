<template>
  <div class="fmr-bordered-area">
    <message />
    <div class="header">
      <h1>Register an account</h1>
    </div>
    <div class="p-2">
      <form v-on:submit.prevent>
        <div class="form-group col-lg-6">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group col-lg-6">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="form-group col-lg-6">
          <label for="password">Confirm password</label>
          <input type="password" class="form-control" id="password" v-model="confirmPassword">
        </div>
        <div class="form-group col-lg-6">
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="agreeTos" v-model="agreeToTos">
            <label class="form-check-label" for="agreeTos">I have read and agree to the Terms of Use and Privacy Policy.</label>
          </div>
        </div>
        <div class="form-group col-lg-6">
          <button class="btn btn-primary" v-on:click="register($event)" :disabled="posting">Register</button>
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
      confirmPassword: '',
      agreeToTos: false,
      posting: false
    }
  },
  beforeMount() {
    const self = this
    AccountService.getToken().then((token) => {
      if (token) {
          self.isLoggedIn = true
      } else {
          self.isLoggedIn = false
      }
    })
  },
  methods: {
    register() {
      if (!this.email) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.ACCOUNT_REGISTRATION_FAILURE, "Missing email address."))
        return
      }

      if (this.password !== this.confirmPassword) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.ACCOUNT_REGISTRATION_FAILURE, "Passwords don't match."))
        return
      }

      if (!this.agreeToTos) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.ACCOUNT_REGISTRATION_FAILURE, "You must agree to our Terms of Use and Privacy policies."))
      }
    }
  }
}
</script>