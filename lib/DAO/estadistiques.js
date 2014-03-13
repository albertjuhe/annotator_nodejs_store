var MySQL = require('../../mysql');
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
