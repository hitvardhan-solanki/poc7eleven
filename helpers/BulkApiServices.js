/**
 * Created by kapil-pc on 05/05/17.
 */
"use strict";

var jsforce = require('jsforce');
var conn = new jsforce.Connection({

    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://login.salesforce.com'
});
conn.bulk.pollInterval = 5000; // 5 sec
conn.bulk.pollTimeout = 600000; // 60 sec

var createDummyStudents = function () {
    var StudentArray= new Array();
    for(var i=0;i<10000;i++){
        var student ={}
        student.Name = "student "+ i;
        StudentArray.push(student);
    }
    return StudentArray;
}

module.exports = {
    bulkDeleteAndInsertBookingRules : function () {
        return new Promise(function (resolve, reject) {
                conn.login('hitvardhan.solanki@appirio.com.trainingss', 'Appirio@123seqDYdtQjlzKXg2QAOWraG2g', function (err, userInfo) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log(conn.accessToken);
                    console.log(conn.instanceUrl);
                    console.log(typeof (recordtype));
                    console.log("User ID: " + userInfo.id);
                    console.log("Org ID: " + userInfo.organizationId);
                    var StudentArray =createDummyStudents();

                            conn.bulk.load("Student__c", "insert", StudentArray, function (err, rets) {
                                if (err) {
                                    return console.error(err);
                                }
                                console.log(rets);
                                for (var i = 0; i < rets.length; i++) {
                                    console.log(rets);
                                    if (rets[i].success) {
                                        console.log("#" + (i + 1) + " inserted successfully, id = " + rets[i].id);
                                    } else {
                                        console.log("#" + (i + 1) + " error occurred, message = " + rets[i].errors);
                                        // if(rets[i].errors.includes('UNABLE_TO_LOCK_ROW:')){
                                        //     var listingId = rets[i].errors.slice(82,100);
                                        //     everbookedListingServices.processListingForScriptB(listingID).then(function () {
                                        //         log.info('retry successful for listing- '+ listingId);
                                        //     }).catch(function (err) {
                                        //         log.info('re-running script B for listing- '+listingId);
                                        //         everbookedListingServices.processListingForScriptB(listinglistingIdID).then(function () {
                                        //             log.info('retry successful for listing- '+ listingId);
                                        //         }).catch(function (err) {
                                        //             log.info('Failed script B for listing- '+listingId+' with error '+err);
                                        //         });
                                        //     });
                                        // }
                                    }
                                }
                                resolve('success');
                            });



                });

        });
    }

}
