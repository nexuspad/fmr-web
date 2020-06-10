<template>
  <div>
    <message />
    <div class="fmr-bordered-area" v-if="$route.path == '/account/requestpasswordreset'">
      <div class="header">
        <h1>Password reset</h1>
      </div>
      <div class="p-2">
        <div class="fmr-form p-2 col-lg-6 offset-lg-3">
          <div class="border-bottom lead pl-1 mb-4">
            Request password reset
          </div>
          <div class="form-group pl-1">
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
          <div class="border-bottom lead pl-1 mb-4">
            Enter your new password below
          </div>
          <div class="form-group pl-1">
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
  mounted() {
    this.key = this.$route.query.key
  },
  methods: {
    requestPasswordReset() {
      const self = this
      self.posting = true
      AccountService.resetPasswordRequest(this.email)
      .then(() => {
        self.posting = false
        EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.ACCOUNT_REQUEST_RESET_PASSWORD_SUCCESS, "Your request has been received. Please check your inbox for further instructions."))
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
        EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.ACCOUNT_RESET_PASSWORD_SUCCESS, "Your password has been successfully changed."))
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