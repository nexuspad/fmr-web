<template>
  <div>
    <admin-message :message="message" />
    <navigation />
    <div class="container-fluid" v-if="users.length > 0">
      <div class="row pb-1 border-bottom mb-2">
        <div class="col-1">
          <span v-if="selectedUser.id">{{ selectedUser.id }}</span>
        </div>
        <div class="col-3">
          <input type="email" class="form-control" v-model="userEmail" />
        </div>
        <div class="col-1">
          <button class="btn btn-primary mr-2" v-on:click="search()">Search</button>
        </div>
        <div class="col-6">
          <button class="btn btn-secondary mr-2" v-on:click="suspend(selectedUser.id)" v-if="selectedUser.id && !selectedUser.isSuspended()">Suspend</button>
          <button class="btn btn-secondary mr-2" v-on:click="unSuspend(selectedUser.id)" v-if="selectedUser.id && selectedUser.isSuspended()">Un-Suspend</button>
          <button class="btn btn-primary mr-2" v-on:click="activate(selectedUser.id)" v-if="selectedUser.id">Activate</button>
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
          <span @click="setUserEmail(u.email); selectedUser = u">{{ u.email }}</span>
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
    <div class="container-fluid" v-if="userAds.length > 0">
      <div class="row pb-1 font-weight-bold">
        <div class="col-1">Id</div>
        <div class="col-2">Title</div>
        <div class="col-1">State</div>
        <div class="col-1"></div>
        <div class="col">Owner</div>
        <div class="col">Score</div>
        <div class="col-3"></div>
      </div>
      <div class="row pb-1 fmr-sm-text mb-2" v-for="ad in userAds" v-bind:key="ad.id">
        <div class="col-1">
          {{ ad.id }}
        </div>
        <div class="col-2">
          {{ ad.title }}
        </div>
        <div class="col-1">
          {{ ad.state }}
        </div>
        <div class="col-1">
          {{ ad.status.replace('_', ' ') }}
        </div>
        <div class="col">
          <span @click="setUserEmail(ad.owner.email)">{{ ad.owner.email }}</span>
        </div>
        <div class="col">{{ ad.scoreCard.score }} <br/> {{ ad.scoreCard.comment }}</div>
        <div class="col">
          <button class="btn btn-secondary" v-on:click="disapprove(ad.id)" v-if="!ad.isDisapproved()">Disapprove</button>
          &nbsp;
          <button class="btn btn-secondary" v-on:click="approve(ad.id)" v-if="ad.isDisapproved()">Approve</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AdminHelper from './AdminHelper'
import AdminMessage from './AdminMessage'
import Navigation from './Navigation'
import AdminService from '../service/AdminService'
import User from '../../service/model/User'

export default {
  mixins: [ AdminHelper ],
  components: {
    AdminMessage, Navigation
  },
  data() {
    return {
      selectedUser: new User,
      users: [],
      userAds: [],
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

      AdminService.searchAds(this.adId, this.userEmail).then((adsReturned) => {
        while (self.userAds.length > 0) {
          self.userAds.pop()
        }
        adsReturned.forEach(p => {
          self.userAds.push(p)
        });
      }).catch((error) => {
        console.error(error)
      })
    },
    reset() {
      this.selectedUser = new User
      this.setUserEmail('')
      this.getLatest()
      while (self.userAds.length > 0) {
        self.userAds.pop()
      }
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
    activate(userId) {
      const self = this
      AdminService.activate(userId).then(() => {
        self.message = userId + " is activated"
        self.getLatest()
      }).catch((error) => {
        self.message(error)
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