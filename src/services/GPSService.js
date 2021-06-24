import axios from "axios";


const url = 'http://localhost:8080/gps';

export default class GPSService {
    static getLastGpsPosition() {
        const request = url + '/getLastGpsPosition';
        return axios.get(request);
    }

    static getLastPathPrediction() {
        const request = url + '/getLastPathPrediction';
        return axios.get(request);
    }
}