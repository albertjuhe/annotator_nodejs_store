var MySQL = require('../database/mysql');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');
var UserEntity = require('../model/User.js');

var UserController = function(){
	var mysql = new MySQL();

	var findOne = function(username,password,callback) {
		var currentUser = new UserEntity(username,'');
		var query_select = "select * from users where username='"+username+"'";
		mysql.query(query_select,function(err,rows,fields){
		  if (err) throw err;	
		  if (rows.length>0 ) {
		     currentUser.id = rows[0].id;
		     currentUser.password = rows[0].password;
		  	 callback(err,currentUser,password);
		  } else {
		  	 callback(err,null);
		  }
		  
		});
	};

	var findById = function(id,callback) {
		var data = [];
		data[0] = id;
		var query_select = "select * from users where id=?";
		mysql.query(query_select,data,function(err,rows,fields){
		  if (err) throw err;		
		  if (rows.length>0 ) {
		  	var currentUser = new UserEntity(rows[0].username,rows[0].password);
		  	currentUser.id = rows[0].id;
		  	callback(err,currentUser);
		  } else {
		  	 callback(err,null);
		  }
		});
	};

	var save = function(username,password,callback) {
		var data = [];
		User = new UserEntity(username,password);
		data[0] = username;
		data[1] = User.generateHash(password);
		var query_select = "insert into users (username,password) VALUES (?,?)";
		mysql.query(query_select,data,function(err,rows,fields){
			console.log('Insert user');
		  if (err) {
		  	console.log(err)
		  	throw err;	
		  }
		  callback(User);
		});
	};

	

	return {findOne:findOne,findById:findById,save:save}
	 
};
module.exports = UserController;
