<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row mb-2">
      <!-- office space -->
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
        <label for="typical_floor_size">Floor size</label>
        <div class="input-group">
          <input type="text" class="form-control" id="typical_floor_size" placeholder="ex. 2000"
            name="typical_floor_size" v-model="ad.getAttribute(attributeId('typical_floor_size')).value" />
          <div class="input-group-append">
            <span class="input-group-text">SF</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="gross_leasable_area">Gross leasable area</label>
        <div class="input-group">
          <input type="text" class="form-control" id="gross_leasable_area" placeholder="ex. 2000"
            name="gross_leasable_area" v-model="ad.getAttribute(attributeId('gross_leasable_area')).value" />
          <div class="input-group-append">
            <span class="input-group-text">SF</span>
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-2">
        <label for="building_class">Building class</label>
        <select id="building_class" class="form-control" v-model="ad.getAttribute(attributeId('building_class')).value">
          <option :value="''">Choose...</option>
          <option v-for="(theValue, index) in attributeOptions('building_class')" :key="index" :value="theValue">{{theValue}}</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="number_of_stories">Number of stories</label>
        <input type="text" class="form-control" id="number_of_stories" placeholder=""
          name="number_of_stories" v-model="ad.getAttribute(attributeId('number_of_stories')).value" />
      </div>
      <div class="col-md-2">
        <label for="condition">Condition</label>
        <input type="text" class="form-control" id="condition"
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