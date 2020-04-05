<template>
  <div>
    <select class="form-control" v-model="state" v-on:change="changeState(state)">
      <option v-for="(value, index) in STATES" :key="index" :value="value">{{value}}</option>
    </select>
  </div>
</template>

<script>
import { listContextSetup, listContextUpdate } from './ListContextHandler'
import { STATES } from '../service/AppData'

export default {
    setup () {
        const { state } = listContextSetup()
        const { changeState } = listContextUpdate()

        // function stateChanged () {
        //     console.log(state)
        // }
        return {
            STATES,
            state,
            changeState
        }
    },
    // methods: {
    //     changeState (value) {
    //         console.log('>>>', value)
    //         this.$router.push({ name: this.$route.name, params: { state: value } });
    //     }
    // }
}
</script>