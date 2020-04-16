<template>
  <div class="fmr-bordered-area">
    <div class="container">
      <div class="row">
        <div class="col-md-10 order-lg-1 order-md-1 order-sm-2">
          <ul class="list-unstyled">
            <li v-for="adItem in ads" v-bind:key="adItem.id">
              <ad-summary :ad="adItem" />
            </li>
          </ul>
        </div>
        <div class="col-md-2 order-lg-2 order-md-2 order-sm-1">
          <list-filter />
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
      ads: []
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
          console.log('bbbb....')
          self.ads.push(...adList.ads);
        })
        .catch(() => {
          console.error("...error");
        });
    }
  }
};
</script>