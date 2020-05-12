<template>
  <div>
    <category-navigation />
    <div class="fmr-bordered-area">
      <div class="header">
        <h1 class="fmr-md-text" v-if="ad.id > 0">
          <a class="fas fa-chevron-circle-left fa-lg pr-2" @click="$router.go(-1)"></a>
          <router-link :to="getPath({state: ad.state})">{{ stateName(ad.state) }}</router-link> / 
          <router-link :to="{path: getPath({state: ad.state}), query: {city: ad.city}}">{{ ad.city }}</router-link> / 
          <router-link :to="getPath({state: ad.state, categoryId: ad.category.id})">{{ categoryName([ad.categoryId]) }}</router-link> / 
          Ad# {{ ad.id }}
        </h1>
      </div>
      <ad-detail-residential :ad=ad v-if="ad.id > 0" />
      <ad-warning v-if="ad.id > 0" />
    </div>
    <vue-headful :title="ad.title" description="" />
  </div>
</template>

<script>
import CategoryNavigation from "./CategoryNavigation"
import AppContext from './AppContext'
import AdDetailResidential from './addisplay/AdDetailResidential'
import AdService from '../service/AdService'
import FmrAd from '../service/model/FmrAd'
import AppDataHelper from './AppDataHelper'
import AdWarning from './misc/AdWarning'

export default {
  mixins: [ AppDataHelper ],
  components: {
    CategoryNavigation, AdDetailResidential, AdWarning
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
  },
  methods: {
    getPath(params = {state: null, city: null, categoryId: null}) {
      let {path} = AppContext.makePath(params)
      return path
    }
  }
}
</script>