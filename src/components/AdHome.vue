<template>
  <div>
    <category-navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import CategoryNavigation from "./CategoryNavigation";

export default {
  components: {
    CategoryNavigation
  }
}
</script>
