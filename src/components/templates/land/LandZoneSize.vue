<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="current_zoning">Zoning</label>
        <select id="current_zoning" class="form-control" v-model="ad.getAttribute(attributeId('current_zoning')).value">
          <option :value="''">Choose...</option>
          <option v-for="(theValue, index) in attributeOptions('current_zoning')" :key="index" :value="theValue">{{theValue}}</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="zoning_code">Zoning code</label>
        <input type="text" class="form-control" id="zoning_code" placeholder=""
          name="zoning_code" v-model="ad.getAttribute(attributeId('zoning_code')).value" />
      </div>
      <div class="col-md-2">
        <label for="lot_size">Size</label>
        <div class="input-group">
          <input type="text" class="form-control" id="lot_size" placeholder="ex. 1.68"
            name="lot_size" v-model="ad.getAttribute(attributeId('lot_size')).value" />
          <div class="input-group-append">
            <span class="input-group-text">AC</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="parcel_id">Parcel number</label>
        <input type="text" class="form-control" id="parcel_id" placeholder=""
          name="parcel_id" v-model="ad.getAttribute(attributeId('parcel_number')).value" />
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