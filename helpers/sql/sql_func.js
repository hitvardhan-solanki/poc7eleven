"use strict";
/* sql_func.js */

var pgp1 = require('pg-promise')();
var config = require('./postgresConfig.js');
var db1 = pgp1(config.getDatabaseUrl());
var logger = require('../../bunyanConfig');
var log = logger.create();

var databaseErrorLogging = function(error){
    log.info(' database error encounter, message is: '+error.message);
    log.error(' database error encounter  message is: '+error.message + ' and complete object is '+ JSON.stringify(error));
}


module.exports = {
    funcs : {
        none: function(qry,params,then_func,error_func){
            db1.none(qry,params)
            .then(() => {
                then_func();
            })
            .catch(error => {
                databaseErrorLogging(error);
                error_func(error);
            });
        },
        one: function (qry, params,then_func,error_func){
            return db1.one(qry,params)
            .then(data => {
                then_func(data);
            })
            .catch(error => {
                databaseErrorLogging(error);
                error_func(error);
            });
        },
        any: function (qry, params,then_func,error_func){

            return db1.any(qry,params)
            .then(data => {

                then_func(data);
            })
            .catch(error => {
                databaseErrorLogging(error);
                error_func(error);
            });
        },
        oneWithExternaId:function (sequenceName, qry, params,then_func,error_func){

            function * getId(t){
                var seq = 'SELECT CAST(nextval(\'salesforce.'+sequenceName+'\') as bigint)';
                var id = yield t.one(seq);
                params.push(id.nextval);
                return yield t.one(qry, params);
            }

            db1.task(getId).then(data => {
                then_func(data);
            })
                .catch(error => {
                    databaseErrorLogging(error);
                    error_func(error);
                });
        },

        insertMultiple :function (qry,then_func,error_func){

            db1.none(qry,[])
                .then(() => {
                    then_func();
                })
                .catch(error => {
                    databaseErrorLogging(error);
                    error_func(error);
                });
        },

        dbProp : function(){
            return db1;
        }
    }
};
