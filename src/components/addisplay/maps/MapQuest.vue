<template>
  <div id="Map" style="width: 100%; height: 350px;"/>
</template>

<script>

export default {
  mounted() {
    const self = this
    this.$loadScript("https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js")
    .then(() => {
      // Script is loaded, do something
      self.initMap()
    })
    .catch((error) => {
      // Failed to fetch script
      console.log(error)
    })
  },
  methods: {
    initMap: function() {
      window.L.mapquest.key = 'wC8GjrsTqJQBMp6rgoplOrBiClyM1Z2Y';
      var map = window.L.mapquest.map('Map', {
        center: [37.7749, -122.4194],
        layers: window.L.mapquest.tileLayer('map'),
        zoom: 12
      });
      map.addControl(window.L.mapquest.control());
    }
  }
}
</script>