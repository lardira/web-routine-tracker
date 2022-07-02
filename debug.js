//      error, warn, log
const { red, yellow, white } = require('tiny-chalk');
const { bold } = require('tiny-chalk');

class debug{
    static error(string){
        console.error(red(bold(string)));
    }

    static warn(string){
        console.warn(yellow(string));
    }

    static log(string){
        console.log(white(string));
    }
}