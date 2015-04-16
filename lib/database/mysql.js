/*
Annotator nodejs store (https://https://github.com/albertjuhe/annotator_nodejs_store
Copyright (C) 2014 Albert Juhé Brugué
License: https://github.com/albertjuhe/annotator_nodejs_store/License.rst

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/
var mysqlPooling = require('../database/poolling');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');
var config = require('./../../config.json');

var MySQL = function(){

    var query = function(str,callback){
        mysqlPooling.getConnection(function(err, conn){
            conn.query( str,  function(err, rows,fields){
                if(err)	{
                    throw err;
                }else{
                    callback(err,rows,fields);
                }
            });
            conn.release();
        })
    };

    var query = function(str,data,callback){
        mysqlPooling.getConnection(function(err, conn){
            conn.query( str,  data, function(err, rows,fields){
                if(err)	{
                    throw err;
                }else{
                    callback(err,rows,fields);
                }
            });
            conn.release();
        })
    };

    var clean = function(str,callback){
        mysqlPooling.getConnection(function(err, conn){
            cleanQuery = conn.escape(str);
            conn.release();
            callback(cleanQuery);
        })
    };

	return {query:query,clean:clean}
};
module.exports = MySQL;


 
