<template>
  <div class="pb-3 mb-2">
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('bedroom')">
        <label>Bedroom</label>
        <div>{{ attributeValue('bedroom') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('bathroom')">
        <label>Bathroom</label>
        <div>{{ attributeValue('bathroom') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('lot_size')">
        <label>Lot size</label>
        <div>{{ attributeValue('lot_size') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('square_footage')">
        <label>Square footage</label>
        <div>{{ attributeValue('square_footage') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('year_built')">
        <label>Year built</label>
        <div>{{ attributeValue('year_built') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('basement')">
        <label>Basement</label>
        <div>{{ attributeValue('basement') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('model')">
        <label>Model</label>
        <div>{{ attributeValue('model') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('dimension')">
        <label>Dimension</label>
        <div>{{ attributeValue('dimension') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('community_type')">
        <label>Community type</label>
        <div>{{ attributeValue('community_type') }}</div>
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