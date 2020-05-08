<template>
  <div>
    <div class="form-row">
      <div class="col-md-4">
        <label for="contact_name">Contact name</label>
        <input type="text" class="form-control" id="contact_name"
          name="contact_name" v-model="ad.getAttribute(attributeId('contact_name')).value" />
      </div>
      <div class="col-md-4">
        <label for="contact_phone">phone</label>
        <input type="text" class="form-control" id="contact_phone"
          name="contact_name" v-model="ad.getAttribute(attributeId('contact_phone')).value" />
      </div>
      <div class="col-md-4">
        <label for="contact_email">email</label>
        <input type="text" class="form-control" id="contact_email"
          name="contact_name" v-model="ad.getAttribute(attributeId('contact_email')).value" />
      </div>
    </div>
    <div class="form-row mt-2" v-if="isHomeStyle(ad.categoryId)">
      <div class="col-md-3">
        <label>Open house</label>
        <datepicker input-class="form-control" v-model="ad.getAttribute(attributeId('open_house')).value" />
      </div>
      <div class="col-md-3">
        <label>hours</label>
        <input type="text" class="form-control" id="open_house_hours"
          name="open_house_hours" v-model="ad.getAttribute(attributeId('open_house_hours')).value" />
      </div>
    </div>

    <div class="form-row mt-4">
      <div class="col">
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="byAgent" 
            v-model="byAgent" @change="updateRepresentation()" />
          <label class="custom-control-label" for="byAgent">Represented by agent</label>
        </div>
      </div>
    </div>
    <div class="form-row mt-2" v-show="byAgent">
      <div class="col-md-3">
        <label for="brokerage_company">Brokage company</label>
        <input type="text" class="form-control" id="brokerage_company"
          name="brokerage_company" v-model="ad.getAttribute(attributeId('brokerage_company')).value" />
      </div>
      <div class="col-md-3">
        <label for="mls_id">MLS ID</label>
        <input type="text" class="form-control" id="mls_id"
          name="mls_id" v-model="ad.getAttribute(attributeId('MLS_ID')).value" />
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'
import Datepicker from 'vuejs-datepicker';

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  data() {
    return {
      byAgent: this.isByAgent()
    }
  },
  components: {
    Datepicker
  },
  methods: {
    isByAgent() {
      if (this.ad.getAttribute(this.attributeId('represented_by')).value === 'agent' ||
        this.ad.getAttribute(this.attributeId('brokerage_company')).value ||
        this.ad.getAttribute(this.attributeId('MLS_ID')).value) {
          return true
        }
      return false
    },
    updateRepresentation() {
      if (this.byAgent) {
        this.ad.getAttribute(this.attributeId('represented_by')).value = 'agent'
      } else {
        this.ad.getAttribute(this.attributeId('represented_by')).value = 'owner'
      }
    }
  }
}
</script>