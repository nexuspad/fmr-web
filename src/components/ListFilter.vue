<template>
  <div>
    <state-selector />
    <div class="form-group">
      <input type="text" class="form-control" placeholder="city" v-model="city" />
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="zip code" v-model="zipCode" />
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="neighborhood" v-model="neighborhood" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary" v-on:click="submitting(); changeFilter()" :disabled="formState.posting">Filter</button>
    </div>
  </div>
</template>

<script>
import { formSetup } from './GenericFormHandler'
import { listContextSetup, listContextUpdate } from './ListContextHandler'
import StateSelector from "./StateSelector"

export default {
    components: {
        StateSelector
    },
    setup () {
        const { formState, submitting } = formSetup()
        const { city, zipCode, neighborhood } = listContextSetup()
        const { changeFilter } = listContextUpdate()

        return {
            formState,
            submitting,
            city,
            zipCode,
            neighborhood,
            changeFilter
        }
    }
}
</script>