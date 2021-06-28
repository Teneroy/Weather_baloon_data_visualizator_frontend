<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
          type="spline"
          width="100%"
          height="400"
          dataformat="json"       dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
          :datasource="tempChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>

<script>
export default {
  name: "TemperatureChart",
  props: ["tempVar", "caption", "numberSuffix"],
  components: {},
  data() {
    return {
      tempChartData: {
        chart: {
          caption: this.caption,
          captionFontBold: "0",
          captionFontColor: "#000000",
          captionPadding: "30",
          baseFont: "Roboto",
          chartTopMargin: "30",
          showHoverEffect: "1",
          theme: "fusion",
          showaxislines: "1",
          numberSuffix: this.numberSuffix,
          anchorBgColor: "#6297d9",
          paletteColors: "#6297d9",
          drawCrossLine: "1",
          plotToolText: "$label<br><hr><b>$dataValue</b>",
          showAxisLines: "0",
          showYAxisValues: "1",
          anchorRadius: "4",
          divLineAlpha: "0",
          labelFontSize: "13",
          labelAlpha: "65",
          labelFontBold: "0",
          rotateLabels: "1",
          slantLabels: "1",
          canvasPadding: "20"
        },
        data: []
      },
    };
  },
  methods: {
    setChartData: function() {
      let data = [];
      let i = 0;
      if(this.tempVar.data.length > 10) {
        i = this.tempVar.data.length - 10;
      }
      for (i; i < this.tempVar.data.length; i++) {
        let dataObject = {
          label: this.tempVar.data[i].hour,
          value: this.tempVar.data[i].value
        };
        data.push(dataObject);
      }
      this.tempChartData.data = data;
    },
  },
  mounted: function() {
    this.setChartData();
  },
  watch: {
    tempVar: {
      handler: function() {
        this.setChartData();
      },
      deep: true
    },
  }
}
</script>

<style scoped>

</style>