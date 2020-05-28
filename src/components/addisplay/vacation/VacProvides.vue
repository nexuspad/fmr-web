<template>
  <div>
    <div v-if="hasAttributeValue('vac_kitchen_provided')">
      <label>Kitchen</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('vac_kitchen_provided')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('vac_other_provided')">
      <label>Provided</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('vac_other_provided')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('vac_amenities')">
      <label>Amenities</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('vac_amenities')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('other_amenities')">
      <label>Other amenities</label>
      <div v-html="addLineBreak(attributeValue('other_amenities'))"></div>
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