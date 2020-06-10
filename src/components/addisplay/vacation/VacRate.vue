<template>
  <div class="container p-0">
    <div class="row">
      <div class="col-md-3">
        <div v-if="hasAttributeValue('rate_per_night')">
          <label>Rate per night:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('rate_per_night')) }}</strong>
        </div>
        <div v-if="hasAttributeValue('rent')">
          <label>Rent by month:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('rent')) }}</strong>
        </div>
      </div>
      <div class="col-md-9">
        <div v-if="hasAttributeValue('special_offer')">
          <label class="mr-1">Special:</label>
          <span class="bg-gradient-warning p-1 rounded">{{ attributeValue('special_offer') }}</span>
        </div>
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('min_stay')">
      <div class="col-md-3">
        <label>Min stay:</label>
        <span class="ml-1">{{ attributeValue('min_stay') }}</span>
      </div>
      <div class="col-md-3">
        <label>Deposit:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('security_deposit')) }}</strong>
      </div>
      <div class="col-md-6">
        <label>Cancellation policy</label>
        <div class="ml-1">{{ attributeValue('cancellation_policy') }}</div>
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