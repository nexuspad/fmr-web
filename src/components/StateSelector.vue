<template>
  <div>
    <select class="form-control" v-model="state" v-on:change="changeState(state)">
      <option v-for="(name, code) in STATES" :key="code" :value="code">{{name}}</option>
    </select>
  </div>
</template>

<script>
import { listContextSetup, listContextUpdate } from "./ListContextHandler";
import { STATES } from "../service/AppData";

export default {
  setup() {
    const { state } = listContextSetup();
    const { changeState } = listContextUpdate();

    return {
      STATES,
      state,
      changeState
    };
  }
};
</script>