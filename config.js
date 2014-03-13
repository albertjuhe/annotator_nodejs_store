var nconf = require('nconf');

nconf.use('file', { file: './config-test.json' });


exports.get = function(param) {
	return nconf.get(param);
}

exports.port = function() {
//	return process.env.PORT || 3000;
//console.log(nconf.get('portmySql'));
return nconf.get('anotacions:port');
}

exports.materials = function() {
	return nconf.get('anotacions:materials');
}

exports.server = function() {
	return nconf.get('anotacions:server');
}

exports.database = function() {
    return nconf.get('anotacions:database');
}

exports.user = function() {
	return nconf.get('anotacions:user');
}

exports.password = function() {
	return nconf.get('anotacions:password');
}


exports.nc = function() {
    return "N/D";
}

exports.debug = function(msg) {
    if (nconf.get('entorn') != 'PRO') {
        console.log(msg);
    }
}