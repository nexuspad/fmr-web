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
    <div class="form-row mt-2" v-show="!ad.getAttribute(attributeId('represented_by_owner')).value">
      <div class="col-md-4">
        <label for="brokerage_company">Brokage or management company</label>
        <input type="text" class="form-control" id="brokerage_company"
          name="brokerage_company" v-model="ad.getAttribute(attributeId('brokerage_company')).value" />
      </div>
      <div class="col-md-3">
        <label for="mls_id">MLS or other ID</label>
        <input type="text" class="form-control" id="mls_id"
          name="mls_id" v-model="ad.getAttribute(attributeId('mls_id')).value" />
      </div>
    </div>
    <div class="form-row mt-2" v-show="!ad.getAttribute(attributeId('represented_by_owner')).value">
      <div class="col-md-8">
        <label for="company_web_address">Company web address</label>
        <input type="text" class="form-control" id="company_web_address" placeholder="http://company-web-address.com"
          name="company_web_address" v-model="ad.getAttribute(attributeId('company_web_address')).value" />
      </div>
    </div>
    <div class="form-row mt-2" v-if="isHomeStyle(ad.categoryId)">
      <div class="col-md-3">
        <label>Open house</label>
        <datepicker input-class="form-control" bootstrap-styling clear-button format="yyyy-MM-dd"
          v-model="ad.getAttribute(attributeId('open_house')).value" />
      </div>
      <div class="col-md-3">
        <label>hours</label>
        <input type="text" class="form-control" id="open_house_hours"
          name="open_house_hours" v-model="ad.getAttribute(attributeId('open_house_hours')).value" />
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
  components: {
    Datepicker
  }
}
</script>