<template>
  <div class="fmr-bordered-area">
    <message />
    <div class="header">
      <h1>Free registration</h1>
    </div>
    <div class="fmr-form mt-2 p-2 col-lg-6 offset-lg-3">
      <form v-on:submit.prevent>
        <div class="border-bottom lead bg-light pl-1 mb-4">
          Create a new account
        </div>
        <div class="form-group pl-1">
          <label for="email" class="required">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group pl-1">
          <label for="password" class="required">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="form-group pl-1">
          <label for="confirmPassword" class="required">Confirm password</label>
          <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
        </div>
        <div class="form-group pl-1">
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="agreeTos" v-model="agreeToTos">
            <span class="form-check-label" for="agreeTos">
              Check here to indicate that you have read and agree to the Terms of use
              and Privacy policy.
            </span>
          </div>
        </div>
        <div class="form-group text-center">
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
        return
      }

      AccountService.register(this.email, this.password)
      .then(() => {})
      .catch((error) => {
        EventManager.publishApiEvent(AppEvent.ofApiFailure(error))
      })
    }
  }
}
</script>