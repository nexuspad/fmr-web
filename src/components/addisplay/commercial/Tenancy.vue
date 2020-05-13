<template>
  <div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('tenancy')">
        <label>Tenancy</label>
        <div>{{ attributeValue('tenancy') }}</div>
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