<template>
  <div id="graph_my">
    <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataFormat="dataFormat"
        :dataSource="dataSource"
    ></fusioncharts>
    <button @click="updateData">Click to Update Data</button>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, TimeSeries);

//let chartRef = null;

export default {
  name: "ChartComponent",
  components: {

  },
  props: {
    dataArr: Array
  },
  data() {
    return {
      width: "100%",
      height: "400",
      type: "timeseries",
      dataFormat: "json",
      dataSource: {
        data: null,
        caption: {
          text: "Temperature"
        },
        subcaption: {
          text: "Temperature"
        },
        yAxis: [
          {
            plot: {
              value: "Temperature",
              type: "line"
            },
            format: {
              suffix: "℃"
            },
            title: "Temperature"
          }
        ]
      }
    }
  },
  mounted: function() {
    Promise.all([
        [
          [
            "2021-06-20T13:38:37",
            11
          ],
          [
            "2021-06-20T14:38:37",
            14
          ],
          [
            "2021-06-20T15:38:37",
            12.3
          ],
          [
            "2021-06-20T16:38:37",
            15
          ]
        ]
        ,
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
        ]
    ]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
          data,
          schema
      );
      this.dataSource.data = fusionTable;
    });
  },
  methods: {
    updateData() {
      const data = [
        [
          "2021-06-20T15:38:37",
          12.3
        ],
        [
          "2021-06-20T16:38:37",
          15
        ]
      ];

      const chart = FusionCharts.items['chartobject-1'];
      console.log(chart.getChartData("json"));
      chart.setData(12.3, "2021-06-20T15:38:37");
      console.log(data)
    }
  },
  events: {
    "beforeRender": function (evt, args) {
      console.log(args);
      console.log(evt);
      //chartRef = evt.sender;
    }
  }
}
</script>

<style scoped>

</style>