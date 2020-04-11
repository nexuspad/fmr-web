<template>
  <div>
    <router-link :to="buildUri(3011)" :class="{'selected':3011 == categoryId}">single family home for sale</router-link>
  </div>
</template>

<script>
import { listContextSetup } from "./ListContextHandler";
import { CATEGORY_URIS } from '../service/AppData'

export default {
    setup () {
        const { state, categoryId } = listContextSetup();

        const buildUri = (id) => {
            return '/' + state.value + '/' + CATEGORY_URIS[id]
        }

        return {
            categoryId,
            buildUri
        }
    }
}
</script>