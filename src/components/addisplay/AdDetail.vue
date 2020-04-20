<template>
  <div class="container pl-0 mt-3 ml-4 mb-4 fmr-ad-detail">
    <div class="row">
      <div class="col-md-4">
        <div class="container">
          <div class="row">
            <div class="col">
              <img :src="ad.thumbnailUrl" v-if="ad.thumbnailUrl" class="img-fluid rounded shadow-sm" />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <h2>{{ ad.title }}</h2>
        <price-and-offers :ad="ad" />
        {{ ad.description }}
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <div class="container">
          <div class="row">
            <div class="col">
              <full-address :ad="ad" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <property :ad="ad" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <features :ad="ad" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'
import PriceAndOffers from './PriceAndOffers'
import FullAddress from './FullAddress'
import Property from './Property'
import Features from './Features'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    PriceAndOffers, FullAddress, Property, Features
  }
}
</script>