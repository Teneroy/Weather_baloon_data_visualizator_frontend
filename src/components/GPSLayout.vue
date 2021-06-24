<template>
  <section class="layout">
    <Example />
  </section>
</template>

<script>
//import L from 'leaflet';
import Example from "./Example";

export default {
  name: "GPSLayout",
  components: {
    Example
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 15,
      center: [48.573349, 13.45764],
    };
  },
  methods: {

  }
}
</script>

<style scoped>
  .layout {
    width: 50%;
    height: 100vh;
  }
</style>