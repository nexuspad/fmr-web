<template>
  <div>
    <div class="form-group">
      <div>
        <label for="title" class="required">Title</label>
        <input type="text" class="form-control input-underline" id="title" size="80" maxlength="80"
          name="title" v-model="ad.getAttribute(attributeId('title')).value" />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-3">
        <div class="form-group">
          <label for="monthly_rent">Monthly rent</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">$</div>
            </div>
            <input type="text" class="form-control" placeholder="Monthly rent" id="monthly_rent"
              name="monthly_rent" v-model="ad.getAttribute(attributeId('monthly_rent')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label>Available date</label>
        <datepicker input-class="form-control" v-model="ad.getAttribute(attributeId('available_date')).value" />
      </div>
      <div class="col-md-7">
        <label for="special_offer">Special offer</label>
        <input type="text" class="form-control" id="special_offer"
          name="special_offer" v-model="ad.getAttribute(attributeId('special_offer')).value" />
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