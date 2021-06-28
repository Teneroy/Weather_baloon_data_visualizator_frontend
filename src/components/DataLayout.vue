<template>
  <section class="layout">
    <TemperatureChart :tempVar="tempVar" />
  </section>
</template>

<script>


import TemperatureChart from "./TemperatureChart";
export default {
  name: "DataLayout",
  components: {
    TemperatureChart
  },
  data() {
    return {
      tempVar: {
        tempToday: [
          {hour: '2021-06-20T13:38:37', temp: '35'},
          {hour: '2021-06-20T13:39:37', temp: '36'},
          {hour: '2021-06-20T13:40:37', temp: '37'},
          {hour: '2021-06-20T14:01:37', temp: '38'},
          {hour: '2021-06-20T14:02:37', temp: '36'},
          {hour: '2021-06-20T14:03:37', temp: '35'},
        ],
      }
    }
  },
  mounted() {
    let i = 4;
    let t = 35;
    setInterval(() => {
      // this.tempVar.tempToday = [
      //   {hour: '11.00 AM', temp: '3'},
      //   {hour: '12.00 PM', temp: '6'},
      //   {hour: '1.00 PM', temp: '7'},
      //   {hour: '2.00 PM', temp: '38'},
      //   {hour: '3.00 PM', temp: '36'},
      //   {hour: '4.00 PM', temp: '5'},
      // ]
      this.tempVar.tempToday.push(
          {hour: '2021-06-20T14:' + (i++) + ':37', temp: '' + (t--)},
      );
    }, 5000);
  }
}
</script>

<style scoped>
.layout {
  width: 50%;
  height: 100vh;
}
</style>