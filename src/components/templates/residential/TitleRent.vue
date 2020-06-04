<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row mb-4">
      <div class="col-md-9">
        <label for="title" class="required">Title</label>
        <input type="text" class="form-control" id="title" size="80" maxlength="80"
          name="title" v-model="ad.getAttribute(attributeId('title')).value" />
      </div>
      <available-date :ad="ad" />
    </div>
    <div class="form-row">
      <div class="col-md-3">
        <div class="form-group">
          <label for="monthly_rent" class="required">Monthly rent</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text fmr-green bg-light">$</div>
            </div>
            <input type="text" class="form-control" id="monthly_rent"
              name="monthly_rent" v-model="ad.getAttribute(attributeId('rent')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="sec_dep">Security deposit</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text fmr-green bg-light">$</div>
            </div>
            <input type="text" class="form-control" id="sec_dep"
              name="security_deposit" v-model="ad.getAttribute(attributeId('security_deposit')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group" v-if="isApartment(ad.categoryId)">
          <label for="other_fees">Other fees</label>
          <textarea-autosize id="ppd" class="form-control" v-model="ad.getAttribute(attributeId('other_fees')).value"
            :min-height="20" :max-height="80"></textarea-autosize>
        </div>
      </div>      
    </div>
    <div class="form-row">
      <div class="col-md-9">
        <label for="special_offer">Special offer</label>
        <input type="text" class="form-control" id="special_offer"
          name="special_offer" v-model="ad.getAttribute(attributeId('special_offer')).value" />
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'
import AvailableDate from '../AvailableDate'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    AvailableDate
  }
}
</script>