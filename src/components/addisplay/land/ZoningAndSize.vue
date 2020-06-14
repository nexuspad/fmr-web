<template>
  <div class="pb-3 mb-2">
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('current_zoning')">
        <label>Zoning</label>
        <div>{{ attributeValue('current_zoning') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('zoning_code')">
        <label>Zoning Code</label>
        <div>{{ attributeValue('zoning_code') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('lot_size')">
        <label>Size</label>
        <div>{{ attributeValue('lot_size') }} AC</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('parcel_number')">
        <label>Parcel Id</label>
        <div>{{ attributeValue('parcel_number') }}</div>
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