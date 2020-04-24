<template>
  <div>
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
      <!-- photo album -->
      <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
        <div class="col" v-for="(photo, imageIndex) in ad.photos" v-bind:key="imageIndex">
          <div class="card">
            <img :src="photo.url" class="fmr-photo" @click="index = imageIndex" :description="photo.displayOrder" />
            <div class="card-body" v-if="photo.title">
              <h5 class="card-title">
                {{ photo.title }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-gallery :images="images" :index="index" @close="index = null" />
  </div>
</template>

<script>
import VueGallery from 'vue-gallery'
import AppDataHelper from '../AppDataHelper'
import PriceAndOffers from './PriceAndOffers'
import FullAddress from './FullAddress'
import Property from './Property'
import Features from './Features'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    PriceAndOffers, FullAddress, Property, Features, VueGallery
  },
  data() {
    return {
      index: null
    }
  },
  computed: {
    images: function() {
      return this.ad.photos.map((photo) => {
        return {href: photo.url, title: photo.title}
      })
    }
  }
}
</script>

<style scoped>
  .image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
</style> 