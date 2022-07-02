//      error, warn, log
const { red, yellow, white } = require('tiny-chalk');
const { bold } = require('tiny-chalk');

class debug{
    error(string){
        console.error(red(bold(string)));
    }

    warn(string){
        console.warn(yellow(string));
    }

    log(string){
        console.log(white(string));
    }
}