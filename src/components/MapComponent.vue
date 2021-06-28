<template>

  <div style="height: 100vh; width: 100%;">
    <l-map
        style="height: 100%; width: 100%"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="lastLatLng"
                @update:visible="true"
      ></l-marker>
      <l-polyline :lat-lngs="lastPredPolylineAscend.latlngs" :color="lastPredPolylineAscend.color"></l-polyline>
      <l-polyline :lat-lngs="lastPredPolylineDescend.latlngs" :color="lastPredPolylineDescend.color"></l-polyline>
    </l-map>
  </div>

</template>

<script>
import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet';

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
    LMarker,
    LPolyline
  },
  props: {
    position: Array,
    ascendingTrajectory: Array,
    descendingTrajectory: Array
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      bounds: null,
      center: this.position
    };
  },
  computed: {
    lastLatLng: function() {
      return this.position
    },
    lastPredPolylineAscend: function () {
      return {
        latlngs: this.ascendingTrajectory,
        color: 'green'
      }
    },
    lastPredPolylineDescend: function () {
      return {
        latlngs: this.descendingTrajectory,
        color: 'red'
      }
    }
  },
  methods: {
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