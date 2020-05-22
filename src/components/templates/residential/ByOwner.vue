<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col">
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="fsbo" 
            v-model="ad.getAttribute(attributeId('represented_by_owner')).value" />
          <label class="custom-control-label" for="fsbo">Represented by owner (FSBO, FRBO)</label>
        </div>
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