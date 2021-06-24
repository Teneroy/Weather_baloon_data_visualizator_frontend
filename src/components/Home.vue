<template>
  <main>
    <GPSLayout />
    <DataLayout />
  </main>
</template>

<script>
import GPSLayout from "./GPSLayout";
import DataLayout from "./DataLayout";
export default {
name: "Home",
  components: {DataLayout, GPSLayout}
}
</script>

<style scoped>
main {
  display: flex;
}
</style>