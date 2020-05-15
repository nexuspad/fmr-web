<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2" v-if="isSingleFamily(ad.categoryId) || isManufacturedHome(ad.categoryId) || isForeClosure(ad.categoryId)">
        <label for="lot_size">Lot size</label>
        <div class="input-group">
          <input type="text" class="form-control" id="lot_size" placeholder="ex. 0.62"
            name="lot_size" v-model="ad.getAttribute(attributeId('lot_size')).value" />
          <div class="input-group-append">
            <span class="input-group-text">AC</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="square_footage">Square footage</label>
        <div class="input-group">
          <input type="text" class="form-control" id="square_footage" placeholder="ex. 2000"
            name="square_footage" v-model="ad.getAttribute(attributeId('square_footage')).value" />
          <div class="input-group-append">
            <span class="input-group-text">SF</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="year_built">Year built</label>
        <input type="text" class="form-control" id="year_built"
          name="year_built" v-model="ad.getAttribute(attributeId('year_built')).value" />
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