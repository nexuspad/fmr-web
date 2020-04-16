<template>
  <div>
    <state-selector />
    <div class="form-group">
      <input type="text" class="form-control" placeholder="city" v-model="location.city" />
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="zip code" v-model="location.zipCode" />
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="neighborhood" v-model="location.neighborhood" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary" v-on:click="changeFilter()" :disabled="posting">Filter</button>
    </div>
  </div>
</template>

<script>
import StateSelector from "./StateSelector"
import AppContext from './AppContext'
import PropertyLocation from '../service/model/PropertyLocation'

export default {
  components: {
    StateSelector
  },
  data() {
    return {
      posting: false,
      location: new PropertyLocation()
    }
  },
  beforeMount() {
  },
  methods: {
    changeFilter() {
      AppContext.changeFilter()
    }
  },
  watch: {
    "$route.params": function() {
      console.log('xxxx>', AppContext.getState())
    }
  }
}
</script>