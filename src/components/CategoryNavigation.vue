<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fmr-nav rounded mb-1">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#CategoryNavigator">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="CategoryNavigator" :key="forceRefreshKey">
        <ul class="navbar-nav">
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle py-0" href="#" id="forRentDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Real estate for rent
            </a>
            <div class="dropdown-menu" aria-labelledby="forRentDropdown">
              <div class="container fmr-lg-text">
                <div class="row">
                  <div class="col-md-6">
                    <h4 class="fmr-lg-text mt-2 ml-2 pb-2 border-bottom">
                      <router-link :to="getPath(2000)">Residential</router-link>
                    </h4>
                    <ul class="list-unstyled text-nowrap">
                      <li class="m-2"><router-link :to="getPath(3001)">Single family homes</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3002)">Townhomes/multi-units</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3003)">Apartments</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3004)">Condos</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3029)">Manufactured homes</router-link></li>
                      <li class="m-2"><router-link :to="getPath(2007)">Find roommate</router-link></li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h4 class="fmr-lg-text mt-2 ml-2 pb-2 border-bottom">
                      <router-link :to="getPath(2010)">Commercial</router-link>
                    </h4>
                    <ul class="list-unstyled text-nowrap">
                      <li class="m-2"><router-link :to="getPath(3008)">Office space</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3006)">Retail space</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3009)">Industrial space</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3007)">Shopping center</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3031)">Healthcare space</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3033)">Hospitality space</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3010)">Mixed use / others</router-link></li>
                    </ul>
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
                  <div class="col-md-6">
                    <h4 class="fmr-lg-text mt-2 ml-2 pb-2 border-bottom">
                      <router-link :to="getPath(2001)">Residential</router-link>
                    </h4>
                    <ul class="list-unstyled text-nowrap">
                      <li class="m-2"><router-link :to="getPath(3011)">Single family homes</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3012)">Townhomes/multi-units</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3013)">Condos</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3014)">Manufactured homes</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3015)">Land</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3025)">Foreclosures</router-link></li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h4 class="fmr-lg-text mt-2 ml-2 pb-2 border-bottom">
                      <router-link :to="getPath(2012)">Commercial</router-link>
                    </h4>
                    <ul class="list-unstyled">
                      <li class="m-2"><router-link :to="getPath(3017)">Office buildings</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3016)">Retail centers</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3021)">Industrial spaces</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3030)">Shopping center</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3032)">Healthcare</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3034)">Hospitality</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3022)">Restaurants</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3024)">Mixed use / others</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3023)">Land</router-link></li>
                    </ul>
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
                    <h4 class="fmr-md-text mt-2 ml-2 pb-2 border-bottom">
                      <router-link :to="getPath(2001, true)">All FSBO</router-link>
                    </h4>
                    <ul class="list-unstyled">
                      <li class="m-2"><router-link :to="getPath(3011, true)">Single family homes</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3012, true)">Townhomes/multi-units</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3013, true)">Condos</router-link></li>
                      <li class="m-2"><router-link :to="getPath(3014, true)">Manufactured homes</router-link></li>
                      <li class="m-2"><router-link :to="getPath(2011, true)">Land</router-link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link py-0" :to="getPath(2011)">Vacation rentals</router-link>
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
    getPath(categoryId, isFsbo) {
      if (isFsbo) {
        let {path} = AppContext.makePath({categoryId: categoryId, fsbo: true, page: 1})
        return path
      }
      let {path} = AppContext.makePath({categoryId: categoryId, fsbo: false, page: 1})
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