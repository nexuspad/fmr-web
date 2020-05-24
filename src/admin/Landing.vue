<template>
  <div>
    <form v-on:submit.prevent>
      <div class="form-group pl-1">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp">
      </div>
      <div class="form-group pl-1">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <div class="form-group text-center">
        <button class="btn btn-primary" v-on:click="login()">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import AdminService from './service/AdminService'

export default {
  components: {
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      const self = this
      AdminService.login(this.email, this.password)
      .then((user) => {
        console.log(user)
        self.$router.push('/users')
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
