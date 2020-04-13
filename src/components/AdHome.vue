<template>
  <div>
    <top-navigation />
    <div>
      <category-navigation />
      <router-view></router-view>
    </div>
    <fmr-footer />
  </div>
</template>

<script>
import TopNavigation from './TopNavigation'
import CategoryNavigation from "./CategoryNavigation";
import FmrFooter from './FmrFooter'

export default {
  components: {
    TopNavigation, CategoryNavigation, FmrFooter
  }
}
</script>
