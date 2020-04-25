<template>
  <div class="fmr-bordered-area">
    <message />
    <div class="header">
      <h1>Settings</h1>
    </div>
    <div class="fmr-form p-4">
      <h2>Update password</h2>
      <hr/>
      <div class="ml-2">
        <div class="form-row">
          <div class="col-md-4">
            <label for="password">Current password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4">
            <label for="password">New password</label>
            <input type="password" class="form-control" id="newPassword" v-model="newPassword">
          </div>
          <div class="col-md-4">
            <label for="password">Confirm the new password</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
          </div>
        </div>
        <div class="form-row mt-2">
          <div class="col">
            <button class="btn btn-primary" v-on:click="changePassword()" :disabled="posting">Update</button>
          </div>
        </div>
      </div>

      <h2 class="mt-4">Remove my account</h2>
      <hr/>
      <div class="ml-2">
        <div class="form-row">
          <div class="col-md-4">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="passwordRemoveAccount" v-model="passwordRemoveAccount">
          </div>
        </div>
        <div class="form-row mt-3 mb-3 ml-1">
          <input type="checkbox" class="mt-1 mr-1" />
          I want to remove my account and all my ads.
        </div>
        <div class="form-row mt-2">
          <div class="col">
            <button class="btn btn-danger" v-on:click="removeAccount()" :disabled="posting">Remove my acount</button>
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
      password: '',
      newPassword: '',
      confirmPassword: '',
      passwordRemoveAccount: '',
      posting: false
    }
  },
  components: {
    Message
  },
  methods: {
    changePassword() {
      if (!this.password) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.ACCOUNT_PASSWORD_UPDATE_FAILURE, "Missing current password."))
        return
      }

      if (this.newPassword != this.confirmPassword) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.ACCOUNT_PASSWORD_UPDATE_FAILURE, "New passwords don't match."))
        return
      }

      const self = this
      self.posting = true
      AccountService.changePassword(this.password, this.newPassword)
        .then(() => {
            self.posting = false
        })
        .catch((error) => {
            console.error(error)
            EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
            self.posting = false
        })
    },
    removeAccount() {
      const self = this
      self.posting = true
      AccountService.removeAccount()
        .then(() => {
            self.posting = false
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