<template>
  <div>
    <category-navigation />
    <div class="fmr-bordered-area">
      <div class="header">
        <h1 class="fmr-md-text">
          <a class="fas fa-chevron-circle-left fas-large" @click="$router.go(-1)"></a>
          {{ stateName(ad.state) }} / {{ ad.city }} / {{ categoryName([ad.categoryId]) }} / Ad# {{ ad.id }}
        </h1>
      </div>
      <ad-detail :ad=ad />
      <ad-warning />
    </div>
    <vue-headful :title="ad.title" description="" />
  </div>
</template>

<script>
import CategoryNavigation from "./CategoryNavigation"
import AdDetail from './addisplay/AdDetail'
import AdService from '../service/AdService'
import FmrAd from '../service/model/FmrAd'
import AppDataHelper from './AppDataHelper'
import AdWarning from './misc/AdWarning'

export default {
  mixins: [ AppDataHelper ],
  components: {
    CategoryNavigation, AdDetail, AdWarning
  },
  data() {
    return {
      ad: new FmrAd()
    }
  },
  mounted() {
    if (!this.ad.id) {
      const self = this
      AdService.getAd(this.$route.params.id).then((ad) => {
        self.ad = ad
      })
    }
  }
}
</script>