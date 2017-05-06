"use strict";

/* listing_sql.js */

var PS = require('pg-promise').PreparedStatement;
var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

function sql(file) {
    var relativePath = '.../helpers/sql/account/';
    return new QueryFile(relativePath+file, {minify: true});
}
module.exports = {
    queries : {
        getAccountsWithLimit: new PS( 'getAccountsWithLimit',sql('getAccountsWithLimit.sql'))

    }
};

