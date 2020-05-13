<template>
  <div>
    <div class="d-flex flex-row flex-wrap">
      <div class="card m-2" style="border:0 !important;" v-for="(photo, imageIndex) in ad.photos" v-bind:key="imageIndex">
        <img v-lazy="photo.url" class="fmr-photo rounded-lg" @click="index = imageIndex" :description="photo.displayOrder" />
        <div class="card-body" v-if="photo.title">
          <h5 class="card-title">
            {{ photo.title }}
          </h5>
        </div>
      </div>
    </div>
    <vue-gallery :images="images" :index="index" @close="index = null" />
  </div>
</template>

<script>
import VueGallery from 'vue-gallery'

import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  components: {
    VueGallery
  },
  props: ['ad'],
  computed: {
    images: function() {
      return this.ad.photos.map((photo) => {
        return {href: photo.url, title: photo.title}
      })
    }
  },
  data() {
    return {
      index: null
    }
  }
}
</script>