<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fmr-nav rounded mb-1">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" :key="forceRefreshKey">
        <ul class="navbar-nav">
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle py-0" href="#" id="forRentDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Rental homes and apartments
            </a>
            <div class="dropdown-menu" aria-labelledby="forRentDropdown">
              <div class="container fmr-lg-text">
                <div class="row">
                  <div class="col-6">
                    <h4 class="dropdown-header">Residential</h4>
                    <router-link class="dropdown-item primary" :to="getPath(3001)">Single family homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3002)">Townhomes/multi-units</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3003)">Apartments</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3004)">Condos</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(2007)">Find roommate</router-link>
                  </div>
                  <div class="col-6">
                    <h4 class="dropdown-header">Commercial</h4>
                    <router-link class="dropdown-item primary" :to="getPath(3006)">Retail spaces</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3007)">Shopping centers</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3008)">Office spaces</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3009)">Warehouse spaces</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3010)">Others</router-link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle py-0" href="#" id="forSaleDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Real estate for sale
            </a>
            <div class="dropdown-menu" aria-labelledby="forSaleDropdown">
              <div class="container fmr-lg-text">
                <div class="row">
                  <div class="col-6">
                    <h4 class="dropdown-header">Residential</h4>
                    <router-link class="dropdown-item primary" :to="getPath(3011)">Single family homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3012)">Townhomes/multi-units</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3013)">Condos</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3014)">Manufactured homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3015)">Land</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3025)">Foreclosures</router-link>
                  </div>
                  <div class="col-6">
                    <h4 class="dropdown-header">Commercial</h4>
                    <router-link class="dropdown-item primary" :to="getPath(3016)">Retail centers</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3017)">Office buildings</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3019)">Gas stations/stores</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3021)">Warehouse spaces</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3022)">Restaurants</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3023)">Land</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3024)">Others</router-link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle py-0" href="#" id="fsboDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              For sale by owner
            </a>
            <div class="dropdown-menu" aria-labelledby="fsboDropdown">
              <div class="container fmr-lg-text">
                <div class="row">
                  <div class="col-auto">
                    <router-link class="dropdown-item primary" :to="getPath(3011)">Single family homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3012)">Townhomes/multi-units</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3013)">Condos</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3014)">Manufactured homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(2011)">Land</router-link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link primary py-0" :to="getPath(2011)">Vacation rentals</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import AppContext from './AppContext'
import AppDataHelper from './AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  data() {
    return {
      forceRefreshKey: Date.now(),
      contextParams: {}
    }
  },
  methods: {
    getPath(categoryId) {
      if (AppContext.getState()) {
        return '/' + AppContext.getState() + '/' + this.categoryUri(categoryId)
      } else {
        return '/' + this.categoryUri(categoryId)
      }
    }
  },
  watch: {
    "$route.params": function() {
      console.log('.... refresh ....')
      this.forceRefreshKey = Date.now()
    }
  }
}
</script>