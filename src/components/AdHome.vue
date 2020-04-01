<template>
  <div>
    <h1>ads here</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import AdService from '../service/AdService';

export default {
  name: 'AdHome',
  mounted () {
    AdService.getAds();
  }
}
</script>
