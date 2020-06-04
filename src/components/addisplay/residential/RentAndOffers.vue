<template>
  <div class="container p-0">
    <div class="row">
      <div class="col">
        <div v-if="hasAttributeValue('rent')">
          <label>Monthly rent:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('rent')) }}</strong>
        </div>
        <div v-if="hasAttributeValue('security_deposit')">
          <label>Security deposit:</label>
          <strong class="fmr-green ml-1">{{ dollar(attributeValue('security_deposit')) }}</strong>
        </div>
        <div v-if="hasAttributeValue('other_fees')">
          <label>Other fees</label>
          <div class="ml-2" v-html="addLineBreak(attributeValue('other_fees'))"></div>
        </div>
        <div v-if="hasAttributeValue('rent_includes')">
          <label>Rent includes</label>
          <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
            <div class="mr-4" v-for="(value, index) in attributeValue('rent_includes')" :key="index">
              <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="mb-1" v-if="hasAttributeValue('available_date')">
          <label class="mr-2">Available:</label><span>{{ formatDate(attributeValue('available_date')) }}</span>
        </div>
        <div v-if="hasAttributeValue('special_offer')">
          <span class="bg-gradient-warning p-1 rounded">{{ attributeValue('special_offer') }}</span>
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