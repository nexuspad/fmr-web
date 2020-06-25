<template>
  <div>
    <login fromRegistration="true" v-if="registrationSuccess" />
    <div class="fmr-bordered-area" v-if="!registrationSuccess">
      <message />
      <div class="header">
        <h1>Registration</h1>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="fmr-form mt-2 p-2 col-md-6 offset-md-3">
            <form v-on:submit.prevent>
              <div class="border-bottom lead pl-1 mb-4">
                Create an account
              </div>
              <div class="form-group pl-1">
                <label for="email" class="required">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email">
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
                    Check here to indicate that you have read and agree to the 
                    <a href="/site/termsofservice" target="_blank">Terms of Service</a>
                    and <a href="/site/privacypolicy" target="_blank">Privacy Policy</a>.
                  </span>
                </div>
              </div>
              <div class="form-group text-center">
                <button class="btn btn-primary" v-on:click="register($event)" :disabled="posting">Register</button>
              </div>
            </form>
          </div>
          <div class="col-md-3 pt-4 order-lg-2 order-md-2">
            <div class="sticky m-2">
              <ul class="pl-4">
                <li>Posting on FindMyRoof.com is free with a valid account.</li>
                <li>To complete new account registration, a one-time text verification is required.
                  Standard carrier charges may apply.</li>
                <li>The service is limited to properties in U.S. only.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../Message'
import Login from './Login'
import AccountService from '../../service/AccountService'
import EventManager from '../../util/EventManager'
import AppEvent from '../../util/AppEvent'

export default {
  components: {
    Message, Login
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTos: false,
      registrationSuccess: false,
      posting: false
    }
  },
  mounted() {
    AccountService.serviceCheck()
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
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.ACCOUNT_REGISTRATION_FAILURE, "You must agree to our Terms of Use and Privacy Policies."))
        return
      }

      const self = this
      AccountService.register(this.email, this.password)
      .then(() => {
        self.registrationSuccess = true
      })
      .catch((error) => {
        EventManager.publishApiEvent(AppEvent.ofApiFailure(error))
      })
    }
  }
}
</script>