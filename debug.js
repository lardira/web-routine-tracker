//      error, warn, success, log 
const { red, yellow, green, white } = require('tiny-chalk');
const { bold, underline } = require('tiny-chalk');

class debug{
    static isDebug = true;

    static error(string){
        if (this.isDebug)
            console.error(red(bold(string)));
    }

    static warn(string){
        if (this.isDebug)
            console.warn(yellow(underline(string)));
    }

    static success(string){
        if (this.isDebug)
            console.log(green(string));
    }

    static log(string){
        if (this.isDebug)
            console.log(white(string));
    }
}

module.exports = debug;