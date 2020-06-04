<template>
  <div class="mb-4">
    <div class="mr-4 mb-4" v-if="hasAttributeValue('close_to')">
      <label>What's nearby</label>
      <div v-html="addLineBreak(attributeValue('close_to'))"></div>
    </div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('zoning_code')">
        <label>Zoning code</label>
        <div>{{ attributeValue('zoning_code') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('lot_size')">
        <label>Lot size</label>
        <div>{{ attributeValue('lot_size') }} SF</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('parking')">
        <label>Parking space</label>
        <div>{{ attributeValue('parking') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('parking_ratio')">
        <label>Parking ratio</label>
        <div>{{ attributeValue('parking_ratio') }} SF</div>
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