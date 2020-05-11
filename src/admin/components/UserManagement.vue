<template>
  <div>
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" v-model="email">
    <button class="btn btn-primary" v-on:click="impersonate()">Impersonate</button>
    <div>{{ token }}</div>
  </div>
</template>

<script>
import AdminService from '../service/AdminService'

export default {
  data() {
    return {
      email: '',
      token: ''
    }
  },
  methods: {
    impersonate() {
      const self = this
      AdminService.impersonate(this.email)
      .then((user) => {
        alert('You are logged in as ' + user.email)
        self.token = user.token
      })
      .catch((error) => {
        alert(error)
      })
    }
  }
}
</script>