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
    <button v-on:click="plotTimeSeriesPressure">Plot pressure TimeSeries Graph</button>
  </section>
</template>

<script>


import Vue from 'vue'
import TemperatureChart from "./TemperatureChart";
import ChartComponent from "./ChartComponent";
import SensorDataService from "../services/SensorDataService";
export default {
  name: "DataLayout",
  components: {
    TemperatureChart
  },
  data() {
    return {
      timeSeriesComponent: null,
      pressureComponent: null,
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
    document.querySelector('#temperature_modal_close').addEventListener('click', this.destroyTemperatureModal);
    document.querySelector('#pressure_modal_close').addEventListener('click', this.destroyPressureModal);

    // SensorDataService.getAllSensorData().then(result => {
    //
    // });

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
    plotTimeSeries(
                   caption,
                   suffix,
                   data,
                   schema,
                   selector,
                   component,
                   graphWrapperId) {
      document.querySelector('#' + selector).style.display = 'block';

      if(component != null) {
        component.$destroy();
      }

      document.querySelector('#' + selector + '_body').innerHTML =
          '<div id="' + graphWrapperId + '"></div>';

      const TimeSeriesComponent = Vue.extend(ChartComponent);
      const tsComp = new TimeSeriesComponent({
        propsData: {
          dataArr: data,
          schema: schema,
          caption: caption,
          suffix: suffix
        }
      }).$mount('#' + graphWrapperId);

      return tsComp;
    },
    plotTimeSeriesTemperature() {
      this.timeSeriesComponent = this.plotTimeSeries(
          'Temperature',
          '℃',
          this.tempVar.data,
          [
            {
              "name": "Time",
              "type": "date",
              "format": "%Y-%-m-%dT%H:%M:%S"
            },
            {
              "name": "Temperature",
              "type": "number"
            }
          ],
          'temperature_modal',
          this.timeSeriesComponent,
          'temperature_time_series'
      );
    },
    plotTimeSeriesPressure() {
      this.pressureComponent = this.plotTimeSeries(
          'Pressure',
          'kPa',
          this.pressureData.data,
          [
            {
              "name": "Time",
              "type": "date",
              "format": "%Y-%-m-%dT%H:%M:%S"
            },
            {
              "name": "Pressure",
              "type": "number"
            }
          ],
          'pressure_modal',
          this.pressureComponent,
          'pressure_time_series'
      );
    },
    destroyTemperatureModal() {
      if(this.timeSeriesComponent == null)
        return;

      document.querySelector("#temperature_modal").style.display = 'none';
      this.timeSeriesComponent.$destroy();
    },
    destroyPressureModal() {
      if(this.pressureComponent == null)
        return;

      document.querySelector("#pressure_modal").style.display = 'none';
      this.pressureComponent.$destroy();
    }
  }
}
</script>

<style scoped>
.layout {
  width: 50%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>