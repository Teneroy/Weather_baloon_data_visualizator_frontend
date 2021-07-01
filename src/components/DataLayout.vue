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
    <TemperatureChart
        :tempVar="humidityData"
        :caption="'Humidity'"
        :number-suffix="'%'"
    />
    <button v-on:click="plotTimeSeriesHumidity">Plot humidity TimeSeries Graph</button>
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
      humidityComponent: null,
      tempVar: {
        data: [
          {hour: '2021-06-20T13:38:37', value: '35'},
          {hour: '2021-06-20T13:39:37', value: '36'},
          {hour: '2021-06-20T13:40:37', value: '37'},
          {hour: '2021-06-20T14:01:37', value: '38'},
          {hour: '2021-06-20T14:02:37', value: '36'},
          {hour: '2021-06-20T14:03:37', value: '35'}
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
      },
      humidityData: {
        data: [
          {hour: '2021-06-20T13:38:37', value: '24'},
          {hour: '2021-06-20T13:39:37', value: '23'},
          {hour: '2021-06-20T13:40:37', value: '22'},
          {hour: '2021-06-20T14:01:37', value: '21'},
          {hour: '2021-06-20T14:02:37', value: '25'},
          {hour: '2021-06-20T14:03:37', value: '26'}
        ]
      }
    }
  },
  mounted() {
    document.querySelector('#temperature_modal_close').addEventListener('click', this.destroyTemperatureModal);
    document.querySelector('#pressure_modal_close').addEventListener('click', this.destroyPressureModal);
    document.querySelector('#humidity_modal_close').addEventListener('click', this.destroyHumidityModal);

    this.startRalTimeDataUpdating();
  },
  methods: {
    startRalTimeDataUpdating() {
      setInterval(() => {
        SensorDataService.getLastSensorDataByLimit(10).then(result => {
          const sensorDataArray = result.data;
          this.pressureData.data = [];
          this.tempVar.data = [];
          this.humidityData.data = [];
          for (let i = sensorDataArray.length - 1; i--; i > 0) {
            this.pressureData.data.push({
              hour:  sensorDataArray[i].dateTime,
              value: sensorDataArray[i].pressure
            });
            this.humidityData.data.push({
              hour:  sensorDataArray[i].dateTime,
              value: sensorDataArray[i].humidity
            });
            this.tempVar.data.push({
              hour: sensorDataArray[i].dateTime,
              value: sensorDataArray[i].temperature
            });
          }
        });
      }, 5000);
    },
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
      SensorDataService.getAllSensorData().then(result => {
        const sensorDataArray = result.data;
        const tsArray = [];
        for (let i = 0; i < sensorDataArray.length; i++) {
          tsArray.push([
            sensorDataArray[i].dateTime,
            sensorDataArray[i].temperature
          ]);
        }
        this.timeSeriesComponent = this.plotTimeSeries(
            'Temperature',
            '℃',
            tsArray,
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
      });
    },
    plotTimeSeriesPressure() {
      SensorDataService.getAllSensorData().then(result => {
        const sensorDataArray = result.data;
        const tsArray = [];
        for (let i = 0; i < sensorDataArray.length; i++) {
          tsArray.push([
            sensorDataArray[i].dateTime,
            sensorDataArray[i].pressure
          ]);
        }

        this.pressureComponent = this.plotTimeSeries(
            'Pressure',
            'kPa',
            tsArray,
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
      });
    },
    plotTimeSeriesHumidity() {
      SensorDataService.getAllSensorData().then(result => {
        const sensorDataArray = result.data;
        const tsArray = [];
        for (let i = 0; i < sensorDataArray.length; i++) {
          tsArray.push([
            sensorDataArray[i].dateTime,
            sensorDataArray[i].humidity
          ]);
        }

        this.humidityComponent = this.plotTimeSeries(
            'Humidity',
            '%',
            tsArray,
            [
              {
                "name": "Time",
                "type": "date",
                "format": "%Y-%-m-%dT%H:%M:%S"
              },
              {
                "name": "Humidity",
                "type": "number"
              }
            ],
            'humidity_modal',
            this.humidityComponent,
            'humidity_time_series'
        );
      });
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
    },
    destroyHumidityModal() {
      if(this.humidityComponent == null)
        return;

      document.querySelector("#humidity_modal").style.display = 'none';
      this.humidityComponent.$destroy();
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