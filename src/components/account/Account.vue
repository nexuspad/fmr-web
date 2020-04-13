<template>
  <div>
    <top-navigation />
    <div class="fmr-bordered-area">
      <router-view></router-view>
    </div>
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