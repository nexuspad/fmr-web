<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="tenancy">Tenancy</label>
        <select id="tenancy" class="form-control" v-model="ad.getAttribute(attributeId('tenancy')).value" @change="updateTenancy()">
          <option :value="''">Choose...</option>
          <option v-for="(theValue, index) in attributeOptions('tenancy')" :key="index" :value="theValue">{{theValue}}</option>
        </select>
      </div>
      <div class="col-md-10" v-show="hasTenants">
        <label for="tenancy">Tenants</label>
        <textarea-autosize id="tenents" rows="2" class="form-control" v-model="ad.getAttribute(attributeId('tenants')).value"></textarea-autosize>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  data() {
    return {
      hasTenants: this.ad.getAttribute(this.attributeId('tenancy')).value == '' ? false : true
    }
  },
  methods: {
    updateTenancy() {
      this.hasTenants = this.ad.getAttribute(this.attributeId('tenancy')).value == '' ? false : true
    }
  }
}
</script>