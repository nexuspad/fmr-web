<template>
  <div>
    <label>Amenities</label>
    <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
      <div class="mr-4" v-for="(option, index) in attributeOptions('commercial_amenities')" :key="index">
        <input type="checkbox" v-model="ad.getAttribute(attributeId('commercial_amenities')).value" :id="index" :value="option" />
        <span class="p-2">{{ option }}</span>
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