<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row" v-if="isForeClosure(ad.categoryId)">
      <div class="col-md-3">
        <label for="property_type">Property type</label>
        <select id="property_type" class="form-control" v-model="ad.getAttribute(attributeId('property_type')).value">
          <option :value="''">Choose...</option>
          <option v-for="(type, index) in attributeOptions('property_type')" :key="index" :value="type">{{type}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="foreclosure_phase">Phase</label>
        <select id="foreclosure_phase" class="form-control" v-model="ad.getAttribute(attributeId('foreclosure_phase')).value">
          <option :value="''">Choose...</option>
          <option v-for="(phase, index) in attributeOptions('foreclosure_phase')" :key="index" :value="phase">{{phase}}</option>
        </select>
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
