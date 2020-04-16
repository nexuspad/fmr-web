<template>
  <div>
    <select class="form-control" v-model="state" v-on:change="changeState()">
      <option v-for="(name, code) in allStates" :key="code" :value="code">{{name}}</option>
    </select>
  </div>
</template>

<script>
import { STATES } from "../service/AppData";
import AppContext from './AppContext'

export default {
  data() {
    return {
      allStates: STATES,
      state: ''
    }
  },
  beforeMount() {
    this.state = AppContext.findStateInRoute(this.$route.params)
  },
  methods: {
    changeState() {
      AppContext.changeState(this.state)
      this.$router.push({ name: this.$router.currentRoute.name, params: { state: this.state.toLowerCase() } });
    }
  },
  watch: {
    "$route.params.state": function() {
      console.log('---->', AppContext.getState())
      this.state = AppContext.getState()
    }
  }
};
</script>