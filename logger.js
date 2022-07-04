//      error, warn, success, log 
const { red, yellow, green, white } = require('tiny-chalk');
const { bold, underline } = require('tiny-chalk');

class logger{
    /*
        level 0 - all logging available,
        level 1 - success, warn, error are available,
        level 2 - warn, error are available,
        level 3 - error is available
    */ 
    static #loggerLevel = 0;

    static setLevel(level){
        if(level >= 0 && level <= 3)
            this.#loggerLevel = level;
        else
            console.error(red(bold('Provided level value is incorrect!')));
    }

    static error(string, style = true){
        if (this.#loggerLevel <= 3)
            if (style)
                console.error(red(bold(string)));
            else
                console.error(string);
    }

    static warn(string, style = true){
        if (this.#loggerLevel <= 2)
            if (style)
                console.warn(yellow(underline(string)));
            else
                console.warn(string);
    }

    static success(string, style = true){
        if (this.#loggerLevel <= 1)
            if (style)
                console.log(green(string));
            else
                console.log(string);
    }

    static log(string, style = true){
        if (this.#loggerLevel === 0)
            if (style)
                console.log(white(bold(string)));
            else
                console.log(string);
    }

    static table(thing) {
        console.table(thing);
    }
}

module.exports = logger;