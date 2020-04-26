<template>
  <div>
    <div v-if="hasAttributeValue('kitchen_and_dining')">
      <label>Kitchen and dining</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('kitchen_and_dining')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('interior')">
      <label>Interior</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('interior')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('bed_and_bath')">
      <label>Bed and bath</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('bed_and_bath')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('exterior')">
      <label>Exterior</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('exterior')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('community')">
      <label>Community</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('community')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('condo_amenities')">
      <label>Community amenities</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('condo_amenities')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('apartment_unit_amenities')">
      <label>Unit amenities</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('apartment_unit_amenities')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('apartment_amenities')">
      <label>Unit amenities</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(value, index) in ad.getAttribute(attributeId('apartment_amenities')).value" :key="index">
          <span class="p-2 text-nowrap"><i class="fas fa-check fa-xs mr-1"></i>{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-if="hasAttributeValue('other_amenities')">
      <label>Other amenities</label>
      <div>
        {{ attributeValue('other_amenities') }}
      </div>
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