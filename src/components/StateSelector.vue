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
      state: ''   // This should always be in uppercase
    }
  },
  beforeMount() {
    this.state = AppContext.findStateInRoute(this.$route.params).toUpperCase()
  },
  methods: {
    changeState() {
      AppContext.changeState(this.state)
      if (this.state === 'ALL') {
        this.$router.push({ name: this.$router.currentRoute.name, params: { state: '' } });
      } else {
        this.$router.push({ name: this.$router.currentRoute.name, params: { state: this.state.toLowerCase() } });
      }
    }
  },
  watch: {
    "$route.params.state": function() {
      this.state = AppContext.getState().toUpperCase()
    }
  }
};
</script>