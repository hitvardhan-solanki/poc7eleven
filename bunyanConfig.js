'use strict';
var bunyan = require('bunyan');

var getErrorFileName = function(){
    if(!process.env.HEROKU_ENV || process.env.HEROKU_ENV == 'LOCAL'){
        return 'error-local.log';
    } else{
        return '/tmp/error-production.log';
    }

}

module.exports = {
    create: function(){
        var errorFilePath = getErrorFileName();
        return bunyan.createLogger({
            name: '7-ELEVEN-Heroku',
            streams: [
                {
                    level: 'debug',
                    stream: process.stdout
                },
                {
                    level: 'error',
                    path: errorFilePath  // log ERROR and above to a file
                }
            ]
        });
    }
};
