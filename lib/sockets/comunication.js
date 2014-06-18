var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');
var _ = require('underscore');
var Room = require('./room');

module.exports = function(){

	var rooms = {};  
	
	var init = function(app) {
		
		var server = app.get('server');
		var io = require('socket.io').listen(server);

		io.sockets.on('connection', function(socket){
		  
		  socket.on('login',function(username) {
		    socket.username = username;
		  });
		  socket.emit('login');
		  		  
		  socket.on('disconnect', function () {
		    socket.leave(socket.room);

		    /* Remove the user in his room */
		    room = rooms[socket.room];
		    room.removeUser(socket.id);
          	
          	var counter_refresh = setTimeout(function() {
          		var users = rooms[socket.room].users;		        
          		io.sockets.in(socket.room).emit('notification', { online:users.length});
            	clearTimeout(counter_refresh)
	          }, 2000);
		   
		   
		});

		/* Cada room representa un classroom. */
		socket.on('join',function(room) {
		        socket.room = room;
			    if (rooms[room]) {
		        	rooms[room].addUser(socket.id,socket.username);
		        } else {		        	
		        	var R = new Room(room);
		        	R.addUser(socket.id,socket.username);
		        	rooms[room] = R;
		        }

		        socket.join(room);
		           
		        var users = rooms[room].users;		        

		        io.sockets.in(room).emit('notification', { online: users.length });  
		  });
			

		});
	};

	return {init:init}	 

};

