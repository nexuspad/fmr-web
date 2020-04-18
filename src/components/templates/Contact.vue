<template>
  <div>
    <div class="form-row">
      <div class="col-md-4">
        <label for="contact_name">Contact name</label>
        <input type="text" class="form-control" size="40" maxlength="40" id="contact_name"
          name="contact_name" v-model="ad.getAttribute(attributeId('contact_name')).value" />
      </div>
      <div class="col-md-4">
        <label for="contact_phone">phone</label>
        <input type="text" class="form-control" size="12" maxlength="20" id="contact_phone"
          name="contact_name" v-model="ad.getAttribute(attributeId('contact_phone')).value" />
      </div>
      <div class="col-md-4">
        <label for="contact_email">email</label>
        <input type="text" class="form-control" size="40" maxlength="80" id="contact_email"
          name="contact_name" v-model="ad.getAttribute(attributeId('contact_email')).value" />
      </div>
    </div>
    <div class="form-row mt-2">
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

    <div class="form-group mt-2">
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="byAgent" v-model="ad.getAttribute(attributeId('represented_by')).value" />
        <label class="custom-control-label" for="byAgent">Represented by agent</label>
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