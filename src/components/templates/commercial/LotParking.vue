<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2" v-if="isForSale(ad.categoryId)">
        <label for="zoning_code">Zoning code</label>
        <input type="text" class="form-control" id="zoning_code" placeholder="ex. M1"
          name="zoning_code" v-model="ad.getAttribute(attributeId('zoning_code')).value" />
      </div>
      <div class="col-md-2">
        <label for="lot_size">Lot size</label>
        <div class="input-group">
          <input type="text" class="form-control" id="lot_size" placeholder="ex. 3.14"
            name="lot_size" v-model="ad.getAttribute(attributeId('lot_size')).value" />
          <div class="input-group-append">
            <span class="input-group-text">AC</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="lot_size">Parking space</label>
        <input type="text" class="form-control" id="parking" placeholder="ex. 20 surface, 50 garage"
          name="parking" v-model="ad.getAttribute(attributeId('parking')).value" />
      </div>
      <div class="col-md-2">
        <label for="parking_ratio">Parking ratio</label>
        <input type="text" class="form-control" id="parking_ratio" placeholder="ex. 10/1000 SF"
          name="parking_ratio" v-model="ad.getAttribute(attributeId('parking_ratio')).value" />
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