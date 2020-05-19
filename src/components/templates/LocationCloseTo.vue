<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row mb-2" v-if="isHomeStyle(ad.categoryId)">
      <label for="neighborhood">Neighborhood</label>
      <input type="text" class="form-control" id="neighborhood" v-model="ad.getAttribute(attributeId('neighborhood')).value" />
    </div>
    <div class="form-row">
      <label for="close_to">What's nearby</label>
      <textarea-autosize id="close_to" rows="2" class="form-control" v-model="ad.getAttribute(attributeId('close_to')).value"></textarea-autosize>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>