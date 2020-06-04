<template>
  <div class="mb-4">
    <label>Property address</label>
    <div v-if="!hideAddress">
      {{ attributeValue('street_address') }}
      <span v-if="attributeValue('address_line_2')">{{ attributeValue('address_line_2') }},</span>
      {{ attributeValue('city') }}, {{ attributeValue('state') }} {{ attributeValue('zip_code') }}
    </div>
    <div v-if="hideAddress">
      Details available upon request
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  computed: {
    hideAddress() {
      return this.ad.getAttribute(this.attributeId('hide_address')).value == true
    }
  }
}
</script>