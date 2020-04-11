<template>
  <div>
    <div>
      <a href="/ad/new?categoryId=3011">new ad</a>
    </div>
    <state-selector />
    <list-filter />
    <category-navigation />
    This is the list home for state {{ state }}
    category {{ categoryId }}
  </div>
</template>

<script>
import { onBeforeMount } from "@vue/composition-api";
import AdService from "../service/AdService";
import { listContextSetup } from "./ListContextHandler";
import StateSelector from "./StateSelector";
import ListFilter from "./ListFilter";
import CategoryNavigation from "./CategoryNavigation";

export default {
  components: {
    StateSelector,
    CategoryNavigation,
    ListFilter
  },
  setup() {
    const { state, categoryId, currentCriteria } = listContextSetup();

    onBeforeMount(() => {
      AdService.getAds(currentCriteria())
        .then(adList => {
          console.log(adList);
        })
        .catch(() => {
          console.error("...error");
        });
    });

    return {
      state,
      categoryId
    };
  },
  watch: {
    "$route.params": function() {
      // just checking
      // console.log(this.$route.params)
    }
  }
};
</script>