var mysql = require('mysql');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');
var config = require('./config.json');

var MySQL = function(){
	var connection = {};
	var data_connection = {
		 host     : config.server,
		 database : config.database,
		 user     : config.user,
		 password : config.password,
		 port     : config.database_port,
	};
	var conectar = function(){
		
		connection = mysql.createConnection(data_connection);
		var test = connection.connect(function(err){
			if (err) logger.error(err);
		});
	}
	var desconectar = function(){
		
		connection.end();
	}

	var query = function(str,callback){
		conectar();
		
		connection.query(str, function(err, rows, fields) {
		 	callback(err,rows,fields);
		});
	 
		process.nextTick(desconectar);
	};

	var clean = function(str,callback){
		conectar();

		limpio = connection.escape(str);

		callback(limpio);
	};

	return {query:query,clean:clean}
};
module.exports = MySQL;


 