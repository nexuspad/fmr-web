<template>
  <div id="Map" style="width: 100%; height: 350px;"/>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'

// https://github.com/microsoft/BingMapsV8CodeSamples/tree/master/Samples/Map
export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  mounted() {
    const self = this
    this.$loadScript("https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=Ak5VPSOtoWpf32Oml6mum9PVDkeycCBTPVMj5ynIiJJ7xIJnemjDmHnEXu7MGDE3")
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
      const geoCoordinates = this.ad.getAttribute(this.attributeId('geo_coordinates')).value.latLng
      new window.Microsoft.Maps.Map('#Map', {
            center: new window.Microsoft.Maps.Location(geoCoordinates.lat, geoCoordinates.lng),
            mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            zoom: 4
        });
    }
  }
}
</script>