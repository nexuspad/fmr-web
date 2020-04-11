<template>
  <div class="d-flex flex-row bd-highlight mb-3">
    Interior
    <div class="p-2" v-for="(option, index) in ad.getAttribute('interior').options" :key="index">
      <input type="checkbox" v-model="selections" :id="index" :value="option" v-on:change="updateSelection()" />
      <label class="p-2">{{ option }}</label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selections: []
    };
  },
  props: ['ad'],
  methods: {
    updateSelection () {
      console.log(this.selections.join(','))
      this.ad.getAttribute('interior').value = this.selections.join(',')
    }
  }
}
</script>