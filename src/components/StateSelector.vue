<template>
  <div>
    <select class="form-control" v-model="state" v-on:change="changeState()">
      <option v-for="(name, code) in allStates" :key="code" :value="code">{{name}}</option>
    </select>
  </div>
</template>

<script>
import AppContext from './AppContext'
import AppDataHelper from './AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  data() {
    return {
      allStates: this.states(),
      state: 'ALL'
    }
  },
  beforeMount() {
    this.setState()
  },
  methods: {
    setState() {
      this.state = AppContext.getState() ? AppContext.getState().toUpperCase() : 'ALL'
    },
    changeState() {
      AppContext.changeState(this.state.toLowerCase())
    }
  },
  watch: {
    "$route.params.state": function() {
      this.setState()
    }
  }
};
</script>