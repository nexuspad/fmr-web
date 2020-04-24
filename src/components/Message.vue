<template>
  <div class="fmr-message">
    <div class="alert alert-success alert-dismissible" role="alert" v-if="showSuccess">
      <div v-html="successMessage"></div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="alert alert-danger alert-dismissible" role="alert" v-if="showError">
      <div v-html="errorMessage"></div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import ApiError from '../service/ApiError'
import EventManager from '../util/EventManager'
import AppEvent from '../util/AppEvent'

export default {
  data: function () {
    return {
      showError: false,
      showSuccess: false,
      showSuccessWithCountDown: 0,
      showInformation: false,
      informationMessage: '',
      successMessage: 'success!',
      errorMessage: 'failed!',
      loadingIcon: false
    }
  },
  mounted () {
    // Handle API response directly
    EventManager.subscribe(AppEvent.API_EVENT, this.showApiResult)

    // Handle App internal checks
    EventManager.subscribe(AppEvent.ACCOUNT_REGISTRATION_FAILURE, this.showErrorMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_LOGIN_FAILURE, this.showErrorMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_PASSWORD_UPDATE, this.showUpdateResult)
  },
  beforeDestroy () {
    EventManager.unSubscribe(AppEvent.API_EVENT, this.showApiResult)
    EventManager.unSubscribe(AppEvent.ACCOUNT_REGISTRATION_FAILURE, this.showErrorMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_LOGIN_FAILURE, this.showErrorMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_PASSWORD_UPDATE, this.showUpdateResult)
  },
  methods: {
    showApiResult (appEvent) {
      this.clearAll();
      if (appEvent.error && appEvent.error instanceof ApiError) {
        this.showError = true;
        this.errorMessage = appEvent.error.message;
      } else {
        this.showSuccess = true;
        this.showSuccessWithCountDown = 2;
        this.successMessage = appEvent.message;
      }
    },
    showErrorMessage (appEvent) {
      this.clearAll()
      this.showError = true
      this.errorMessage = appEvent.error
    },
    showGeneralMessage (appEvent) {
      this.clearAll();
      this.showInformation = true;
      this.informationMessage = appEvent.message
    },
    showLoadingIcon (loading) {
      this.loadingIcon = loading;
    },
    clearAll () {
      this.showError = false;
      this.showSuccess = false;
      this.showInformation = false;
      this.successMessage = '';
      this.informationMessage = '';
    }
  }
}
</script>