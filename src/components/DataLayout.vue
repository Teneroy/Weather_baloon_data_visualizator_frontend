<template>
  <section class="layout">
    <TemperatureChart
        :tempVar="tempVar"
        :caption="'Temperature'"
        :number-suffix="'°C'"
    />
    <button v-on:click="plotTimeSeriesTemperature">Plot temperature TimeSeries Graph</button>
    <TemperatureChart
        :tempVar="pressureData"
        :caption="'Pressure'"
        :number-suffix="'kPa'"
    />
  </section>
</template>

<script>


import Vue from 'vue'
import TemperatureChart from "./TemperatureChart";
import ChartComponent from "./ChartComponent";
export default {
  name: "DataLayout",
  components: {
    TemperatureChart
  },
  data() {
    return {
      timeSeriesComponent: null,
      tempVar: {
        data: [
          {hour: '2021-06-20T13:38:37', value: '35'},
          {hour: '2021-06-20T13:39:37', value: '36'},
          {hour: '2021-06-20T13:40:37', value: '37'},
          {hour: '2021-06-20T14:01:37', value: '38'},
          {hour: '2021-06-20T14:02:37', value: '36'},
          {hour: '2021-06-20T14:03:37', value: '35'},
        ],
      },
      pressureData: {
        data: [
          {hour: '2021-06-20T13:38:37', value: '101.325'},
          {hour: '2021-06-20T13:39:37', value: '101.325'},
          {hour: '2021-06-20T13:40:37', value: '102.325'},
          {hour: '2021-06-20T14:01:37', value: '103.325'},
          {hour: '2021-06-20T14:02:37', value: '104.325'},
          {hour: '2021-06-20T14:03:37', value: '105.325'}
        ]
      }
    }
  },
  mounted() {
    let i = 4;
    let t = 35;
    let p = 105.325;
    setInterval(() => {
      this.tempVar.data.push(
          {hour: '2021-06-20T14:' + (i++) + ':37', value: '' + (t-=Math.random().toFixed(2))},
      );
      this.pressureData.data.push(
          {hour: '2021-06-20T14:' + i + ':37', value: '' + (p-=Math.random().toFixed(3))},
      );
    }, 5000);
  },
  methods: {
    plotTimeSeriesTemperature() {
      console.log(this.timeSeriesComponent);

      document.querySelector("#temperature_modal").style.display = 'block';
      document.querySelector("#blocking_shadow").style.display = 'block';

      if(this.timeSeriesComponent != null) {
        this.timeSeriesComponent.$destroy();
      }

      document.querySelector('#temperature_modal_body').innerHTML =
           '<div id="temperature_time_series"></div>';
      //const chart = new ChartComponent().$mount('#temperature_time_series');
      const TemperatureTS = Vue.extend(ChartComponent);
      const tsComp = new TemperatureTS({
        propsData: {
          dataArr: this.tempVar.data
        }
      }).$mount('#temperature_time_series');

      this.timeSeriesComponent = tsComp;
      //tsComp.$destroy();
    }
  }
}
</script>

<style scoped>
.layout {
  width: 50%;
  height: 100vh;
}
</style>