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

const testNote = {
    id: 0,
    title: 'Note',
    text: 'buy some food tomorrow'
}

for(let i = 0; i < 40; i++)
{
    testNote.id = i;
    testNote.title = `Note #${i + 1}`;
    AddNote(JSON.stringify(testNote));
}