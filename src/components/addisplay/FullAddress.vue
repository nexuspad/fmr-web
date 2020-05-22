<template>
  <div class="mb-2">
    <label>Property address</label>
    <div v-if="!hasAttributeValue('hide_address')">
      {{ attributeValue('street_address') }}
      {{ attributeValue('city') }}, {{ attributeValue('state') }} {{ attributeValue('zip_code') }}
    </div>
    <div v-if="hasAttributeValue('hide_address')">
      Details available upon request
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>