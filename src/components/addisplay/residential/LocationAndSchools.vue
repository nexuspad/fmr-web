<template>
  <div class="mb-4">
    <div class="d-flex flex-row flex-wrap bd-highlight mb-2" v-if="hasAttributeValue('neighborhood') || hasAttributeValue('close_to')">
      <div class="mr-4" v-if="hasAttributeValue('neighborhood')">
        <label>Neighborhood</label>
        <div>{{ attributeValue('neighborhood') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('close_to')">
        <label>What's nearby</label>
        <div v-html="addLineBreak(attributeValue('close_to'))"></div>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('elementary_school')">
        <label>Elementary school</label>
        <div>{{ attributeValue('elementary_school') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('middle_school')">
        <label>Middle school</label>
        <div>{{ attributeValue('middle_school') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('high_school')">
        <label>High school</label>
        <div>{{ attributeValue('high_school') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('college')">
        <label>College</label>
        <div>{{ attributeValue('college') }}</div>
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