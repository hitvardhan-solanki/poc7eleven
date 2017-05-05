"use strict"

module.exports = {
    getDatabaseUrl: function(){
        var dbURL = '';
        if(!process.env.HEROKU_ENV || process.env.HEROKU_ENV == 'LOCAL'){
            var config = require('config');
            //var dbConfig = config.get('evolve-config.local-dbConfig');
            var host = config.HOST;
            var port = config.DBPORT;
            var userName = config.USERNAME;
            var dbName = config.DBNAME;
            var password = config.PASSWORD;
            if(password!=null && password.length > 0 ){
                dbURL = `postgres://${userName}:${password}@${host}:${port}/${dbName}?ssl=true`;
            }else{
                    dbURL = `postgres://${userName}@${host}:${port}/${dbName}`;
                }

        }
        else {
            dbURL = process.env.DATABASE_URL+'?ssl=true';
        }
        console.log('dbURL ' +dbURL);
        return dbURL;
    }
};

