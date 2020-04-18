<template>
  <div class="form-inline">
    <div class="form-group">
      <label for="bedroom">Bedroom</label>
      <select id="bedroom" class="form-control mx-sm-3" v-model="ad.getAttribute(attributeId('bedroom')).value">
        <option v-for="(numOfBed, index) in ad.getAttribute(attributeId('bedroom')).options" :key="index" :value="numOfBed">{{numOfBed}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="bathroom">Bathroom</label>
      <select id="bathroom" class="form-control mx-sm-3" v-model="ad.getAttribute(attributeId('bathroom')).value">
        <option v-for="(numOfBath, index) in ad.getAttribute(attributeId('bathroom')).options" :key="index" :value="numOfBath">{{numOfBath}}</option>
      </select>
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