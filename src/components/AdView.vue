<template>
  <div>
    <top-navigation />
    <div>
      <category-navigation />
      <div class="fmr-bordered-area">
        <div class="header">
          <h1 class="fmr-sm-text">{{ stateName(ad.state) }} / {{ ad.city }} / {{ categoryName([ad.categoryId]) }} / Ad# {{ ad.id }}</h1>
        </div>
        <ad-detail :ad=ad />
        <ad-warning />
      </div>
    </div>
    <fmr-footer />
    <div>
      <vue-headful :title="ad.title" description="" />
    </div>
  </div>
</template>

<script>
import TopNavigation from './TopNavigation'
import CategoryNavigation from "./CategoryNavigation"
import AdDetail from './addisplay/AdDetail'
import FmrFooter from './FmrFooter'
import AdService from '../service/AdService'
import FmrAd from '../service/model/FmrAd'
import AppDataHelper from './AppDataHelper'
import AdWarning from './misc/AdWarning'

export default {
  mixins: [ AppDataHelper ],
  components: {
    TopNavigation, CategoryNavigation, AdDetail, AdWarning, FmrFooter
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