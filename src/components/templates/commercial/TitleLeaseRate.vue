<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-group">
      <div>
        <label for="title" class="required">Title</label>
        <input type="text" class="form-control" id="title" size="80" maxlength="80"
          name="title" v-model="ad.getAttribute(attributeId('title')).value" />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="rate_sqft_year" class="required">Rate/SF/YR</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text fmr-green bg-light">$</div>
            </div>
            <input type="text" class="form-control"
              name="rate_sqft_year" v-model="ad.getAttribute(attributeId('rate_sqft_year')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-4 pl-4">
        <label for="lease_term">Lease term</label>
        <input type="text" class="form-control" placeholder="1,2 Yrs / negotiable"
          name="lease_term" v-model="ad.getAttribute(attributeId('lease_term')).value" />
      </div>
      <available-date :ad="ad" />
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
