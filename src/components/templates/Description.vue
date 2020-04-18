<template>
  <div class="border-bottom pb-3 mb-3">
      <label for="desc">Description</label>
      <textarea-autosize id="desc" class="form-control" v-model="ad.getAttribute(attributeId('description')).value"
        :min-height="200"></textarea-autosize>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>