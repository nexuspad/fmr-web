<template>
  <div class="mb-4">
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('space_size')">
        <label>Space size</label>
        <div>{{ attributeValue('space_size') }} SF</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('building_size_sqft')">
        <label>Building size</label>
        <div>{{ attributeValue('building_size_sqft') }} SF</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('typical_floor_size')">
        <label>Typical floor size</label>
        <div>{{ attributeValue('typical_floor_size') }} SF</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('gross_leasable_area')">
        <label>Gross leasable area</label>
        <div>{{ attributeValue('gross_leasable_area') }} SF</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('building_class')">
        <label>Building class</label>
        <div>{{ attributeValue('building_class') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('number_of_stories')">
        <label>No. stories</label>
        <div>{{ attributeValue('number_of_stories') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('condition')">
        <label>Condition</label>
        <div>{{ attributeValue('condition') }}</div>
      </div>
      <div class="mr-4" v-if="hasAttributeValue('year_built')">
        <label>Year built</label>
        <div>{{ attributeValue('year_built') }}</div>
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