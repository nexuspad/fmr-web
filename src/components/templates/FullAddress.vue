<template>
  <div>
    <div class="form-row">
      <div class="form-group col-md-9 mb-0">
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input id="inputAddress" type="text" class="form-control" placeholder="" size="80" maxlength="80"
            name="title" v-model="ad.getAttribute(attributeId('street_address')).value" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-3">
        <label for="inputCity">City</label>
        <input type="text" class="form-control" id="inputCity" v-model="ad.getAttribute(attributeId('city')).value">
      </div>
      <div class="form-group col-md-3">
        <label for="inputState">State</label>
        <select id="inputState" class="form-control" v-model="ad.getAttribute(attributeId('state')).value">
          <option selected>Choose...</option>
          <option v-for="(name, code) in states" :key="code" :value="code">{{name}}</option>
        </select>
      </div>
      <div class="form-group col-md-1">
        <label for="inputZip">Zip</label>
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
  props: ['ad']
}
</script>