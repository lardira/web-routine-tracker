const fs = require('fs');
const postmanRequest = require('postman-request');
const logger = require('../logger');

const readKey = (path) => {
    try{
        return fs.readFileSync(path);
    }
    catch(e){
        logger.error(e);
        return '';
    }
}

//using positionstack API for geocoding
const PosAccessKeyPath = 'weatherTracker/positionstack_APIAccessKey.txt'; 
const PosAPIAccessKey = readKey(PosAccessKeyPath);
const POS_API_URL = 'http://api.positionstack.com/';

//using weatherstack API for weather data
const AccessKeyPath = 'weatherTracker/weatherstack_APIAccessKey.txt'; 
const APIAccessKey = readKey(AccessKeyPath);
const API_URL = 'http://api.weatherstack.com/';

// Russia, Saint-Petersburg
const defaultLatitude = '59.9375', defaultLongitude = '30.3086';
const defaultCountry = 'Russia', defaultRegion = 'Saint-Petersburg';

class weatherTracker{
    static getCurrentByLocation(country = defaultCountry, region = defaultRegion){
        
        const userQuery = `?access_key=${PosAPIAccessKey}&limit=1&query=${region},${country}`;
        const locationURL = POS_API_URL + 'v1/forward' + userQuery;
        
        postmanRequest({json: true, url: locationURL}, (error, response) => {
            if (error){
                logger.error(error);
                return;
            } else if (response.body.error){
                logger.error(response.body.error.code);
                logger.error(response.body.error.message);
                return;
            }

            const data = response.body.data;
            this.getCurrent(data[0].latitude, data[0].longitude);
        })
    }

    static getCurrent(lat = defaultLatitude, lon = defaultLongitude) {

        const userQuery = `?access_key=${APIAccessKey}&query=${lat},${lon}`;
        const currentWeatherURL = API_URL + 'current' + userQuery;

        postmanRequest({json: true, url: currentWeatherURL}, (error, response) => {
            if (error){
                logger.error(error);
                return;
            } else if (response.body.error){
                logger.error(response.body.error.code);
                logger.error(response.body.error.type);
                logger.error(response.body.error.info);
                return;
            }
            
            const data = response.body;
            const location = data.location;
            const weather = data.current;

            logger.success(`${location.country}, ${location.region}, ${location.name}`)
            logger.success(`At ${location.localtime} UTC${location.utc_offset}: `);
            logger.success(`It's ${weather.weather_descriptions[0]}.`);
            logger.success(`Temperature: ${weather.temperature} degrees, feels like ${weather.feelslike}`);
            logger.success(`Wind: ${weather.wind_speed} km/h ${weather.wind_dir}`);
        })
    }

    static getDefaultLatitude = () => defaultLatitude;
    static getDefaultLongitude = () => defaultLongitude;
    static getDefaultCountry = () => defaultCountry;
    static getDefaultRegion = () => defaultRegion;
}

module.exports = weatherTracker;