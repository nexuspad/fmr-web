<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="bedroom" class="required">Bedroom</label>
        <select id="bedroom" class="form-control" v-model="ad.getAttribute(attributeId('bedroom')).value">
          <option :value="''">Choose...</option>
          <option v-for="(numOfBed, index) in attributeOptions('bedroom')" :key="index" :value="numOfBed">{{numOfBed}}</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="bathroom" class="required">Bathroom</label>
        <select id="bathroom" class="form-control" v-model="ad.getAttribute(attributeId('bathroom')).value">
          <option :value="''">Choose...</option>
          <option v-for="(numOfBath, index) in attributeOptions('bathroom')" :key="index" :value="numOfBath">{{numOfBath}}</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="contact_phone">Basement</label>
        <select id="basement" class="form-control" v-model="ad.getAttribute(attributeId('basement')).value">
          <option :value="''">Choose...</option>
          <option v-for="(theValue, index) in attributeOptions('basement')" :key="index" :value="theValue">{{theValue}}</option>
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