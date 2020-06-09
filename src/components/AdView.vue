<template>
  <div>
    <category-navigation />
    <message />
    <div class="fmr-bordered-area">
      <div class="header">
        <h1 class="fmr-md-text" v-if="ad.id > 0">
          <a class="fas fa-chevron-circle-left fa-lg pr-2" @click="$router.go(-1)"></a>
          <router-link :to="getPath({state: ad.state.toLowerCase()})">{{ stateName(ad.state) }}</router-link> / 
          <router-link :to="{path: getPath({state: ad.state.toLowerCase()}), query: {city: ad.city}}">{{ ad.city }}</router-link> / 
          <router-link :to="getPath({state: ad.state.toLowerCase(), categoryId: ad.category.id})">{{ categoryName([ad.categoryId]) }}</router-link> / 
          Ad# {{ ad.id }}
          <span class="fmr-disapp ml-2" v-if="ad.isDisapproved()"></span>
        </h1>
      </div>
      <div class="alert alert-secondary m-4" v-if="ad.isDraft()">
        This is a draft.
      </div>
      <div class="alert alert-warning m-4" v-if="ad.isExpired()">
        This ad is expired.
      </div>
      <div class="alert alert-warning m-4" v-if="ad.isDeactivated()">
        This ad is de-activated.
      </div>
      <div class="alert alert-danger m-4" v-if="ad.isDisapproved()">
        This ad is disapproved.
      </div>
      <div v-if="!ad.isDisapproved()">
        <ad-detail-commercial v-if="isCommercial(ad.categoryId) && ad.id > 0" :ad=ad />
        <ad-detail-residential v-if="isResidential(ad.categoryId) && ad.id > 0" :ad=ad />
        <ad-detail-land v-if="isLand(ad.categoryId) && ad.id > 0" :ad=ad />
        <ad-detail-vacation v-if="isVacation(ad.categoryId) && ad.id > 0" :ad=ad />
      </div>
      <ad-warning v-if="ad.id > 0" />
    </div>
    <vue-headful :title="ad.title" description="" />
  </div>
</template>

<script>
import CategoryNavigation from "./CategoryNavigation"
import AppContext from './AppContext'
import AdDetailResidential from './addisplay/AdDetailResidential'
import AdDetailLand from './addisplay/AdDetailLand'
import AdDetailVacation from './addisplay/AdDetailVacation'
import AdDetailCommercial from './addisplay/AdDetailCommercial'
import AdService from '../service/AdService'
import FmrAd from '../service/model/FmrAd'
import AppDataHelper from './AppDataHelper'
import AdWarning from './misc/AdWarning'
import Message from './Message'
import EventManager from '../util/EventManager'
import AppEvent from '../util/AppEvent'

export default {
  mixins: [ AppDataHelper ],
  components: {
    CategoryNavigation, Message, AdDetailResidential, AdDetailLand, AdDetailVacation, AdDetailCommercial, AdWarning
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
      }).catch((error) => {
        EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
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