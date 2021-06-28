<template>
  <div class="path-info-panel">
    <p><span>Landing zone lat.:</span> {{latitude}}</p>
    <p><span>Landing zone lon.:</span> {{longitude}}</p>
    <p><span>Landing Time:</span> {{time}}</p>
  </div>
</template>

<script>
export default {
  name: "PathPredictionInfo",
  props: {
    latitude: Number,
    longitude: Number,
    time: String
  }
}
</script>

<style scoped>
.path-info-panel {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10000000;
  background: #3fb984c7;
  color: #fff;
  padding: 10px;
  text-align: left;
}

.gps-info-panel p>span {
  font-weight: bold;
}
</style>