<template>
  <div class="fmr-bordered-area">
    <div class="header">
      <h1>Reset password</h1>
    </div>
    <div class="p-2">
      <form v-on:submit.prevent>
        <div class="form-group col">
          Please enter your account email address below and click on "Reset password". You will receive instructions on how to reset your password.
        </div>
        <div class="form-group col-lg-6">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
        </div>
        <div class="form-group col-lg-6">
          <button class="btn btn-primary" v-on:click="requestPasswordReset()" :disabled="posting">Request password reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      posting: false
    }
  },
  methods: {
    requestPasswordReset() {
    }
  }
}
</script>