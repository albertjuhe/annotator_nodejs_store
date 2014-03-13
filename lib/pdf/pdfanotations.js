var PDFDocument = require('pdfkit');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');

var pdfanotations = function(){

	/*
	Montem les anotacions amb format PDF

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
