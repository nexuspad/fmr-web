<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="lot_size">Dimension</label>
        <input type="text" class="form-control" id="dimension"
          name="dimension" v-model="ad.getAttribute(attributeId('dimension')).value" />
      </div>
      <div class="col-md-2">
        <label for="model">Model</label>
        <input type="text" class="form-control" id="model"
          name="model" v-model="ad.getAttribute(attributeId('model')).value" />
      </div>
      <div class="col-md-2">
        <label for="community">Community type</label>
        <input type="text" class="form-control" id="community_type"
          name="community_type" v-model="ad.getAttribute(attributeId('community_type')).value" />
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