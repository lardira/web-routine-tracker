const fs = require('fs');
const debug = require('../debug');

const NOTES_PATH = 'notes\\notes.txt';

const getNotes = () => {
    //const notes = new Array();
    //TODO: read in JSON
}

const addNote = (note) => {
    try {
        fs.appendFileSync(NOTES_PATH, note + '\n');
    } catch (e) {
        debug.error(e);
        debug.error('Note was not saved!');
    }
    debug.success('Note was saved successfully!');
}

module.exports = { getNotes, addNote };