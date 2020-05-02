<template>
  <div class="container-fluid m-0">
    <message />
    <div class="row">
      <div class="col-md-10 order-lg-1 order-md-1 order-sm-2 p-0">
        <div class="fmr-bordered-area">
          <div class="header">
            <h1>{{ type }}</h1>
          </div>
          <ul class="list-unstyled" v-if="selectedAds.length > 0">
            <li v-for="ad in selectedAds" v-bind:key="ad.id" class="border-bottom p-2">
              <ad-summary :ad="ad" />
              <div class="clearfix">
                <ad-update-buttons :ad="ad" />
              </div>
            </li>
          </ul>
          <there-is-nothing v-if="selectedAds.length === 0" />
          <div class="row pt-2">
            <div class="col"></div>
            <div class="col">
              <nav aria-label="Page navigation" v-if="allPageIds.length > 1">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">previous</a></li>
                  <li class="page-item" v-for="p in allPageIds" :key="p">
                    <router-link class="page-link" to="/">{{ p }}</router-link>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">next</a></li>
                </ul>
              </nav>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="col-md-2 order-lg-2 order-md-2 order-sm-1 mb-2 pr-0">
        <div class="fmr-bordered-area">
          <div class="header">
            <h1>My ads</h1>
          </div>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :class="{disabled: type=='all'}" to="/account/myads">All</router-link>
              <ul class="list-group-flush">
                <li class="list-group-item">
                  <router-link class="nav-link" :class="{disabled: type=='for rent'}" to="/account/myads?forRent">For Rent</router-link>
                </li>
                <li class="list-group-item">
                  <router-link class="nav-link" :class="{disabled: type=='for sale'}" to="/account/myads?forSale">For Sale</router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{disabled: type=='drafts'}" to="/account/myads?draft">Drafts</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdSummary from "../AdSummary"
import AdService from "../../service/AdService"
import Message from '../Message'
import AppDataHelper from '../AppDataHelper'
import AdUpdateButtons from '../AdUpdateButtons'
import ThereIsNothing from '../misc/ThereIsNothing'

export default {
  components: {
    AdSummary, Message, AdUpdateButtons, ThereIsNothing
  },
  data() {
    return {
      type: 'all',
      selectedAds: [],
      asList: null,
      allPageIds: []
    };
  },
  mixins: [ AppDataHelper ],
  mounted() {
    this.getMyAds()
  },
  methods: {
    getMyAds() {
      const self = this
      AdService.myAds()
      .then(adList => {
        self.adList = adList
        self.display()

        while (self.allPageIds.length) {
          self.allPageIds.pop();
        }
        let totalPages = adList.totalPages();
        for (let i = 1; i <= totalPages; i++) {
          self.allPageIds.push(i);
        }
      })
      .catch(() => {
        console.error("...error");
      });
    },
    display() {
      if (typeof this.$route.query['draft'] !== 'undefined') {
        this.drafts()
      } else if (typeof this.$route.query['forRent'] !== 'undefined') {
        this.forRent()
      } else if (typeof this.$route.query['forSale'] !== 'undefined') {
        this.forSale()
      } else {
        this.all()
      }
    },
    drafts() {
      this.type = 'drafts'
      while (this.selectedAds.length) {
        this.selectedAds.pop();
      }
      this.adList.ads.forEach(ad => {
        if (ad.status === 'DRAFT') {
          this.selectedAds.push(ad)
        }
      })
    },
    all() {
      this.type = 'all'
      while (this.selectedAds.length) {
        this.selectedAds.pop();
      }
      this.adList.ads.forEach(ad => {
        if (ad.status !== 'DRAFT') {
          this.selectedAds.push(ad)
        }
      })
    },
    forRent() {
      this.type = 'for rent'
      while (this.selectedAds.length) {
        this.selectedAds.pop();
      }
      this.adList.ads.forEach(ad => {
        console.log(ad.category.id)
        if (this.isForRent(ad.category.id)) {
          this.selectedAds.push(ad)
        }
      })
    },
    forSale() {
      this.type = 'for sale'
      while (this.selectedAds.length) {
        this.selectedAds.pop();
      }
      this.adList.ads.forEach(ad => {
        if (this.isForSale(ad.category.id)) {
          this.selectedAds.push(ad)
        }
      })
    }
  },
  watch: {
    "$route.query": function() {
      this.display()
    }
  }
};
</script>