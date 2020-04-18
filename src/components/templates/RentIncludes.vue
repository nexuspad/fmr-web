<template>
  <div>
    <label>Rent includes</label>
    <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
      <div class="mr-4" v-for="(option, index) in ad.getAttribute(attributeId('rent_includes')).options" :key="index">
        <input type="checkbox" v-model="selections" :id="index" :value="option" v-on:change="updateSelection()" />
        <span class="p-2">{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  data () {
    return {
      selections: []
    };
  },
  mixins: [ AppDataHelper ],
  props: ['ad'],
  methods: {
    updateSelection () {
      this.ad.getAttribute('rent_includes').value = this.selections.join(',')
    }
  }
}
</script>