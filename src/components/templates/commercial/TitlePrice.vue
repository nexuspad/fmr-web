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
          <label for="asking_price" class="required">Asking price</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text fmr-green bg-light">$</div>
            </div>
            <input type="text" class="form-control"
              name="asking_price" v-model="ad.getAttribute(attributeId('price')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-4 pl-4">
        <label for="price_per_sqft">Price per SF</label>
        <input type="text" class="form-control"
          name="price_per_sqft" v-model="ad.getAttribute(attributeId('price_per_sqft')).value" />
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
