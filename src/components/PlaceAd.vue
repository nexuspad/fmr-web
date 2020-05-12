<template>
  <div class="fmr-bordered-area">
    <div class="header">
      <div class="mr-2 float-right">
        <a class="far fa-times-circle fa-lg" @click="$router.back(-1)"></a>
      </div>
      <h1>Select a category</h1>
    </div>
    <div class="container m-0 p-4">
      <div class="row">
        <div class="col">
          <h2><small>FOR RENT</small></h2>
          <h3 class="ml-2"><small>Residential</small></h3>
          <ul class="list-group ml-4">
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3001)">Single family home for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3002)">Townhome/multiple-unit for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3004)">Condominium for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3003)">Apartment</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3029)">Manufactured home for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(2011)">Vacation rental</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(2007)">I need a roommate</a>
            </li>
          </ul>
          <h3 class="ml-2 mt-4"><small>Commercial</small></h3>
          <ul class="list-group ml-4">
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3008)">Office space for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3006)">Retail space for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3009)">Industrial space for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3007)">Shopping center for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3031)">Healthcare space for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3033)">Hospitality space for rent</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3010)">Mixed use and others</a>
            </li>
          </ul>
        </div>
        <div class="col pl-4">
          <h2><small>FOR SALE</small></h2>
          <h3 class="ml-2"><small>Residential</small></h3>
          <ul class="list-group ml-4">
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3011)">Single family home for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3012)">Townhouse/multi-unit for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3013)">Condominium for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3014)">Manufactured home for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3015)">Land for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3025)">Foreclosures</a>
            </li>
          </ul>
          <h3 class="ml-2 mt-4"><small>Commercial</small></h3>
          <ul class="list-group ml-4">
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3017)">Office building for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3016)">Retail space for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3021)">Industrial space for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3022)">Restaurant for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3030)">Shopping center for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3032)">Healthcare space for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3034)">Hospitality space for sale</a>
            </li>

            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3019)">Gas station/convenient store for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3023)">Land for sale</a>
            </li>
            <li class="list-group-item fmr-lg-text">
              <a href="javascript:;" @click="newAd(3024)">Mixed use and others</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    newAd(categoryId) {
      this.$router.push({ name: 'AdEdit', query: {categoryId: categoryId} });
    }
  }
}
</script>