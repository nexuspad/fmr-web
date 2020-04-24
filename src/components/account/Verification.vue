<template>
  <div class="fmr-bordered-area">
    <div class="header">
      <h1>Account verification</h1>
    </div>
    <div class="container-fluid p-4" v-if="!hasCode">
      <div class="row">
        <div class="col lead">
          Mobile verification is required for ad posting.
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <label class="font-weight-bold">Mobile phone number</label>
          <div class="input-group mb-4">
            <input type="phone" class="form-control">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">Send verification code</button>
            </div>
          </div>
          <div>
            <ul>
              <li>A text message containing the verification code will be sent to the provided phone number.</li>
              <li>Enter the code on the next page to verify your account.</li>
              <li>Your privacy is important to us. We will not send you unsolicited text message or share your phone number with any third party.</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
        </div>
      </div>
    </div>
    <div class="container-fluid p-4" v-if="hasCode">
      <div class="row">
        <div class="col lead">
          Your verification code has been texted to the number you provided. Please enter it below and click on "Confirm" button.
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6 m-0">
          <label class="font-weight-bold">Verification code</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">Confirm</button>
            </div>
          </div>
          <div class="text-center">
            &ndash;&nbsp; OR &nbsp;&ndash;
          </div>
          <div class="input-group mt-4 mb-4">
            <input type="phone" class="form-control">
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">Re-send verification code</button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasCode: false
    }
  },
  mounted() {
    if (this.$route.path.includes('sendverificationcode')) {
      this.hasCode = false
    } else if (this.$route.path.includes('verify')) {
      this.hasCode = true
    }
  }
}
</script>