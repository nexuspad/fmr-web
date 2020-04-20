<template>
  <div class="border-bottom pb-3 mb-3">
      <label for="other_am">Other amenities</label>
      <textarea-autosize id="other_am" class="form-control" v-model="ad.getAttribute(attributeId('other_amenities')).value"
        :min-height="30"></textarea-autosize>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>