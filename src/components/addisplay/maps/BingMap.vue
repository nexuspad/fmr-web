<template>
  <div :class="isFullscreen? 'fmr-map-fullscreen' : 'fmr-map-embed'">
    <div class="row pt-1 pb-1 pr-2" v-if="isFullscreen">
      <div class="col"><h2 class="pl-2 pt-2 text-light">{{ ad.title }}</h2></div>
      <div class="col text-right">
        <a href="javascript:;" class="btn btn-light rounded" @click="closeFullscreen()">
          <span v-show="isFullscreen"><i class="fas fa-compress-arrows-alt"></i> Close</span>
        </a>
      </div>
    </div>
    <div id="Map" />
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'

// https://github.com/microsoft/BingMapsV8CodeSamples/tree/master/Samples/Map
export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    if (document.getElementById("scriptBingMaps")) {
      this.initMap()
      return
    }

    window.OnLoadBingMapsApi = () => this.initMap()

    var scriptTag = document.createElement("script")
    scriptTag.src = "https://www.bing.com/api/maps/mapcontrol?callback=OnLoadBingMapsApi&key=Ak5VPSOtoWpf32Oml6mum9PVDkeycCBTPVMj5ynIiJJ7xIJnemjDmHnEXu7MGDE3"
    scriptTag.id = "scriptBingMaps"

    // Inject the dynamic script in the DOM
    document.head.appendChild(scriptTag)
  },
  methods: {
    initMap: function() {
      const geoCoordinates = this.ad.getAttribute(this.attributeId('geo_coordinates')).value.latLng
      const map = new window.Microsoft.Maps.Map('#Map', {
            center: new window.Microsoft.Maps.Location(geoCoordinates.lat, geoCoordinates.lng),
            mapTypeId: window.Microsoft.Maps.MapTypeId.road,
            zoom: 9
        })

      const center = map.getCenter();

      //Create custom Pushpin
      const pin = new window.Microsoft.Maps.Pushpin(center, {});

      //Add the pushpin to the map
      map.entities.push(pin);

      const self = this
      function FullscreenOverlay() {
        self.fullscreenBtn = document.createElement('a');
        self.fullscreenBtn.className = 'fas fa-expand-arrows-alt fa-lg'
        self.fullscreenBtn.onclick = function () {
            self.isFullscreen = true
            self.fullscreenBtn.style.visibility = "hidden"
        };
      }
      FullscreenOverlay.prototype = new window.Microsoft.Maps.CustomOverlay({ beneathLabels : false });
      FullscreenOverlay.prototype.onAdd = function () {
          //Create a div that will hold pan buttons.
          var container = document.createElement('div');
          container.appendChild(self.fullscreenBtn);
          container.style.position = 'absolute';
          container.style.top = '10px';
          container.style.left = '10px';
          this.setHtmlElement(container);
      }
      var overlay = new FullscreenOverlay()
      map.layers.insert(overlay);
    },
    closeFullscreen() {
      this.isFullscreen = false
      this.fullscreenBtn.style.visibility = "visible"
    }
  }
}
</script>