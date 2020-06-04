<template>
  <div class="mb-4">
    <div class="mr-4 mb-4" v-if="hasAttributeValue('close_to')">
      <label>What's nearby</label>
      <div v-html="addLineBreak(attributeValue('close_to'))"></div>
    </div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('bedroom')">
        <label>Bedroom</label>
        <div>{{ attributeValue('bedroom') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('sleeps')">
        <label>Sleeps</label>
        <div>{{ attributeValue('sleeps') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('bathroom')">
        <label>Bathroom</label>
        <div>{{ attributeValue('bathroom') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('square_footage')">
        <label>Square footage</label>
        <div>{{ attributeValue('square_footage') }} SF</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('parking')">
        <label>Parking</label>
        <div>{{ attributeValue('parking') }}</div>
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