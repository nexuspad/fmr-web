<template>
  <div class="mb-3">
    <div>
      <label>Kitchen</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(option, index) in attributeOptions('vac_kitchen_provided')" :key="index">
          <input type="checkbox" v-model="ad.getAttribute(attributeId('vac_kitchen_provided')).value" :id="index" :value="option" />
          <span class="p-2">{{ option }}</span>
        </div>
      </div>
    </div>
    <div>
      <label>Included</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(option, index) in attributeOptions('vac_other_provided')" :key="index">
          <input type="checkbox" v-model="ad.getAttribute(attributeId('vac_other_provided')).value" :id="index" :value="option" />
          <span class="p-2">{{ option }}</span>
        </div>
      </div>
    </div>
    <div>
      <label>Amenities</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(option, index) in attributeOptions('vac_amenities')" :key="index">
          <input type="checkbox" v-model="ad.getAttribute(attributeId('vac_amenities')).value" :id="index" :value="option" />
          <span class="p-2">{{ option }}</span>
        </div>
      </div>
    </div>
    <other-amenities :ad="ad" />
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'
import OtherAmenities from '../OtherAmenities'

export default {
  mixins: [ AppDataHelper ],
  components: {
    OtherAmenities
  },
  props: ['ad']
}
</script>