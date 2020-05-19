<template>
  <div class="mb-2" v-if="hasAttributeValue('pet_policy')">
    <label>Pet policy</label>
    <div v-if="attributeValue('pet_policy') == 'yes'">
      <div v-if="!hasAttributeValue('pet_policy_details')">
        Yes
      </div>
      <div v-if="hasAttributeValue('pet_policy_details')">
        {{ attributeValue('pet_policy_details') }}
      </div>
    </div>
    <div v-if="attributeValue('pet_policy') == 'no'">
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