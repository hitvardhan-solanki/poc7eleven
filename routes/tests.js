var express = require('express');
var router = express.Router();

/* GET home page. */
var testServices = require('../helpers/testServices');

 router.get('/account/:limit',testServices.getAccounts);
// router.render('account',{listOfRecords: [10,20,30,50]})


// router.get('/account/:limit', function(req, res, next) {
//     res.render('account',{listOfRecords: [10,20,30,4]});
// });

module.exports = router;
