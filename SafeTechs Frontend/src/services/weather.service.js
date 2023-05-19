import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
import {handleErrors} from './error_handling';
import vars from '../values/env';

// import user from '../models/Patient';


const api = {
    key: vars.OPEN_WEATHER_KEY,
    base: vars.OPEN_WEATHER_URL,
};
var user_list = [];

class WeatherService {

    async getLocationsWeather(locs){
        let obj = null;
        await axios.get(`${api.base}weather?q=${locs}&units=metric&APPID=${api.key}`).then((response) => {
            obj = response;
        });
        return obj;
    }

    async getLocationsWeather2(locs){
        let obj = [];
        locs.forEach(async (loc) => {
            await axios.get(`${api.base}weather?q=${loc}&units=metric&APPID=${api.key}`).then((response) => {
                obj.push(response.data);
                console.log(response.data);
            });
            
        });
        return obj;
        
    }
    
}

export default new WeatherService();