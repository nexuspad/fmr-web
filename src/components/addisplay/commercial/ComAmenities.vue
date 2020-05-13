<template>
  <div>
    <div v-if="hasAttributeValue('commercial_amenities')">
      <label>Amenities</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(theValue, index) in ad.getAttribute(attributeId('commercial_amenities')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ theValue }}</span>
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