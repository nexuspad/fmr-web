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
        <div class="col">
          <button class="btn btn-primary mr-2" v-on:click="impersonate(userEmail)" v-if="userEmail">Impersonate</button>
          <button class="btn btn-secondary" v-on:click="reset()">Clear/Refresh</button>
        </div>
      </div>
      </form>
      <div class="row pb-1 font-weight-bold">
        <div class="col-1">Id</div>
        <div class="col-2">Title</div>
        <div class="col-1">State</div>
        <div class="col-1"></div>
        <div class="col">Owner</div>
        <div class="col-1">Score</div>
        <div class="col"></div>
        <div class="col-1"></div>
      </div>
      <div class="row pb-1 fmr-sm-text mb-2" v-for="ad in ads" v-bind:key="ad.id">
        <div class="col-1">
          <span class="mr-1" @click="adId = ad.id">{{ ad.id }}</span>
          <a :href="'https://findmyroof.com/ad/' + ad.id" target="_blank" class="fas fa-external-link-alt"></a>
        </div>
        <div class="col-2">
          <b>{{ categoryName(ad.categoryId) }}</b>
          <div>{{ ad.title }}</div>
        </div>
        <div class="col-1">
          {{ ad.state }}
        </div>
        <div class="col-1">
          {{ ad.status.replace('_', ' ') }}
        </div>
        <div class="col">
          <span @click="setUserEmail(ad.owner.email, $event)">{{ ad.owner.email }}</span>
        </div>
        <div class="col-1">
          <a tabindex="0" role="button" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" data-html="true"
            :data-content="printScoreCard(ad)">
            {{ ad.scoreCard.score }}
          </a>
        </div>
        <div class="col">{{ ad.scoreCard.comment }}</div>
        <div class="col-1 text-nowrap">
          <button class="btn btn-outline-danger mr-1" v-on:click="disapprove(ad.id)" v-if="!ad.isDisapproved()">
            <i class="fas fa-thumbs-down"></i>
          </button>
          <button class="btn btn-outline-success" v-on:click="approve(ad.id)" v-if="ad.isDisapproved() || ad.isUnderReview()">
            <i class="fas fa-thumbs-up"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import AdminHelper from './AdminHelper'
import AdminMessage from './AdminMessage'
import Navigation from './Navigation'
import AdminService from '../service/AdminService'
import { categoryNameLookup } from '../../service/AppData'

export default {
  mixins: [ AdminHelper ],
  components: {
    AdminMessage, Navigation
  },
  data() {
    return {
      adId: null,
      userEmail: '',
      ads: [],
      message: ''
    }
  },
  mounted() {
    this.getAds()
  },
  watch: {
    "$route.path": function() {
      this.getAds()
    }
  },
  methods: {
    getAds() {
      let status = 0
      if (this.$route.name === 'reviews') {
        status = 2
      } else {
        status = 0
      }

      const self = this
      while (self.ads.length > 0) {
        self.ads.pop()
      }

      AdminService.getAds(status).then((adsReturned) => {
        adsReturned.forEach(p => {
          self.ads.push(p)

          this.$nextTick(() => {
            $('[data-toggle="popover"]').popover({
              trigger: 'focus'
            })
          });

        });
      }).catch((error) => {
        console.error(error)
      })
    },
    categoryName(categoryId) {
      return categoryNameLookup(categoryId)
    },
    search () {
      const self = this
      AdminService.searchAds(this.adId, this.userEmail).then((adsReturned) => {
        while (self.ads.length > 0) {
          self.ads.pop({
              trigger: 'focus'
          })
        }
        adsReturned.forEach(p => {
          self.ads.push(p)
        });

        // search by ad
        if (self.adId && adsReturned.length > 0) {
          this.userEmail = adsReturned[0].owner.email
        }

      }).catch((error) => {
        console.error(error)
      })
    },
    reset() {
      this.adId = null
      this.setUserEmail('')
      this.getAds()
    },
    disapprove(id) {
      const self = this
      AdminService.toggleApproval(id, false).then(() => {
        self.message = id + " is disapproved"
        self.getAds()
      }).catch((error) => {
        self.message = error
      })
    },
    approve(id) {
      const self = this
      AdminService.toggleApproval(id, true).then(() => {
        self.message = id + " is approved"
        self.getAds()
      }).catch((error) => {
        self.message = error
      })
    },
    printScoreCard(ad) {
      return ad.scoreCard.riskLevels().join('<br/>')
    }
  }
}
</script>