<template>
  <!-- about the container padding: https://stackoverflow.com/questions/25427407/bootstrap-3-and-4-container-fluid-with-grid-adding-unwanted-padding -->
  <div class="fmr-ad-detail">
    <h2 class="fmr-red ml-4 mt-2">{{ ad.title }}</h2>
    <div class="container-fluid pl-0 mt-3 mb-4 fmr-ad-detail">
      <div class="row">
        <div class="col-md-4 border-right" v-if="ad.thumbnailUrl">
          <div class="container mb-4">
            <div class="row">
              <div class="col">
                <img :src="ad.thumbnailUrl" v-if="ad.thumbnailUrl" class="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
        <div class="col pb-4">
          <price-and-offers :ad="ad" v-if="isResidential(ad.categoryId)" />
          <title-rate-price :ad="ad" v-if="isCommercial(ad.categoryId)" />
          <div v-html=ad.description></div>
        </div>
        <div class="col-md-3">
          <div class="col"><contact :ad="ad" /></div>
        </div>
      </div>
      <hr class="border-bottom shadow-sm" style="margin-right:-15px;" />
      <div class="row mt-4">
        <div class="col">
          <div class="container-fluid pl-4">
            <div class="row">
              <div class="col-md-8">
                <full-address :ad="ad" />
                <location-and-schools :ad="ad" />
                <property :ad="ad" />
                <building-and-lot :ad="ad" />
              </div>
              <div class="col-md-4" v-if="ad.hasCoordinate()">
                <bing-map :ad="ad" />
              </div>
            </div>
            <div class="row" v-if="isResidential(ad.categoryId)">
              <div class="col"><features :ad="ad" /></div>
            </div>
            <div class="row">
              <div class="col"><com-amenities :ad="ad" /></div>
            </div>
            <div class="row">
              <div class="col"><tenancy :ad="ad" /></div>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-bottom shadow-sm" style="margin-right:-15px;" v-if="ad.photos.length > 0" />
      <div class="row no-gutters">
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
import LocationAndSchools from './LocationAndSchools'
import Contact from './Contact'
import Photos from './Photos'
import PriceAndOffers from './residential/PriceAndOffers'
import Property from './residential/Property'
import Features from './residential/Features'
import BuildingAndLot from './commercial/BuildingAndLot'
import TitleRatePrice from './commercial/TitleRatePrice'
import ComAmenities from './commercial/ComAmenities'
import Tenancy from './commercial/Tenancy'
import BingMap from './maps/BingMap'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    PriceAndOffers, FullAddress, LocationAndSchools, Property, Features, Contact,
    BuildingAndLot, TitleRatePrice, ComAmenities, Tenancy,
    Photos, BingMap
  }
}
</script>