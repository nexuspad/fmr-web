<template>
  <div class="border-bottom pb-3 mb-3">
      <label for="close_to">Location close to</label>
      <textarea-autosize id="close_to" rows="2" class="form-control" v-model="ad.getAttribute(attributeId('close_to')).value"></textarea-autosize>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>