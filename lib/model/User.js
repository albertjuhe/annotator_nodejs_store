var bcrypt   = require('bcrypt-nodejs');

//User model
function User(id,username,password) {
  this.id = id;
  this.username=username;
  this.password=password;
};

function User(username,password) {
  this.id = '';
  this.username=username;
  this.password=password;
};

// generating a hash
User.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

	// checking if password is valid
User.prototype.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
	    
};
module.exports = User;