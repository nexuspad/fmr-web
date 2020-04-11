<template>
  <div>
    Rent includes
    <div v-for="(option, index) in ad.getAttribute('rent_includes').options" :key="index">
      <input type="checkbox" v-model="selections" :id="index" :value="option" v-on:change="updateSelection()" />
      <label>{{ option }}</label>
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
      this.ad.getAttribute('rent_includes').value = this.selections.join(',')
    }
  }
}
</script>