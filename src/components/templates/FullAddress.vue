<template>
  <div>
    <div class="form-group">
      <label for="inputAddress">Address</label>
      <input id="inputAddress" type="text" class="form-control" placeholder="" size="80" maxlength="80"
        name="title" v-model="ad.getAttribute('address').value" />
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCity">City</label>
        <input type="text" class="form-control" id="inputCity" v-model="ad.getAttribute('city').value">
      </div>
      <div class="form-group col-md-4">
        <label for="inputState">State</label>
        <select id="inputState" class="form-control" v-model="ad.getAttribute('state').value">
          <option selected>Choose...</option>
          <option v-for="(name, code) in states" :key="code" :value="code">{{name}}</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="inputZip">Zip</label>
        <input type="text" class="form-control" id="inputZip" v-model="ad.getAttribute('zip_code').value">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCounty">County</label>
        <input type="text" class="form-control" id="inputCounty" v-model="ad.getAttribute('county').value">
      </div>
    </div>
  </div>
</template>

<script>
import { STATES } from '../../service/AppData'

export default {
  data () {
    return {
      states: STATES
    };
  },
  props: ['ad']
}
</script>