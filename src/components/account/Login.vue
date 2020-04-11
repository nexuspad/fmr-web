<template>
  <div>
    <form v-if="account === null || !account.sessionId">
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>      
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Email" autocomplete="username" v-model="account.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" autocomplete="current-password" v-model="account.password">
        <p style="margin:1em;"><a href="javascript:" @click="$router.push({name: 'reqpasswordreset'})">Reset password</a></p>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" v-on:click="submitting(); login($event)" :disabled="formState.posting">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { formSetup } from '../GenericFormHandler'
import { accountSetup } from './AccountHandler'

export default {
    setup () {
        const { formState, submitting } = formSetup()
        const { account, login } = accountSetup()
        return {
            formState, submitting,
            account, login
        }
    }
}
</script>