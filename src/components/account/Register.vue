<template>
  <div>
    <message />
    <h1 class="ml-2 mb-3">Register an account</h1>
    <form v-if="account === null || !account.sessionId">
      <div class="form-group col-lg-6">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" v-model="account.email" aria-describedby="emailHelp">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group col-lg-6">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="account.password">
      </div>
      <div class="form-group col-lg-6">
        <label for="password">Confirm password</label>
        <input type="password" class="form-control" id="password" v-model="confirmPassword">
      </div>
      <div class="form-group col-lg-6">
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="agreeTos">
          <label class="form-check-label" for="agreeTos">I have read and agree to the Terms of Use and Privacy Policy.</label>
        </div>
      </div>
      <div class="form-group col-lg-6">
        <button class="btn btn-primary" v-on:click="register($event)" :disabled="formState.posting">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import Message from '../Message'
import { formSetup } from '../GenericFormHandler'
import { accountSetup } from './AccountHandler'

export default {
  components: {
    Message
  },
  setup() {
    const { formState } = formSetup()
    const { account, login } = accountSetup()
    return {
      formState,
      account, login
    }
  },
  data() {
    return {
      confirmPassword: ''
    }
  }
}
</script>