<template>
  <div class="fmr-bordered-area">
    <message />
    <div class="header">
      <h1>Account verification</h1>
    </div>
    <div class="container-fluid">
      <div class="fmr-form mt-2 p-2 col-md-6 offset-md-3">
        <div v-show="!verificationSent">
          <div class="border-bottom lead pl-1">
            SMS(Text) verification
          </div>
          <div class="mt-4 pl-1">
            <div>
              <label class="font-weight-bold">Mobile phone number</label>
              <div class="input-group mb-4">
                <div class="input-group-prepend">
                  <span class="input-group-text">+1</span>
                </div>
                <input type="phone" class="form-control" v-model="phoneNumber" />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button" :disabled="posting" @click="sendCode()">Send verification code</button>
                </div>
              </div>
              <div>
                <ul>
                  <li>A valid U.S. phone number is required.</li>
                  <li>A text message containing the verification code will be sent to the provided phone number.</li>
                  <li>Enter the code on the next page to verify your account. The code expires in 30 minutes.</li>
                  <li>Your phone number will not be stored or shared. We will not send you unsolicited text message.</li>
                  <li>Please email help@findmyroof.com if you need any help.</li>
                </ul>
              </div>
            </div>
            <div class="col-md-6">
            </div>
          </div>
        </div>
        <div v-show="verificationSent">
          <div class="border-bottom lead bg-light pl-1">
            Your verification code has been texted to the number you provided. Please enter it below and click on "Confirm" button.
          </div>
          <div class="mt-4 pl-1">
            <label class="font-weight-bold">Verification code</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="verificationCode" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="confirm()">Confirm</button>
              </div>
            </div>
            <div class="text-center mt-4 mb-4">
              &ndash;&nbsp; OR &nbsp;&ndash;
            </div>
            <label class="font-weight-bold">Mobile phone number</label>
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">+1</span>
              </div>
              <input type="phone" class="form-control" v-model="phoneNumber" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" :disabled="posting" @click="sendCode(true)">Re-send verification code</button>
              </div>
            </div>
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
      phoneNumber: '',
      verificationCode: '',
      verificationSent: false,
      posting: false
    }
  },
  components: {
    Message
  },
  methods: {
    sendCode(resend = false) {
      if (!this.phoneNumber) {
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.GENERIC_MISSING_INPUT, 
              'Please provide a valid phone number.'))
        return
      }

      const self = this
      self.posting = true
      AccountService.sendVerificationCode(this.phoneNumber)
      .then(() => {
        self.posting = false
        self.verificationSent = AccountService.currentUser() && AccountService.currentUser().verificationCodeSent()

        if (resend) {
          EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.ACCOUNT_VERIFICATION_CODE_SUCCESS, 
              'The verification code has been sent to the number that you provided.'))
        }
      })
      .catch((error) => {
        console.error(error)
        EventManager.publishAppEvent(AppEvent.ofFailure(AppEvent.ACCOUNT_VERIFICATION_CODE_FAILURE, 
              'The system encountered some problem sending the code. Please try again later.'))
        self.posting = false
      })
    },
    confirm() {
      const self = this
      self.posting = true
      AccountService.verify(this.verificationCode)
      .then(() => {
        self.posting = false
        EventManager.publishAppEvent(AppEvent.ofSuccess(AppEvent.ACCOUNT_VERIFICATION_SUCCESS, 
              'Your account has been successfully verified. Thank you. <p class="p-2"><a href="/placead">Post new ad</a></p>'))
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