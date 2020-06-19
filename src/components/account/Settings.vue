<template>
  <div class="fmr-bordered-area" :class="{ fadeOut: accountDeleted }">
    <message />
    <div class="header">
      <h1>Settings</h1>
    </div>
    <div class="conteiner-fluid">
      <div class="fmr-form mt-2 p-2 col-md-6 offset-md-3">
        <div class="form-row border-bottom lead pl-1 mb-2">
          Email
        </div>
        <div class="form-row mb-4">
          <div class="col">
            {{ email }}
          </div>
        </div>
        <div class="form-row border-bottom mb-4 lead pl-1">
          Update password
        </div>
        <div class="form-row">
          <div class="col">
            <label for="password">Current password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
        </div>
        <div class="form-row pt-2">
          <div class="col">
            <label for="password">New password</label>
            <input type="password" class="form-control" id="newPassword" v-model="newPassword">
          </div>
          <div class="col">
            <label for="password">Confirm the new password</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
          </div>
        </div>
        <div class="form-row mt-4">
          <div class="col text-center">
            <button class="btn btn-primary" v-on:click="changePassword()" :disabled="posting">Update</button>
          </div>
        </div>

        <div class="form-row border-bottom mt-4 mb-4 lead pl-1">
          Remove my account
        </div>
        <div class="form-row">
          <div class="col">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="accountDeletionPassword" v-model="accountDeletionPassword">
          </div>
        </div>
        <div class="form-row mt-3 mb-3 ml-1">
          <input type="checkbox" class="mt-1 mr-1" v-model="accountDeletionConfirmation" />
          I want to remove my account and all my ads.
        </div>
        <div class="form-row mt-4">
          <div class="col text-center">
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
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      accountDeletionPassword: '',
      accountDeletionConfirmation: false,
      accountDeleted: false,
      posting: false
    }
  },
  components: {
    Message
  },
  beforeMount() {
    const self = this
    AccountService.getToken().then((token) => {
      if (token) {
        self.email = AccountService.currentUser().email
      }
    })
    .catch(() => {
    })
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
        EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.ACCOUNT_PASSWORD_UPDATE, "Your password has been successfully updated."))
      })
      .catch((error) => {
        console.error(error)
        EventManager.publishApiEvent(AppEvent.ofApiFailure(error))
        self.posting = false
      })
    },
    removeAccount() {
      if (!this.accountDeletionPassword) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.GENERIC_MISSING_INPUT, "Please provide your password."))
        return
      }
      if (!this.accountDeletionConfirmation) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.GENERIC_MISSING_INPUT, "Please check the confirmation box."))
        return
      }

      const self = this
      self.posting = true
      AccountService.removeAccount(this.accountDeletionPassword)
      .then(() => {
        self.posting = false
        EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.ACCOUNT_DELETION_SUCCESS, "Your account has been deleted. Thank you for using FindMyRoof!"))
        self.accountDeleted = true
        setTimeout(() => {
          window.location.replace('/');
        },  3200);
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

<style scoped>
.fadeOut {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 4s, opacity 4s linear;
}
</style>