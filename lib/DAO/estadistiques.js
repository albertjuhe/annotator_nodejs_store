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
var MySQL = require('../database/mysql');
var annotationDAO = require('../DAO/annotatio');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');

var estadistiques = function(){

	var mysql = new MySQL();

	var get = function(code,username){
		query = 'INSERT INTO log (username,code,operacio,date) VALUES ("'+username+'","'+code+'","GET",NOW());';
		
		mysql.query(query,function(err,rows,fields){				
			if (err) throw err;
		  	
		});
	};

	var getAll = function(code,username){
		query = 'INSERT INTO log (username,code,operacio,date) VALUES ("'+username+'","'+code+'","GETPDF",NOW());';
		
		mysql.query(query,function(err,rows,fields){				
			if (err) throw err;
		  	
		});
	};

	var add = function(code,username){
		query = 'INSERT INTO log (username,code,operacio,date) VALUES ("'+username+'","'+code+'","ADD",NOW());';
		
		mysql.query(query,function(err,rows,fields){				
			if (err) throw err;
		  	
		});
	}

	var update = function(username,id_annotation){
		
		query = 'INSERT INTO log (username,code,operacio,date) VALUES ("'+username+'","","UPDATE",NOW());';
		
		mysql.query(query,function(err,rows){				
			if (err) throw err;
		});
	}

	var deleteAnnotation = function(username,id_annotation){
		
		query = 'INSERT INTO log (username,code,operacio,date) VALUES ("'+username+'","","DELETE",NOW());';
		mysql.query(query,function(err,rows){				
			if (err) throw err;
		});

	}


	return {get:get,add:add,update:update,deleteAnnotation:deleteAnnotation,getAll:getAll}
	 
};
module.exports = estadistiques;
