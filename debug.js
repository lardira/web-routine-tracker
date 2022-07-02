//      error, warn, success, log 
const { red, yellow, green, white } = require('tiny-chalk');
const { bold, underline } = require('tiny-chalk');

class debug{
    static error(string){
        console.error(red(bold(string)));
    }

    static warn(string){
        console.warn(yellow(underline(string)));
    }

    static success(string){
        console.log(green(string));
    }

    static log(string){
        console.log(white(string));
    }
}

module.exports = debug;