var express = require('express');
var router = express.Router();

/* GET home page. */
var testServices = require('../helpers/testServices');

//router.get('/account/:limit',testServices.getAccounts);
router.render('account/:limit',{listOfRecords: testServices.getAccounts})


module.exports = router;
