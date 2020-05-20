<template>
  <div class="border-bottom pb-3 mb-3">
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
          <label for="rate_per_night" class="required">Avg. rate per night</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text fmr-green bg-light">$</div>
            </div>
            <input type="text" class="form-control" id="rate_per_night"
              name="rate_per_night" v-model="ad.getAttribute(attributeId('rate_per_night')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <label for="special_offer">Special offer</label>
        <input type="text" class="form-control" id="special_offer"
          name="special_offer" v-model="ad.getAttribute(attributeId('special_offer')).value" />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-3">
        <label for="min_stay" class="required">Min. stay</label>
        <input type="text" class="form-control" id="min_stay"
          name="min_stay" v-model="ad.getAttribute(attributeId('min_stay')).value" />
      </div>
      <div class="col-md-6">
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
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
  }
}
</script>