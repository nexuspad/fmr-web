<template>
  <div class="container p-0">
    <div class="row" v-if="hasAttributeValue('rate_per_night')">
      <div class="col">
        <label>Rate per night:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('rate_per_night')) }}</strong>
      </div>
      <div class="col">
        <div v-if="hasAttributeValue('special_offer')">
          <span class="bg-gradient-warning p-1 rounded">{{ attributeValue('special_offer') }}</span>
        </div>
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('min_stay')">
      <div class="col">
        <label>Min stay:</label>
        <span class="ml-1">{{ attributeValue('min_stay') }}</span>
      </div>
      <div class="col">
        <label>Security deposit:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('security_deposit')) }}</strong>
      </div>
      <div class="col">
        <label>Cancellation policy:</label>
        <span class="ml-1">{{ attributeValue('cancellation_policy') }}</span>
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