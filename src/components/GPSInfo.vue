<template>
  <div class="gps-info-panel">
    <p><span>Lat:</span> {{latitude}}</p>
    <p><span>Lon:</span> {{longitude}}</p>
    <p><span>Alt:</span> {{altitude}}</p>
    <p><span>Time:</span> {{time}}</p>
  </div>
</template>

<script>
export default {
  name: "GPSInfo",
  props: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    time: String
  }
}
</script>

<style scoped>
.gps-info-panel {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10000;
  background: #3fb984c7;
  color: #fff;
  padding: 10px;
  text-align: left;
}

.gps-info-panel p>span {
  font-weight: bold;
}
</style>