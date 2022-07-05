# web-thingies
A project where I recreate several different modules for web applications and mix them up into one big thing (that's where the name comes from). Made just for practicing Node.js with no other intention in mind! 
## CLI Commands
### Note Tracker
A little app for keeping little notes. Notes can be tagged and managed by commands.
#### Add a new note
```addNote (--title | --ti) _title_ (--text | --te) _text_ (--tag | --ta) _tag_```
#### Remove the specified note
```removeNote (--id | --i) _note-id_```
#### Read the specified note
```readNote (--id | --i) _note-id_```
#### List saved notes
```listNotes```
### Weather Tracker
#### Get the current weather in the specified location
```getWeatherInLocation --country _country-name_ --region _region-name_```
#### Get the current weather in the specified position
```getCurrentWeather (--latitude | --lat) _latitude_ (--longitude | --lon) _longitude_```
## Examples
### Note Tracker
### Weather Tracker