<template>
  <div>
    <top-navigation />
    <div>
      <category-navigation />
      <div class="fmr-bordered-area">
        <div class="header">
          <h1>{{ ad.title }}</h1>
        </div>
        <div class="container pl-0 ml-4">
          <div class="row">
            <div class="col-9">
              <h2><router-link :to="'/ad/' + ad.id">{{ ad.title }}</router-link></h2>
            </div>
            <div class="col-3">
              <div class="container">
                <div>
                  <div class="row">
                    <div class="col text-center">
                      price
                    </div>
                  </div>
                  <div class="row">
                    <div class="col text-center">
                      bath
                    </div>
                    <div class="col text-center">
                      bed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              {{ ad.description }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="container">
              <div class="row pb-1" v-for="attribute in ad.attributesTodisplay()" v-bind:key="attribute.id">
                <div class="col font-weight-bold">
                  {{ attributeName(attribute.id) }}
                </div>
                <div class="col-10">
                  {{ attribute.value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fmr-footer />
  </div>
</template>

<script>
import TopNavigation from './TopNavigation'
import CategoryNavigation from "./CategoryNavigation";
import FmrFooter from './FmrFooter'
import AdService from '../service/AdService'
import FmrAd from '../service/model/FmrAd'
import { attributeName } from '../service/AppData'

export default {
  components: {
    TopNavigation, CategoryNavigation, FmrFooter
  },
  data() {
    return {
      ad: new FmrAd()
    }
  },
  mounted() {
    const self = this
    AdService.getAd(this.$route.params.id).then((ad) => {
      self.ad = ad
    })
  },
  methods: {
    attributeName(id) {
      return attributeName(id)
    }
  }
}
</script>