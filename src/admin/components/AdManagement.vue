<template>
  <div>
    <admin-message :message="message" />
    <navigation />
    <div class="container-fluid" v-if="ads.length > 0">
      <form v-on:submit.prevent>
      <div class="row pb-1 border-bottom mb-2">
        <div class="col-1">
          <input type="text" class="form-control" v-model="adId" />
        </div>
        <div class="col-2">
          <button class="btn btn-primary mr-2" v-on:click="search()" v-if="userEmail">Search</button>
        </div>
        <div class="col-1"></div>
        <div class="col-1"></div>
        <div class="col">
          <input type="email" class="form-control" v-model="userEmail" />
        </div>
        <div class="col">
          <button class="btn btn-primary mr-2" v-on:click="search()">Search</button>
        </div>
        <div class="col-3">
          <button class="btn btn-primary mr-2" v-on:click="impersonate(userEmail)" v-if="userEmail">Impersonate</button>
          <button class="btn btn-secondary" v-on:click="reset()">Clear</button>
        </div>
      </div>
      </form>
      <div class="row pb-1 font-weight-bold">
        <div class="col-1">Id</div>
        <div class="col-2">Title</div>
        <div class="col-1">State</div>
        <div class="col-1"></div>
        <div class="col">Owner</div>
        <div class="col">Score</div>
        <div class="col-3"></div>
      </div>
      <div class="row pb-1 fmr-sm-text mb-2" v-for="ad in ads" v-bind:key="ad.id">
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

export default {
  mixins: [ AdminHelper ],
  components: {
    AdminMessage, Navigation
  },
  data() {
    return {
      adId: null,
      ads: [],
      message: ''
    }
  },
  mounted() {
    this.getLatest()
  },
  methods: {
    getLatest() {
      const self = this
      AdminService.getAds().then((adsReturned) => {
        while (self.ads.length > 0) {
          self.ads.pop()
        }
        adsReturned.forEach(p => {
          self.ads.push(p)
        });
      }).catch((error) => {
        console.error(error)
      })
    },
    search () {
      const self = this
      AdminService.searchAds(this.adId, this.userEmail).then((adsReturned) => {
        while (self.ads.length > 0) {
          self.ads.pop()
        }
        adsReturned.forEach(p => {
          self.ads.push(p)
        });
      }).catch((error) => {
        console.error(error)
      })
    },
    reset() {
      this.adId = null
      this.setUserEmail('')
      this.getLatest()
    },
    disapprove(id) {
      const self = this
      AdminService.toggleApproval(id, false).then(() => {
        self.message = id + " is disapproved"
      }).catch((error) => {
        self.message = error
      })
    },
    approve(id) {
      const self = this
      AdminService.toggleApproval(id, true).then(() => {
        self.message = id + " is approved"
      }).catch((error) => {
        self.message = error
      })
    }
  }
}
</script>