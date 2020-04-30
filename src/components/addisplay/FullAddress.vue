<template>
  <div>
    <label>Property address:</label>
    {{ attributeValue('street_address') }}
    {{ attributeValue('city') }}, {{ attributeValue('state') }} {{ attributeValue('zip_code') }}
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>