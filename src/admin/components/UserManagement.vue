<template>
  <div>
    <navigation />
    <div class="container-fluid p-2">
      <div class="row">
        <div class="col">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="email" />
        </div>
        <div class="col">
          <button class="btn btn-primary" v-on:click="impersonate()">Impersonate</button>
        </div>
        <div class="col">{{ token }}</div>
      </div>
    </div>
    <div class="container-fluid" v-if="users.length > 0">
      <div class="row pb-1" v-for="u in users" v-bind:key="u.id">
        <div class="col">
          {{ u.id }}
        </div>
        <div class="col">
          {{ u.email }}
        </div>
        <div class="col">
          <button class="btn btn-secondary" v-on:click="suspend()">Suspend</button>
          &nbsp;
          <button class="btn btn-secondary" v-on:click="suspend()">Un-Suspend</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation'
import AdminService from '../service/AdminService'

export default {
  components: {
    Navigation
  },
  data() {
    return {
      users: [],
      email: '',
      token: ''
    }
  },
  mounted() {
    const self = this
    AdminService.getUsers().then((returnedUsers) => {
      while (self.users.length > 0) {
        self.users.pop()
      }
      returnedUsers.forEach(u => {
        self.users.push(u)
      });
    }).catch(() => {
      self.$router.push('/')
    })
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
    },
    suspend() {}
  }
}
</script>