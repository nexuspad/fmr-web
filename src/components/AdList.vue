<template>
  <div>
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-md-10 order-lg-1 order-md-1 order-sm-2 p-0">
          <div class="fmr-bordered-area">
            <div class="header">
              <h1>List title here</h1>
            </div>
            <ul class="list-unstyled">
              <li v-for="adItem in ads" v-bind:key="adItem.id" class="border-bottom p-2">
                <ad-summary :ad="adItem" />
              </li>
            </ul>
            <div class="row pt-2">
              <div class="col"></div>
              <div class="col">
                <nav aria-label="Page navigation" v-if="pages.length > 1">
                  <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">previous</a></li>
                    <li class="page-item" v-for="p in pages" :key="p">
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
              <h1>Filter the result</h1>
            </div>
            <div>
              <list-filter class="p-2" />
            </div>
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

export default {
  components: {
    AdSummary,
    ListFilter
  },
  data() {
    return {
      ads: [],
      pages: [1,2,3,4,5]
    };
  },
  mounted() {
    const self = this;

    AdService.getAds(AppContext.currentCriteria())
      .then(adList => {
        self.ads.push(...adList.ads);
      })
      .catch(() => {
        console.error("...error");
      });
  },
  watch: {
    "$route.params": function() {
      const self = this;

      AdService.getAds(AppContext.currentCriteria())
        .then(adList => {
          while (self.ads.length) {
            self.ads.pop();
          }
          self.ads.push(...adList.ads);
        })
        .catch(() => {
          console.error("...error");
        });
    }
  }
};
</script>