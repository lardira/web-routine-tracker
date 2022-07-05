const fs = require('fs');
const postmanRequest = require('postman-request');
const { showCompletionScript } = require('yargs');
const logger = require('../logger');

//using positionstack API for geocoding
const PosAccessKeyPath = 'positionstack_APIAccessKey.txt'; 
const PosAPIAccessKey = fs.readFileSync(PosAccessKeyPath);
const POS_API_URL = 'http://api.positionstack.com/';

//using weatherstack API for weather data
const AccessKeyPath = 'weatherstack_APIAccessKey.txt'; 
const APIAccessKey = fs.readFileSync(AccessKeyPath);
const API_URL = 'http://api.weatherstack.com/';

// Russia, Saint-Petersburg
const defaultLatitude = '59.9375', defaultLongitude = '30.3086';

class weatherTracker{
    static getCurrentByLocation(country = 'RU', region = 'Leningrad'){

        const userQuery = `?access_key=${PosAPIAccessKey}&query=${region},${country}`;
        const locationURL = POS_API_URL + 'v1/forward' + userQuery;

        postmanRequest({json: true, url: locationURL}, (error, response) => {
            const data = response.body.data;
            
            this.getCurrent(data.latitude, data.longitude);

            if (error)
                logger.error(error);
        })
    }

    static getCurrent(lat = defaultLatitude, lon = defaultLongitude) {

        const userQuery = `?access_key=${APIAccessKey}&query=${lat},${lon}`;
        const currentWeatherURL = API_URL + 'current' + userQuery;

        postmanRequest({json: true, url: currentWeatherURL}, (error, response) => {
            const data = response.body;
            const location = data.location;
            const weather = data.current;

            logger.success(`${location.country}, ${location.region}, ${location.name}`)
            logger.success(`At ${location.localtime} UTC${location.utc_offset}: `);
            logger.success(`It's ${weather.weather_descriptions[0]}.`);
            logger.success(`Temperature: ${weather.temperature} degrees, feels like ${weather.feelslike}`);
            logger.success(`Wind: ${weather.wind_speed} km/h ${weather.wind_dir}`);

            if (error)
                logger.error(error);
        })
    }
}

module.exports = weatherTracker;