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
var PDFDocument = require('pdfkit');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');

var pdfanotations = function(){

	/*
	Annotations in PDF format

	*/
	var getPDF = function(anotations,callback) {
		doc = new PDFDocument;
		doc.registerFont('Quote-Font', 'fonts/StoneSansStd-Bold.ttf', 'texte-Bold')
		doc.registerFont('Text-Font', 'fonts/StoneSansStd-SemiBold.ttf', 'texte-normal')
		doc.registerFont('Category-Font', 'fonts/StoneSerifStd-MediumItalic.ttf', 'texte-italic')

		var num_anotacions = 0;
		if (anotations.length>0) {	
			var resultado = "";

			anotations.forEach(function(result){
				doc.fontSize(18).font('Text-Font').fillColor('#000000').text('Annotations ').moveDown(0.5);	
				doc.lineTo(200, 160).lineWidth(100).fillColor('#cccccc');
				var color = "#A1A110";
				//Convertim les dades a JSON
				objTemp = JSON.parse(result.json_anotation);
				//console.log(result.json_anotacio);
				objTemp.id = result.id;
				doc.image('img/barra_pdf_gris.jpg', { height:5,width: 500 }).moveDown(1.0);
				doc.fontSize(10).font('Text-Font').fillColor('#000000').text(objTemp.text).moveDown(0.5);	
				doc.image('img/punt_gris_pdf.jpg', { height:3,width: 500 }).moveDown(0.5);
				doc.fontSize(10).font('Text-Font').fillColor('#000000').text(objTemp.quote.replace(/^\s+|\s+$/g, "")).moveDown(0.5);					

				if (objTemp.category=='destacat') color='#1B7716';					
				if (objTemp.category=='errata') color='#A00400';					
				doc.fontSize(10).font('Text-Font').fillColor(color).text(objTemp.category.toUpperCase()).moveDown(1.5);	
				num_anotacions++;		
			});
			doc.image('img/barra_pdf_gris.jpg', { height:7,width: 500 }).moveDown(1.0);
		} else {
		    doc.fontSize(25).text('No annotations!', 100, 100);
		}		

			
		callback(doc);		
	}

	return {getPDF:getPDF}	 
};

module.exports = pdfanotations;
