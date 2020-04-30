<template>
  <div>
    <message />
    <div class="fmr-bordered-area" v-if="$route.path == '/account/requestpasswordreset'">
      <div class="header">
        <h1>Request password reset</h1>
      </div>
      <div class="p-2">
        <div class="fmr-form p-2 col-lg-6 offset-lg-3">
          <div class="border-bottom lead bg-light mb-4">
            Please enter your account email address below and click on "Request password reset" button. You will receive instructions on how to reset your password.
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
          </div>
          <div class="form-group text-center">
            <button class="btn btn-primary" v-on:click="requestPasswordReset()" :disabled="posting">Request password reset</button>
          </div>
        </div>
      </div>
    </div>
    <div class="fmr-bordered-area" v-if="$route.path == '/account/resetpassword'">
      <div class="header">
        <h1>Reset password</h1>
      </div>
      <div class="p-2">
        <div class="fmr-form p-2 col-lg-6 offset-lg-3">
          <div class="border-bottom lead bg-light mb-4">
            Enter your new password below
          </div>
          <div class="form-group">
            <label for="password">New password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="form-group text-center">
            <button class="btn btn-primary" v-on:click="resetPassword()" :disabled="posting">Reset password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../Message'
import AccountService from '../../service/AccountService'
import EventManager from '../../util/EventManager'
import AppEvent from '../../util/AppEvent'

export default {
  data() {
    return {
      email: '',
      key: '',
      password: '',
      posting: false
    }
  },
  components: {
    Message
  },
  methods: {
    requestPasswordReset() {
      const self = this
      self.posting = true
      AccountService.resetPasswordRequest(this.email)
      .then(() => {
        self.posting = false
      })
      .catch((error) => {
        console.error(error)
        EventManager.publishApiEvent(AppEvent.ofApiFailure(error))
        self.posting = false
      })
    },
    resetPassword() {
      const self = this
      self.posting = true
      AccountService.resetPassword(this.key, this.password)
      .then(() => {
        self.posting = false
      })
      .catch((error) => {
        console.error(error)
        EventManager.publishApiEvent(AppEvent.ofApiFailure(error))
        self.posting = false
      })
    }
  }
}
</script>