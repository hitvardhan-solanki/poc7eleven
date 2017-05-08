/**
 * Created by kapil-pc on 05/05/17.
 */
'use strict';


var logger = require('../bunyanConfig');
var account_func = require('./sql/account_sql.js');
var accountQueries = account_func.queries;
var sql_func = require('./sql/sql_func.js');
var func = sql_func.funcs;
var log = logger.create();

var getAccountsForSF = function(limit){
    return new Promise(function(resolve, reject){
        var then_func = function(data){
            resolve(data);
        };
        var error_func = function(error){
            reject('unable to fetch data with error' +JSON.stringify(error));
        };
        func.any(accountQueries.getAccountsWithLimit,[limit],then_func,error_func);
    });
}

var DataBaseArray = [];
module.exports={
    getAccounts: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            if (req.params.limit && req.params.limit != null) {
                getAccountsForSF(req.params.limit).then(function (scriptResponse) {
                    log.info('@@@@@ scriptResponse' + scriptResponse);
                    res.contentType('text/html');
                    var responseObj = {isError: false, errorMessage: '', status: 200, response: scriptResponse};
                    log.info('@@@ return successful');
                    //res.send(scriptResponse[0].name);
                    for(var i= 0; i< scriptResponse.length; i++){
                        DataBaseArray.push(scriptResponse[i]);
                    }
                    res.render('account',{listOfRecords: DataBaseArray});
                    resolve(responseObj);
                }).catch(function (err) {
                    log.error(err);
                    var responseObj = {
                        isError: true,
                        errorMessage: 'Internal Server Error - ' + JSON.stringify(err),
                        status: 500,
                        response: []
                    };
                    res.send(responseObj);
                    reject(responseObj);
                });
            }
            else {
                log.info('Please enter a valid limit');
            }
        })
    },
    inserttestData:function (numberOfRecords) {
        var testArray= new Array();
        for(var i=0;i<numberOfRecords;i++){
            var test ={}
            test.Name = "DummyData-"+ i;
            testArray.push(test);
        }
        var db = func.dbProp();
        db.tx(t => {
            return t.sequence(function(idx) {
                if (idx < testArray.length) {
                    let dataOb = testArray[idx];
                    console.log(idx);
                    dataOb.recordtypename = 'Listing Price Factor';
                    return t.none(' INSERT INTO public.testtable' +
                        '(name)' +
                        'Values(' +
                        '${Name})', dataOb);
                }
            });
        })
            .
            then(data => {
                log.info('data inserted successfully');
            })
            .
            catch(error => {
                log.error('Error while inserting into heroku :' + error);
                //reject('Script A execution failed with error: '+error);
            });
    }
}