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
              Real estate for rent
            </a>
            <div class="dropdown-menu" aria-labelledby="forRentDropdown">
              <div class="container fmr-lg-text">
                <div class="row">
                  <div class="col-6">
                    <h4 class="dropdown-header">
                      <router-link :to="getPath(2000)">Residential</router-link>
                    </h4>
                    <router-link class="dropdown-item primary" :to="getPath(3001)">Single family homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3002)">Townhomes/multi-units</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3003)">Apartments</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3004)">Condos</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3029)">Manufactured homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(2007)">Find roommate</router-link>
                  </div>
                  <div class="col-6">
                    <h4 class="dropdown-header">
                      <router-link :to="getPath(2010)">Commercial</router-link>
                    </h4>
                    <router-link class="dropdown-item primary" :to="getPath(3008)">Office space</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3006)">Retail space</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3009)">Industrial space</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3007)">Shopping center</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3031)">Healthcare space</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3033)">Hospitality space</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3010)">Mixed use / others</router-link>
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
                    <h4 class="dropdown-header">
                      <router-link :to="getPath(2001)">Residential</router-link>
                    </h4>
                    <router-link class="dropdown-item primary" :to="getPath(3011)">Single family homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3012)">Townhomes/multi-units</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3013)">Condos</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3014)">Manufactured homes</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3015)">Land</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3025)">Foreclosures</router-link>
                  </div>
                  <div class="col-6">
                    <h4 class="dropdown-header">
                      <router-link :to="getPath(2011)">Commercial</router-link>
                    </h4>
                    <router-link class="dropdown-item primary" :to="getPath(3017)">Office buildings</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3016)">Retail centers</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3021)">Industrial spaces</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3030)">Shopping center</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3032)">Healthcare</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3034)">Hospitality</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3022)">Restaurants</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3024)">Mixed use / others</router-link>
                    <router-link class="dropdown-item primary" :to="getPath(3023)">Land</router-link>
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
      let {path} = AppContext.makePath({categoryId: categoryId})
      return path
    }
  },
  watch: {
    "$route.params": function() {
      this.forceRefreshKey = Date.now()
    }
  }
}
</script>