<template>
  <div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('cap_rate')">
        <label>Cap rate</label>
        <div>{{ attributeValue('cap_rate') }}%</div>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('parcel_number')">
        <label>Parcel number</label>
        <div>{{ attributeValue('parcel_number') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('land_assessment')">
        <label>Land assessment</label>
        <div>{{ dollar(attributeValue('land_assessment')) }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('improvement_assessment')">
        <label>Improvement assessment</label>
        <div>{{ dollar(attributeValue('improvement_assessment')) }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('total_assessment')">
        <label>Total assessment</label>
        <div>{{ dollar(attributeValue('total_assessment')) }}</div>
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