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
//var PDFDocument = require('pdfkit');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');
var wkhtmltopdf = require('wkhtmltopdf');

var pdfanotations = function(){

	/*
	Annotations in PDF format

	*/
	var getPDF = function(anotations,res,callback) {
		var num_anotacions = 0;
		var html ="<html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='application/xhtml+xml; charset=UTF-8' /><meta charset='utf-8' /></head><body style='font-family:verdana'>";
		if (anotations.length>0) {	
			html = html + "<h1> Annotations </h1><hr/>";
			var resultado = "";
			anotations.forEach(function(result){
				var color = "#A1A110";
				num_anotacions++;		

				objTemp = JSON.parse(result.json_anotation);
				html = html + "<div style='font-size:18px;margin-top:20px'><strong> " + objTemp.text +"</strong></div>";
				html = html + "<div style='font-size:14px;margin-top:2px'>" + objTemp.quote +"</div>";
				if (objTemp.category=='destacat') color='#1B7716';					
				if (objTemp.category=='errata') color='#A00400';	
				html = html + "<div style='font-size:13px;color:"+color+";margin-top:2px;margin-bottom:20px'> " + objTemp.category.toUpperCase() +"</div><hr/>";
			});	
		}
		html = html + "</body></html>";
		var stream = wkhtmltopdf(html).pipe(res);
		callback(stream);		
	}

	return {getPDF:getPDF}	 
};

module.exports = pdfanotations;
