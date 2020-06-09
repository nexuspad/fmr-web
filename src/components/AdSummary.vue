<template>
  <div class="container">
    <div class="row pt-2">
      <div class="col-md-3">
        <router-link :to="'/ad/' + ad.id + '/' + ad.uri">
          <img v-lazy="ad.thumbnailUrl" v-if="ad.thumbnailUrl" class="img-fluid rounded shadow-sm" />
        </router-link>
        <div class="h-75 rounded shadow-sm text-center jumbotron" v-if="!ad.thumbnailUrl">
          <div class="mt-n2">{{ categoryName(ad.categoryId) }}</div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="container">
          <div class="row">
            <div class="col-md-9">
              <h2>
                <router-link :to="'/ad/' + ad.id + '/' + ad.uri" class="fmr-red">{{ ad.title }}</router-link>
                <span class="fmr-disapp ml-2" v-if="ad.isDisapproved()"></span>
                <span class="fmr-deact ml-2" v-if="ad.isDeactivated()"></span>
                <span class="fmr-forsale ml-2" v-if="isForSale(ad.categoryId)"></span>
                <span class="fmr-forrent ml-2" v-if="isForRent(ad.categoryId)"></span>
              </h2>
              <div class="lead" v-if="ad.city && ad.state"><span class="text-capitalize">{{ ad.city }}</span>, {{ ad.state }}</div>
            </div>
            <div class="col-md-3">
              <div class="container">
                <price-bed-bath :ad="ad" />
              </div>
            </div>
          </div>
          <div v-if="hasAttributeValue('special_offer')" class="mt-2">
            <span class="bg-gradient-warning p-1 rounded">{{ attributeValue('special_offer') }}</span>
          </div>
          <div class="row">
            <div class="col">
              {{ ad.subTitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from './AppDataHelper'
import PriceBedBath from './addisplay/residential/PriceBedBath'

export default {
  mixins: [ AppDataHelper ],
  components: {
    PriceBedBath
  },
  props: ['ad']
}
</script>