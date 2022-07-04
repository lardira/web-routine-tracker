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

    static error(thing, style = true){
        if (this.#loggerLevel <= 3)
            if (style)
                console.error(red(bold(thing)));
            else
                console.error(thing);
    }

    static warn(thing, style = true){
        if (this.#loggerLevel <= 2)
            if (style)
                console.warn(yellow(underline(thing)));
            else
                console.warn(thing);
    }

    static success(thing, style = true){
        if (this.#loggerLevel <= 1)
            if (style)
                console.log(green(thing));
            else
                console.log(thing);
    }

    static log(thing, style = true){
        if (this.#loggerLevel === 0)
            if (style)
                console.log(white(bold(thing)));
            else
                console.log(thing);
    }

    static table(thing) {
        console.table(thing);
    }
}

module.exports = logger;