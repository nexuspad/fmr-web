<template>
  <div class="container p-0">
    <div class="row" v-if="hasAttributeValue('price')">
      <div class="col">
        <label>Asking price:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('price')) }}</strong>
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
    <div class="row">
      <div class="col" v-if="hasAttributeValue('rate_sqft_year')">
        <label class="mr-1">Rate/SF/YR:</label>{{ attributeValue('rate_sqft_year') }}
      </div>
      <div class="col" v-if="hasAttributeValue('lease_term')">
        <label class="mr-1">Lease term:</label>{{ attributeValue('lease_term') }}
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('available_date')">
      <div class="col">
        <label class="mr-1">Available:</label>{{ attributeValue('available_date') }}
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