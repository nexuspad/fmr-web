<template>
  <div class="fmr-bordered-area">
    <message />
    <div class="header">
      <h1>Log in</h1>
    </div>
    <div class="p-2">
      <form v-on:submit.prevent>
        <div class="form-group col-lg-6">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group col-lg-6">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="form-group col-lg-6">
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
        </div>
        <div class="form-group col-lg-6">
          <a href="javascript:" @click="$router.push({name: 'ResetPassword'})">Reset password</a>
        </div>
        <div class="form-group col-lg-6">
          <button class="btn btn-primary" v-on:click="login($event)" :disabled="posting">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from '../Message'
import AccountService from '../../service/AccountService'
import EventManager from '../../util/EventManager'
import AppEvent from '../../util/AppEvent'

export default {
  components: {
    Message
  },
  data() {
    return {
      email: '',
      password: '',
      posting: false
    }
  },
  methods: {
    login() {
      const self = this
      self.posting = true
      AccountService.login(this.email, this.password)
        .then((user) => {
            console.log(user)
            window.location.href = '/account/myads'
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