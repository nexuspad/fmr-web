<template>
  <div class="pb-3 mb-2">
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('property_type')">
        <label>Property type</label>
        <div>{{ attributeValue('property_type') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('foreclosure_phase')">
        <label>Phase</label>
        <div>{{ attributeValue('foreclosure_phase') }}</div>
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