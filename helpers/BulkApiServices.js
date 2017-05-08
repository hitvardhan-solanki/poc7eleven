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
    var StudentArray= [];
    for(var i=0;i<10;i++){
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
                    console.log("User ID: " + userInfo.id);
                    console.log("Org ID: " + userInfo.organizationId);
                    var StudentArray =createDummyStudents();
                    var StundentDelete = [];
                    conn.query("SELECT Id FROM Student__c", function(err, result) {
                        if (err) { return console.error(err); }
                        console.log("total : " + result.totalSize);
                        console.log("fetched : " + result.records.length);
                        //for loop to create the array fot deleting the students' records
                        for(var pos = 0 ; pos <result.records.length; pos++) {
                            var student={};
                            student.Id=result.records[pos];
                            StundentDelete.push(student);
                        }
                    });

                            conn.bulk.load("Student__c", "delete", StundentDelete, function (err, rets) {
                                if (err) {
                                    return console.error(err);
                                }
                                console.log(rets);
                                for (var i = 0; i < rets.length; i++) {
                                    console.log(rets);

                                    if (rets[i].success) {
                                        console.log("#" + (i + 1) + " Delete successfully, id = " + rets[i].id);
                                    } else {
                                        console.log("#" + (i + 1) + " error occurred, message = " + rets[i].errors);
                                    }
                                }
                                resolve('success');
                            });

                });

        });
    },
    bulkDeleteBookingRules : function () {
        return new Promise(function (resolve, reject) {
            conn.login('hitvardhan.solanki@appirio.com.trainingss', 'Appirio@123seqDYdtQjlzKXg2QAOWraG2g', function (err, userInfo) {
                if (err) {
                    return console.error(err);
                }
                conn.query("SELECT Id FROM Student__c WHERE CreatedDate != TODAY AND LastModifiedDate != TODAY")
                    .destroy('Student__c', function (err, rets) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(rets);
                        // ...
                    });
            });
        });
    }
}
