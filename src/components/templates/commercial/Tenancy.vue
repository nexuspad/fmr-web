<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="tenancy">Tenancy</label>
        <select id="tenancy" class="form-control" v-model="ad.getAttribute(attributeId('tenancy')).value">
          <option :value="''">Choose...</option>
          <option v-for="(theValue, index) in attributeOptions('tenancy')" :key="index" :value="theValue">{{theValue}}</option>
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