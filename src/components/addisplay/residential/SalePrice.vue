<template>
  <div class="container p-0">
    <div class="row" v-if="hasAttributeValue('price')">
      <div class="col-6">
        <label>Asking price:</label>
        <strong class="fmr-green ml-1">{{ dollar(attributeValue('price')) }}</strong>
        <div v-if="hasAttributeValue('owner_financing_available')">Owner financing available</div>
      </div>
      <div class="col-6" v-if="hasAttributeValue('hoa_fee')">
        <label>HOA fee:</label>
        <span class="fmr-green ml-1">{{ dollar(attributeValue('hoa_fee')) }}</span> per month
      </div>
    </div>
    <div class="row" v-if="hasAttributeValue('special_offer')">
      <div class="col pt-2">
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