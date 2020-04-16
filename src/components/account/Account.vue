<template>
  <div>
    <top-navigation />
    <router-view></router-view>
    <fmr-footer />
  </div>
</template>

<script>
import TopNavigation from '../TopNavigation'
import FmrFooter from '../FmrFooter'

export default {
  components: {
    TopNavigation, FmrFooter
  }
}
</script>