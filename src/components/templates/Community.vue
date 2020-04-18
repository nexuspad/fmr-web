<template>
  <div>
    <label>Community</label>
    <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
      <div class="mr-4" v-for="(option, index) in ad.getAttribute(attributeId('community')).options" :key="index">
        <input type="checkbox" v-model="selections" :id="index" :value="option" v-on:change="updateSelection()" />
        <span class="p-2">{{ lookup(option) }}</span>
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
      this.ad.getAttribute('community').value = this.selections.join(',')
    }
  }
}
</script>