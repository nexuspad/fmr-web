<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="form-group col-md-8 mb-0">
        <div class="form-group">
          <label for="inputAddress" class="required" v-if="!isLand(ad.categoryId)">Street address</label>
          <label for="inputAddress" class="required" v-if="isLand(ad.categoryId)">Address</label>
          <input id="inputAddress" type="text" class="form-control"
            name="title" v-model="ad.getAttribute(attributeId('street_address')).value" />
        </div>
      </div>
      <div class="form-group col-md-4 mb-0">
        <div class="form-group" v-if="!isLand(ad.categoryId)">
          <label for="inputAddress2">Building, unit, suite, floor, etc.</label>
          <input id="inputAddress2" type="text" class="form-control"
            name="title" v-model="ad.getAttribute(attributeId('address_line_2')).value" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-3">
        <label for="inputCity" class="required">City</label>
        <input type="text" class="form-control" id="inputCity" v-model="ad.getAttribute(attributeId('city')).value">
      </div>
      <div class="form-group col-md-3">
        <label for="inputState" class="required">State</label>
        <select id="inputState" class="form-control" v-model="ad.getAttribute(attributeId('state')).value">
          <option :value="''">Choose...</option>
          <option v-for="(name, code) in selectableStates" :key="code" :value="code">{{name}}</option>
        </select>
      </div>
      <div class="form-group col-md-1">
        <label for="inputZip" class="required">Zip</label>
        <input type="text" class="form-control" id="inputZip" v-model="ad.getAttribute(attributeId('zip_code')).value">
      </div>
      <div class="form-group col-md-2">
        <label for="inputCounty">County</label>
        <input type="text" class="form-control" id="inputCounty" v-model="ad.getAttribute(attributeId('county')).value">
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  computed: {
    selectableStates: function() {
      let states = Object.assign({}, this.states())
      delete states['ALL']
      return states
    }
  }
}
</script>