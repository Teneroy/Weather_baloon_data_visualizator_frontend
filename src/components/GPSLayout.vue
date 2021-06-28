<template>
  <section class="layout">
    <MapComponent
        :position=position
        :ascending-trajectory=ascendingTrajectory
        :descending-trajectory=descendingTrajectory
    />
    <GPSInfo
        :altitude=altitude
        :latitude=position[0]
        :longitude=position[1]
        :time=time
    />
    <PathPredictionInfo
        :latitude=landingCoords[0]
        :longitude=landingCoords[1]
        :time=landingTime
    />
  </section>
</template>

<script>
//import L from 'leaflet';
import MapComponent from "./MapComponent";
import GPSService from "../services/GPSService";
import GPSInfo from "./GPSInfo";
import PathPredictionInfo from "./PathPredictionInfo";

export default {
  name: "GPSLayout",
  components: {
    PathPredictionInfo,
    GPSInfo,
    MapComponent
  },
  data () {
    return {
      position: [48.573349, 13.45764],
      altitude: 0,
      time: '',
      ascendingTrajectory: [],
      descendingTrajectory: [],
      landingTime: '',
      landingCoords: [0, 0],
    };
  },
  methods: {
    startGpsTracking() {
      setInterval(() => {
        console.log(this.position);
        GPSService.getLastGpsPosition().then(response => {
          if(typeof(response.data) === 'string')
            return;
          this.position = response.data;
          this.position = [
              response.data.latitude,
              response.data.longitude
          ];
          this.altitude = response.data.altitude;
          this.time = response.data.dateTime;
        })
      }, 5000);
    },
    startRealTimePathPrediction() {
      setInterval(() => {
        GPSService.getLastPathPrediction().then(response => {
          if(response.data.error !== undefined) {
            console.log(response.data.error);
            return;
          }

          const prediction = response.data.prediction;
          const ascend = prediction[0].trajectory;
          const descend = prediction[1].trajectory;

          const predictionData = this.preparePathPredictionData(ascend, descend);

          this.ascendingTrajectory = predictionData.ascendCoordinates;
          this.descendingTrajectory = predictionData.descendCoordinates;

          this.landingTime = descend[descend.length - 1].datetime;
          this.landingCoords = [
            descend[descend.length - 1].latitude,
            descend[descend.length - 1].longitude
          ];

          console.log(this.landingTime);
        });

      }, 5000);
    },
    preparePathPredictionData(ascend, descend) {
      let ascendCoordinates = [];
      let descendCoordinates = [];

      for (let i = 0; i < ascend.length; i++) {
        ascendCoordinates.push([ascend[i].latitude, ascend[i].longitude]);
      }
      for (let i = 0; i < descend.length; i++) {
        descendCoordinates.push([descend[i].latitude, descend[i].longitude]);
      }

      return {
        ascendCoordinates,
        descendCoordinates
      }
    }
  },
  mounted() {
    this.startGpsTracking();
    this.startRealTimePathPrediction();
  }
}
</script>

<style scoped>
  .layout {
    width: 50%;
    height: 100vh;
    position: relative;
  }
</style>