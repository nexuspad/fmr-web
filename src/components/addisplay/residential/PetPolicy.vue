<template>
  <div class="mb-2" v-if="hasAttributeValue('pet_allowed')">
    <label>Pet policy</label>
    <div v-if="attributeValue('pet_allowed')">
      <div v-if="!hasAttributeValue('pet_policy_details')">
        Yes
      </div>
      <div v-html="addLineBreak(attributeValue('pet_policy_details'))" v-if="hasAttributeValue('pet_policy_details')"></div>
    </div>
    <div v-if="!attributeValue('pet_allowed')">
      No pets
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