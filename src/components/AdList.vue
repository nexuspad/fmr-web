<template>
  <div>
    <state-selector />
    This is the list home for state {{ state }}
    <button @click="increment">press</button>
  </div>
</template>

<script>
import { onBeforeMount } from "@vue/composition-api";
import AdService from "../service/AdService";
import { listContextSetup } from "./ListContextHandler";
import StateSelector from "./StateSelector";

export default {
    components: {
        StateSelector
    },
    setup() {
        const { state, currentCriteria } = listContextSetup();

        onBeforeMount(() => {
            AdService.getAds(currentCriteria())
            .then(adList => {
                console.log(adList);
            })
            .catch(() => {
                console.error("...error");
            });
        });

        function increment() {
            // console.log(listContext)
            state.value = "GA";
            console.log(state);
        }

        return {
            // listContext,
            state,
            increment
        };
    },
    watch: {
        '$route.params': function () {
            console.log(this.$route.params)
        }
    }
};
</script>