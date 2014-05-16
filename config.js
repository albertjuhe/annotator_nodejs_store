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
