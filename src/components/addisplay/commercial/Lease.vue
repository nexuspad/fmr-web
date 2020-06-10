<template>
  <div class="container p-0">
    <div class="row">
      <div class="col">
        <div v-if="hasAttributeValue('rate_sqft_year')">
          <label class="mr-1">Rate/SF/YR:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('rate_sqft_year')) }}</strong>
        </div>
        <div v-if="hasAttributeValue('rent')">
          <label>Rent by month:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('rent')) }}</strong>
        </div>
        <div v-if="hasAttributeValue('lease_term')">
          <label class="mr-1">Lease term:</label>{{ attributeValue('lease_term') }}
        </div>
      </div>
      <div class="col">
        <div>
          <label class="mr-1">Available:</label>{{ formatDate(attributeValue('available_date')) }}
        </div>
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