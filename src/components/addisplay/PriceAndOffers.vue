<template>
  <div class="container p-0">
    <div class="row" v-if="hasAttributeValue('asking_price')">
      <div class="col">
        <label>Asking price</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('asking_price')) }}</strong>
      </div>
      <div class="col">
        <span v-if="hasAttributeValue('owner_financing_available')">Owner financing available</span>
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('monthly_rent')">
      <div class="col">
        <label>Monthly rent</label>
        {{ attributeValue('monthly_rent') }}
      </div>
      <div class="col">
        <div v-if="hasAttributeValue('special_offer')">
          {{ attributeValue('special_offer') }}
        </div>
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('rent_includes')">
      <div class="col">
        <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
          <label>Rent includes</label>
          <div class="mr-4" v-for="(value, index) in attributeValue('rent_includes')" :key="index">
            <span class="p-2">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>