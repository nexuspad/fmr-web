<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col">
        <label>Rent includes</label>
        <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
          <div class="mr-4" v-for="(option, index) in attributeOptions('rent_includes')" :key="index">
            <input type="checkbox" v-model="ad.getAttribute(attributeId('rent_includes')).value" :id="index" :value="option" />
            <span class="p-2">{{ option }}</span>
          </div>
        </div>
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