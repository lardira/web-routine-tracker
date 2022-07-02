const fs = require('fs');

const notesPath = 'notes\\notes.txt';

const LoadNotes = () => {
    const notes = new Array();
    //TODO: read in JSON
}

const AddNote = (note) => {
    try {
        fs.appendFileSync(notesPath, note + '\n');
    } catch (error) {
        console.error(error);
        console.error('Note was not saved!');
    }
    console.log('Note was saved successfully!');
}