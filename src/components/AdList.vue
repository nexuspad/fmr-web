<template>
  <div class="container-fluid m-0">
    <div class="row">
      <div class="col-md-10 order-lg-1 order-md-1 order-sm-2 p-0">
        <div class="fmr-bordered-area">
          <div class="header">
            <h1>List title here</h1>
          </div>
          <ul class="list-unstyled" v-if="ads.length > 0">
            <li v-for="adItem in ads" v-bind:key="adItem.id" class="border-bottom p-2">
              <ad-summary :ad="adItem" />
            </li>
          </ul>
          <there-is-nothing v-if="ads.length === 0" />
          <div class="row pt-2">
            <div class="col"></div>
            <div class="col">
              <nav aria-label="Page navigation" v-if="allPageIds.length > 1">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">previous</a></li>
                  <li class="page-item" v-for="(p, index) in pageIdsToDisplay" :key="index">
                    <span class="page-link" v-if="p == 0">...</span>
                    <router-link class="page-link" to="/" v-if="p != 0">{{ p }}</router-link>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">next</a></li>
                </ul>
              </nav>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="col-md-2 order-lg-2 order-md-2 order-sm-1 mb-2 pr-1">
        <div class="fmr-bordered-area">
          <div class="header">
            <h1>Filter the result</h1>
          </div>
          <div>
            <list-filter class="p-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListFilter from "./ListFilter";
import AdSummary from "./AdSummary";
import AdService from "../service/AdService";
import AppContext from './AppContext'
import ThereIsNothing from './misc/ThereIsNothing'

export default {
  components: {
    AdSummary, ListFilter, ThereIsNothing
  },
  data() {
    return {
      ads: [],
      allPageIds: [],
      pageIdsToDisplay: [],
      currentPage: 1
    };
  },
  mounted() {
    const self = this;

    AdService.getAds(AppContext.searchCriteria())
    .then(adList => {
      self.buildPages(adList)
    })
    .catch((error) => {
      console.error(error);
    });
  },
  watch: {
    "$route.params": function() {
      const self = this;

      AdService.getAds(AppContext.searchCriteria())
      .then(adList => {
        self.buildPages(adList)
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },
  methods: {
    buildPages(adList) {
      while (this.ads.length) {
        this.ads.pop();
      }
      this.ads.push(...adList.ads);

      while (this.allPageIds.length) {
        this.allPageIds.pop();
      }

      while (this.pageIdsToDisplay.length) {
        this.pageIdsToDisplay.pop();
      }

      let totalPages = adList.totalPages();
      for (let i = 1; i <= totalPages; i++) {
        this.allPageIds.push(i);
      }

      let len = this.allPageIds.length;
      for (let i = 0; i<len; i++) {
        let p = this.allPageIds[i]
        if (Math.abs(p - this.currentPage) < 8 || p == this.allPageIds[len - 1] || p == 1) {
          if (p > this.pageIdsToDisplay[this.pageIdsToDisplay.length - 1] + 1) {
            this.pageIdsToDisplay.push(0) // 0 is the separator
          }
          this.pageIdsToDisplay.push(p)
        }
      }
    }
  }
};
</script>