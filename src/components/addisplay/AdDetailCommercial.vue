<template>
  <!-- about the container padding: https://stackoverflow.com/questions/25427407/bootstrap-3-and-4-container-fluid-with-grid-adding-unwanted-padding -->
  <div class="fmr-ad-detail">
    <h2 class="fmr-red mt-2 pl-4">{{ ad.title }}</h2>
    <div class="container-fluid pl-2 mt-3 mb-4 fmr-ad-detail">
      <div class="row pl-2">
        <div class="col-md-4 border-right" v-if="ad.thumbnailUrl">
          <div class="container mb-4">
            <div class="row">
              <div class="col">
                <a href="#photos"><img :src="ad.thumbnailUrl" v-if="ad.thumbnailUrl" class="img-fluid rounded" /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col pl-4 pb-4">
          <lease :ad="ad" v-if="isForRent(ad.categoryId)" />
          <price :ad="ad" v-if="isForSale(ad.categoryId)" />
          <div v-html=convertLinks(ad.description) class="mt-3"></div>
        </div>
        <div class="col-md-3">
          <div class="col"><contact :ad="ad" /></div>
        </div>
      </div>
      <hr class="border-bottom shadow-sm" style="margin-right:-15px;" />
      <div class="row pl-4 mt-4">
        <div class="col">
          <div class="container-fluid pl-0">
            <div class="row">
              <div class="col-md-7">
                <full-address :ad="ad" />
                <building :ad="ad" />
                <lot :ad="ad" />
              </div>
              <div class="col-md-5" v-if="ad.hasCoordinate()">
                <bing-map :ad="ad" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <com-amenities :ad="ad" />
                <tenancy :ad="ad" />
                <financials :ad="ad" v-if="isForSale(ad.categoryId)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-bottom shadow-sm" style="margin-right:-15px;" v-if="ad.photos.length > 0" />
      <div class="row pl-2 no-gutters" id="photos">
        <div class="col">
          <photos :ad="ad" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'
import FullAddress from './FullAddress'
import Contact from './Contact'
import Photos from './Photos'
import Building from './commercial/Building'
import Lot from './commercial/Lot'
import Lease from './commercial/Lease'
import Price from './commercial/Price'
import ComAmenities from './commercial/ComAmenities'
import Tenancy from './commercial/Tenancy'
import Financials from './commercial/Financials'
import BingMap from './maps/BingMap'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    FullAddress, Contact,
    Building, Lot, Lease, Price, ComAmenities, Tenancy, Financials,
    Photos, BingMap
  }
}
</script>