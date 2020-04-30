<template>
  <div class="fmr-message">
    <div class="alert alert-success" role="alert" v-if="showSuccess">
      <button type="button" class="close" @click="showSuccess=false" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div v-html="successMessage"></div>
    </div>
    <div class="alert alert-danger" role="alert" v-if="showError">
      <button type="button" class="close" @click="showError=false" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div v-html="errorMessage"></div>
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

    EventManager.subscribe(AppEvent.GENERIC_MISSING_INPUT, this.showErrorMessage)

    // Handle App internal checks
    EventManager.subscribe(AppEvent.ACCOUNT_REGISTRATION_FAILURE, this.showErrorMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_LOGIN_FAILURE, this.showErrorMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_PASSWORD_UPDATE_FAILURE, this.showErrorMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_PASSWORD_UPDATE, this.showSuccessMessage)

    EventManager.subscribe(AppEvent.ACCOUNT_VERIFICATION_CODE_FAILURE, this.showErrorMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_VERIFICATION_CODE_SUCCESS, this.showSuccessMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_VERIFICATION_FAILURE, this.showErrorMessage)
    EventManager.subscribe(AppEvent.ACCOUNT_VERIFICATION_SUCCESS, this.showSuccessMessage)

    EventManager.subscribe(AppEvent.AD_UPDATE_SUCCESS, this.showSuccessMessage)
    EventManager.subscribe(AppEvent.AD_UPDATE_FAILURE, this.showErrorMessage)

    EventManager.subscribe(AppEvent.AD_ACTIVATION_SUCCESS, this.showSuccessMessage)
    EventManager.subscribe(AppEvent.AD_ACTIVATION_FAILURE, this.showErrorMessage)

    EventManager.subscribe(AppEvent.AD_DEACTIVATION_SUCCESS, this.showSuccessMessage)
    EventManager.subscribe(AppEvent.AD_DEACTIVATION_FAILURE, this.showErrorMessage)

    EventManager.subscribe(AppEvent.AD_EXTENSION_SUCCESS, this.showSuccessMessage)
    EventManager.subscribe(AppEvent.AD_EXTENSION_FAILURE, this.showErrorMessage)

    EventManager.subscribe(AppEvent.AD_REMOVAL_SUCCESS, this.showSuccessMessage)
    EventManager.subscribe(AppEvent.AD_REMOVAL_FAILURE, this.showErrorMessage)
  },
  beforeDestroy () {
    EventManager.unSubscribe(AppEvent.API_EVENT, this.showApiResult)
    
    EventManager.unSubscribe(AppEvent.GENERIC_MISSING_INPUT, this.showErrorMessage)

    EventManager.unSubscribe(AppEvent.ACCOUNT_REGISTRATION_FAILURE, this.showErrorMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_LOGIN_FAILURE, this.showErrorMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_PASSWORD_UPDATE_FAILURE, this.showErrorMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_PASSWORD_UPDATE, this.showSuccessMessage)

    EventManager.unSubscribe(AppEvent.ACCOUNT_VERIFICATION_CODE_FAILURE, this.showErrorMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_VERIFICATION_CODE_SUCCESS, this.showSuccessMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_VERIFICATION_FAILURE, this.showErrorMessage)
    EventManager.unSubscribe(AppEvent.ACCOUNT_VERIFICATION_SUCCESS, this.showSuccessMessage)

    EventManager.unSubscribe(AppEvent.AD_UPDATE_SUCCESS, this.showSuccessMessage)
    EventManager.unSubscribe(AppEvent.AD_UPDATE_FAILURE, this.showErrorMessage)

    EventManager.unSubscribe(AppEvent.AD_ACTIVATION_SUCCESS, this.showSuccessMessage)
    EventManager.unSubscribe(AppEvent.AD_ACTIVATION_FAILURE, this.showErrorMessage)

    EventManager.unSubscribe(AppEvent.AD_DEACTIVATION_SUCCESS, this.showSuccessMessage)
    EventManager.unSubscribe(AppEvent.AD_DEACTIVATION_FAILURE, this.showErrorMessage)

    EventManager.unSubscribe(AppEvent.AD_EXTENSION_SUCCESS, this.showSuccessMessage)
    EventManager.unSubscribe(AppEvent.AD_EXTENSION_FAILURE, this.showErrorMessage)

    EventManager.unSubscribe(AppEvent.AD_REMOVAL_SUCCESS, this.showSuccessMessage)
    EventManager.unSubscribe(AppEvent.AD_REMOVAL_FAILURE, this.showErrorMessage)

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
    showSuccessMessage (appEvent) {
      this.clearAll();
      this.showSuccess = true;
      this.successMessage = appEvent.message
    },
    showErrorMessage (appEvent) {
      this.clearAll()
      this.showError = true
      this.errorMessage = appEvent.message
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