import axios from "axios";


const url = 'http://localhost:8080/sensors';

export default class SensorDataService {
    static getAllSensorData() {
        const request = url + '/getAllSensorData';
        return axios.get(request);
    }

    static getLastSensorDataByLimit(limit) {
        const request = url + '/getSensorDataByLimit?limit=' + limit;
        return axios.get(request);
    }

    static getSensorDataByTimeRange(lastDataRequest) {
        let request = url;
        if(lastDataRequest == null) {
            request += '/getAllSensorData';
            return axios.get(request)
        }

        const date = Date.now();
        this.lastDataRequest = date;
        request += '/getSensorDataByTimeRange?from=' + lastDataRequest + '&to=' + date;
        return axios.get(request);
    }
}