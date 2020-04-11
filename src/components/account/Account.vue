<template>
  <div>
    <top-navigation />
    <h1>account</h1>
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