"use strict"

module.exports = {
    getDatabaseUrl: function(){
        var dbURL = '';
        if(!process.env.HEROKU_ENV || process.env.HEROKU_ENV == 'LOCAL'){
            var config = require('config');
            //var dbConfig = config.get('evolve-config.local-dbConfig');
            var host = "ec2-54-227-237-223.compute-1.amazonaws.com";
            var port = 5432;
            var userName = 'tyxfdtzwfdqxsx';
            var dbName = 'dfa61ar9ki9au4';
            var password = 'b230ddce5028b8d0d1b2a50e1b167b2e8127c1c3bfcbd794e56cd46d80e20f8a';
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
