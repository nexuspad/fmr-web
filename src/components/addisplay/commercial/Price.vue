<template>
  <div class="container p-0">
    <div class="row" v-if="hasAttributeValue('price')">
      <div class="col">
        <div>
          <label>Asking price:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('price')) }}</strong>
        </div>
        <div>
          <label>Price per SF:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('price_per_sqft')) }}</strong>
        </div>
      </div>
      <div class="col">
        <span v-if="hasAttributeValue('owner_financing_available')">Owner financing available</span>
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('available_date')">
      <div class="col">
        <label class="mr-2">Available:</label><span>{{ attributeValue('available_date') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'
export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>