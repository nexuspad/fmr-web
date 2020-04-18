<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <img :src="ad.thumbnailUrl" v-if="ad.thumbnailUrl" class="img-fluid rounded shadow-sm" />
        <div class="h-75 rounded shadow-sm text-center jumbotron" v-if="!ad.thumbnailUrl">
          <div class="mt-n2">{{ categoryName(ad.category.id) }}</div>
        </div>
      </div>
      <div class="col-9">
        <div class="container">
          <div class="row">
            <div class="col-9">
              <h2><router-link :to="'/ad/' + ad.id" class="fmr-red">{{ ad.title }}</router-link></h2>
              <div class="lead">{{ ad.city }}, {{ ad.state }}</div>
            </div>
            <div class="col-3">
              <div class="container">
                <div>
                  <div class="row">
                    <div class="col text-center">
                      price
                    </div>
                  </div>
                  <div class="row">
                    <div class="col text-center">
                      bath
                    </div>
                    <div class="col text-center">
                      bed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              {{ ad.description.substr(0, 280) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from './AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>