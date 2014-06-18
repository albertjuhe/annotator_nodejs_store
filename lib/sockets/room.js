var _ = require('underscore');

function Room(id) {  
  this.id = id;
  this.users = [];  
};

Room.prototype.addUser = function(userID,username) {  
    this.users.push({id: userID,username: username});
};

Room.prototype.removeUser = function(userID) {
  	
  this.users = _.without(this.users, _.findWhere(this.users, {id: userID}));
  console.log(this.users);


};

module.exports = Room;