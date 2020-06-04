<template>
  <div class="row mb-4" v-if="hasAttributeValue('tenancy')">
    <div class="col-md-2">
      <label>Tenancy</label>
      <div class="text-capitalize">{{ attributeValue('tenancy') }}</div>
    </div>
    <div class="col-md-10" v-if="hasAttributeValue('tenants')">
      <label>Tenants</label>
      <div v-html="addLineBreak(attributeValue('tenants'))"></div>
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