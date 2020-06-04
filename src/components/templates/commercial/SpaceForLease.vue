<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row mb-2">
      <!-- office space -->
      <div class="col-md-2">
        <label for="space_size">Space size</label>
        <div class="input-group">
          <input type="text" class="form-control" id="space_size" placeholder="ex. 800"
            name="space_size" v-model="ad.getAttribute(attributeId('space_size')).value" />
          <div class="input-group-append">
            <span class="input-group-text">SF</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="building_size_sqft">Building size</label>
        <div class="input-group">
          <input type="text" class="form-control" id="building_size_sqft" placeholder="ex. 5000"
            name="building_size_sqft" v-model="ad.getAttribute(attributeId('building_size_sqft')).value" />
          <div class="input-group-append">
            <span class="input-group-text">SF</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="condition">Condition</label>
        <input type="text" class="form-control" id="condition" placeholder="Full Build-Out"
          name="condition" v-model="ad.getAttribute(attributeId('condition')).value" />
      </div>
      <div class="col-md-2">
        <label for="year_built">Year built</label>
        <input type="text" class="form-control" id="year_built"
          name="year_built" v-model="ad.getAttribute(attributeId('year_built')).value" />
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