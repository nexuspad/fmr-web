<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2 mb-2">
        <label for="cap_rate">Cap rate</label>
        <input type="text" class="form-control" id="cap_rate" placeholder=""
          name="cap_rate" v-model="ad.getAttribute(attributeId('cap_rate')).value" />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-2">
        <label for="lot_size">Parcel number</label>
        <input type="text" class="form-control" id="parcel_number" placeholder=""
          name="parcel_number" v-model="ad.getAttribute(attributeId('parcel_number')).value" />
      </div>
      <div class="col-md-2">
        <label for="land_assessment">Land assessment</label>
        <input type="text" class="form-control" id="land_assessment" placeholder=""
          name="land_assessment" v-model="ad.getAttribute(attributeId('land_assessment')).value" />
      </div>
      <div class="col-md-2">
        <label for="improvement_assessment">Improvement assessment</label>
        <input type="text" class="form-control" id="improvement_assessment" placeholder=""
          name="improvement_assessment" v-model="ad.getAttribute(attributeId('improvement_assessment')).value" />
      </div>
      <div class="col-md-2">
        <label for="total_assessment">Total assessment</label>
        <input type="text" class="form-control" id="total_assessment" placeholder=""
          name="total_assessment" v-model="ad.getAttribute(attributeId('total_assessment')).value" />
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