<template>
  <div id="graph_my">
    <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataFormat="dataFormat"
        :dataSource="dataSource"
    ></fusioncharts>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';


Vue.use(VueFusionCharts, FusionCharts, TimeSeries);

export default {
  name: "ChartComponent",
  props: {
    dataArr: Array,
    schema: Array,
    caption: String,
    suffix: String
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
          text: this.caption
        },
        subcaption: {
          text: this.caption
        },
        yAxis: [
          {
            plot: {
              value: this.caption,
              type: "line"
            },
            format: {
              suffix: this.suffix
            },
            title: this.caption
          }
        ]
      }
    }
  },
  mounted: function() {
    Promise.all([
        this.dataArr
        ,
        this.schema
    ]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
          data,
          schema
      );
      this.dataSource.data = fusionTable;
    });
  }
}
</script>

<style scoped>

</style>