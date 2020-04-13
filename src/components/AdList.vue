<template>
  <div class="fmr-bordered-area">
    <div class="container">
      <div class="row">
        <div class="col-md-10 order-lg-1 order-md-1 order-sm-2">
          this is the list
        </div>
        <div class="col-md-2 order-lg-2 order-md-2 order-sm-1">
          <list-filter />
          This is the list home for state {{ state }}
          category {{ categoryId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from "@vue/composition-api";
import AdService from "../service/AdService";
import { listContextSetup } from "./AppContextHandler";
import ListFilter from "./ListFilter";

export default {
  components: {
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