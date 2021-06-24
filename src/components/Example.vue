<template>

  <div style="height: 100vh; width: 100%;">
    <div class="info" style="height: 20vh">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <l-map
        style="height: 80vh; width: 100%"
        :zoom="zoom"
        :center="center"
        :markerLatLng="markerLatLng"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        @update:markerLatLng="markerUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng" ></l-marker>
    </l-map>
  </div>

</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

import {
  Icon
} from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [48.573349, 13.45764],
      bounds: null,
      markerLatLng: [48.573349, 13.45764]
    };
  },
  methods: {
    markerUpdated(latLng) {
      this.markerLatLng = latLng;
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  }
}
</script>

<style>

</style>