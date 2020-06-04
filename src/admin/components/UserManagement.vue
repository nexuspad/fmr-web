<template>
  <div>
    <admin-message :message="message" />
    <navigation />
    <!--
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
    -->
    <div class="container-fluid" v-if="users.length > 0">
      <div class="row pb-1 border-bottom mb-2">
        <div class="col-1">
          <span v-if="selectedUser.id">{{ selectedUser.id }}</span>
        </div>
        <div class="col">
          <input type="email" class="form-control" v-model="userEmail" />
        </div>
        <div class="col">
          <button class="btn btn-primary mr-2" v-on:click="search()">Search</button>
        </div>
        <div class="col">
          <iframe src="https://panda.findmyroof.com/polo.html" width="40" height="30" frameBorder="0" id="Polo"></iframe>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary mr-2" v-on:click="suspend(selectedUser.id)" v-if="selectedUser.id && !selectedUser.isSuspended()">Suspend</button>
          <button class="btn btn-secondary mr-2" v-on:click="unSuspend(selectedUser.id)" v-if="selectedUser.id && selectedUser.isSuspended()">Un-Suspend</button>
          <button class="btn btn-primary mr-2" v-on:click="impersonate(selectedUser.email)" v-if="selectedUser.id">Impersonate</button>
          <button class="btn btn-secondary ml-2" v-on:click="reset()" v-if="selectedUser.id">Clear</button>
        </div>
      </div>
      <div class="row pb-1 font-weight-bold">
        <div class="col-1">Id</div>
        <div class="col">Email</div>
        <div class="col">Status</div>
        <div class="col"></div>
        <div class="col">Note</div>
      </div>
      <div class="row pb-1 fmr-sm-text mb-2" v-for="u in users" v-bind:key="u.id">
        <div class="col-1">
          {{ u.id }}
        </div>
        <div class="col">
          <span @click="userEmail = u.email; selectedUser = u">{{ u.email }}</span>
        </div>
        <div class="col">
          {{ u.status }}
        </div>
        <div class="col">
          {{ (new Date(u.lastActivity*1000)).toLocaleString() }}
        </div>
        <div class="col">
          <span v-if="u.adminNote" :class="{'text-danger': u.adminNote.reviewFlag}">{{ u.adminNote.comment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminMessage from './AdminMessage'
import Navigation from './Navigation'
import AdminService from '../service/AdminService'
import User from '../../service/model/User'

export default {
  components: {
    AdminMessage, Navigation
  },
  data() {
    return {
      selectedUser: new User,
      userEmail: '',
      users: [],
      email: '',
      token: '',
      message: ''
    }
  },
  mounted() {
    this.getLatest()
  },
  methods: {
    search () {
      const self = this
      AdminService.searchUser(this.userEmail).then((userReturned) => {
        while (self.users.length > 0) {
          self.users.pop()
        }
        self.users.push(userReturned)
        self.selectedUser = userReturned
      }).catch((error) => {
        console.error(error)
      })
    },
    reset() {
      this.selectedUser = new User
      this.userEmail = ''
      this.getLatest()
    },
    getLatest() {
      const self = this
      AdminService.getUsers().then((returnedUsers) => {
        while (self.users.length > 0) {
          self.users.pop()
        }
        returnedUsers.forEach(u => {
          self.users.push(u)
          if (self.selectedUser.id == u.id) {
            self.selectedUser.status = u.status
          }
        });
      }).catch(() => {
      })
    },
    impersonate(email) {
      const self = this
      AdminService.impersonate(email)
      .then((user) => {
        alert('You are logged in as ' + user.email)
        const win = document.getElementsByTagName('iframe')[0].contentWindow;
        win.postMessage(JSON.stringify({key: 'token', data: user.token}), "*");
        self.token = user.token
      })
      .catch((error) => {
        alert(error)
      })
    },
    suspend(userId) {
      const self = this
      AdminService.toggleSuspension(userId, true).then(() => {
        self.message = userId + " is suspended"
        self.getLatest()
      }).catch((error) => {
        self.message(error)
      })
    },
    unSuspend(userId) {
      const self = this
      AdminService.toggleSuspension(userId, false).then(() => {
        self.message = userId + " is un-suspended"
        self.getLatest()
      }).catch((error) => {
        self.message(error)
      })

    }
  }
}
</script>