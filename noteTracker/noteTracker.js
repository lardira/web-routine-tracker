const fs = require('fs');
const validator = require('validator');
const logger = require('../logger');
const note = require('./note');
        
const defaultNotesPath = 'noteTracker/notes/notes.json';

class noteTracker{
    static #notes = [];

    static addNote(title, text, tag = 'simple'){
        const newNote = new note(title, text, tag);
        this.#notes.push(JSON.stringify(newNote));
        this.#saveNotes();
    }

    static #saveNotes(){
        try {
            const savedNotes = this.readNotes();
            this.#notes = this.#notes.concat(savedNotes);
            fs.writeFileSync(defaultNotesPath, JSON.stringify(this.#notes));
            logger.success('Notes was saved successfully!');
        } catch (e) {
            logger.error(e);
            logger.error('Notes were not saved!');
        }
    }

    static removeNote(id){
        this.#notes = this.readNotes();
        if (id >= 0 && id < this.#notes.length){
            this.#notes.splice(id, 1);
            fs.writeFileSync(defaultNotesPath, JSON.stringify(this.#notes));
            logger.success('The note was removed.');
        }
        else
            logger.error('Index out of range');
    }

    static readNotes(path = defaultNotesPath){        
        if (path === '')
            path = defaultNotesPath;
            
        try {
            const bytes = fs.readFileSync(path);
            const parsedBytes = JSON.parse(bytes);
            return parsedBytes;
        } catch (e) {
            return [];
        }
    }

    static listNotes(){
        let count = 0;
        this.#notes = this.readNotes();
        logger.log(`Listing ${this.#notes.length} notes...`);
        this.#notes.forEach((note) => {
            logger.log(`Note №${++count}`);
            logger.log(note);
        })
    }
}

module.exports = noteTracker;