<template>
  <div class="container p-0">
    <div class="row" v-if="hasAttributeValue('asking_price')">
      <div class="col">
        <label>Asking price:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('asking_price')) }}</strong>
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
    <div class="row" v-if="hasAttributeValue('monthly_rent')">
      <div class="col">
        <label>Monthly rent:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('monthly_rent')) }}</strong>
      </div>
      <div class="col">
        <div v-if="hasAttributeValue('special_offer')">
          <span class="bg-gradient-warning p-1 rounded">{{ attributeValue('special_offer') }}</span>
        </div>
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('security_deposit')">
      <div class="col">
        <label>Security deposit:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('security_deposit')) }}</strong>
      </div>
    </div>
    <div class="row pt-2" v-if="hasAttributeValue('rent_includes')">
      <div class="col">
        <label>Rent includes</label>
        <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
          <div class="mr-4" v-for="(value, index) in attributeValue('rent_includes')" :key="index">
            <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
          </div>
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