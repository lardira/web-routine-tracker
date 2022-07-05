const yargs = require('yargs');
const logger = require('./logger');
const noteTracker = require('./noteTracker/noteTracker');
const weatherTracker = require('./weatherTracker/weatherTracker');

// Note Tracker Commands //
//addNote command
yargs.command({
    command: 'addNote',
    describe: 'Add a new note.',
    builder: {
        title: {
            demandOption: true,
            describe: 'Note title.',
            type: 'string',
            alias: 'ti'
        },
        text: {
            demandOption: true,
            describe: 'Note text',
            type: 'string',
            alias: 'te'
        },
        tag: {
            describe: 'Note tag',
            type: 'string',
            default: 'simple',
            alias: 'ta'
        }
    },
    handler: (argv) => { noteTracker.addNote(argv.title, argv.text, argv.tag) }
})
//removeNote command
yargs.command({
    command: 'removeNote',
    describe: 'Removing the note.',
    builder: {
        id: {
            demandOption: true,
            describe: 'Position of the specified note for deletion.',
            type: 'number',
            alias: 'i'
        }
    },
    handler: (argv) => { noteTracker.removeNote(argv.id) }
})
//listNotes command
yargs.command({
    command: 'listNotes',
    describe: 'Listing notes.',
    handler: () => { noteTracker.listNotes() }
})
//readNote command
yargs.command({
    command: 'readNote',
    describe: 'Showing a specified note',
    builder: {
        id: {
            demandOption: true,
            describe: 'ID of the note',
            type: 'number',
            alias: 'i'
        }
    },
    handler: (argv) => { noteTracker.readNote(argv.id) }
})
// !Note Tracker Commands //

// Weather Tracker Commands //
//getWeatherInLocation command
yargs.command({
    command: 'getWeatherInLocation',
    describe: 'Shows current weather in specified location. Country and city are specified.',
    builder: {
        country: {
            describe: 'Country to look the weather in',
            type: 'string',
            default: weatherTracker.getDefaultCountry()
        },
        region: {
            describe: 'Region to look the weather in',
            type: 'string',
            default: weatherTracker.getDefaultRegion()
        }
    },
    handler: (argv) => { weatherTracker.getCurrentByLocation(argv.country, argv.region)}
})
//getCurrentWeather command
yargs.command({
    command: 'getCurrentWeather',
    describe: 'Shows current weather in specified latitude and longitude',
    builder: {
        latitude: {
            describe: 'Latitude of the location',
            type: 'string',
            alias: 'lat',
            default: weatherTracker.getDefaultLatitude()
        },
        longitude: {
            describe: 'Longitude of the location',
            type: 'string',
            alias: 'lon',
            default: weatherTracker.getDefaultLongitude()
        }
    },
    handler: (argv) => { weatherTracker.getCurrent(argv.latitude, argv.longitude)}
})
// !Weather Tracker Commands //

//parsing input commands
yargs.parse();