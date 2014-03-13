var annotationDAO = require('../DAO/annotatio');
var estadistiquesDAO = require('../DAO/estadistiques');

var url = require('url');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var PDFDocument = require('pdfkit');
var crypto = require('crypto');
var pdfanotations = require('../pdf/pdfanotations');

var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');


module.exports = function(app){

/*
* Update anotations
Format ex: http://localhost:3000/annotation/update/demoTest/code/id
* @param code: Content identificator
* @param username: User that is doing the update
* @param id: Annotation id
*/ 
app.put('/annotation/update/:username/:code/:id', function(req, res) { 
		
		var anotation_id = req.params.id;
		var code = req.params.code; 
		var objetJson = req.body;
		var username = req.params.username;
		
		logger.info('UPDATE user:' + username +' | id annotation: ' + anotation_id + ' | code: ' + code);
		loggerConsole.info('UPDATE user:' + username +' | id annotation: ' + anotation_id + ' | code: ' + code);
		
			var objAnnotation = new annotationDAO();

			objAnnotation.update(username,objetJson,anotation_id,function(ObjResult){
				if(ObjResult)res.json("error",404);
			});

			res.json(req.body,200);
		
		
 });


/*
* Delete anotations
Format ex: http://localhost:3000/annotation/destroy/demoTest/code/id
* @param code: Content identificator
* @param username: User that is doing the delete
* @param id: Annotation id
*/
app.delete('/annotation/destroy/:username/:code/:id', function(req, res) { 
		var code = req.params.code; 
		var username = req.params.username; 
		var anotation_id = req.params.id;

		
		logger.info('DELETE annotation   user:' + username +' | id annotation: ' + anotation_id + ' | code: ' + code);			
		loggerConsole.info('DELETE annotation   user:' + username +' | id annotation: ' + anotation_id + ' | code: ' + code);		
	
			var objAnnotation = new annotationDAO();
			objAnnotation.deleteAnnotation(username,anotation_id,function(ObjResult){
				if(ObjResult)res.json("error",404);
			});
			res.json(req.body,200);
	
	 });

/*
* GET all the annotations.
Format ex: http://localhost:3000/annotation/get/demoTest/code
* @param code: Content identificator
* @param username: User that is doing the update
* @param id: Annotation id
*/
app.get('/annotation/get/:username/:code', function(req, res){
		
		var code = req.params.code; 
		var username = req.params.username; 
	
		logger.info('GET  user:' + username +' | code: ' + code);	
		loggerConsole.info('GET  user:' + username +' | code: ' + code);	
			
				var objAnnotation = new annotationDAO();
				objAnnotation.get(username,code,function(ObjResult,err){
					if (err) {
						logger.error('get ' + err);		
						res.setHeader('Content-Type', 'text/html');
						var htmlFile = "<html><body>Connection error</body></html>";
		  				res.end(htmlFile); 		
					} else {
						if (ObjResult.length>0 ) {	
							var resultJSON = "";
				
							_.each(ObjResult, function(result){
								objTemp = JSON.parse(result.json_anotation);
								objTemp.id = result.id;
								objTemp.state = result.state;
								objTemp.order = result.sort;
								if (username == result.username) objTemp.propietary = 1; //Its my annotation
								else objTemp.propietary = 0;
								objTemp.data_creacio = result.date_creation;
								objTempString = JSON.stringify(objTemp);
								resultJSON = resultJSON.concat(objTempString+",");
							});
							resultJSON = resultJSON.substring(0, resultJSON.length-1);
							cleaner = "["+resultJSON;
							cleaner = cleaner.concat("]");
							objetJson = JSON.parse(cleaner);
							res.json(objetJson,200);
						} else {
							res.json(ObjResult,200);
						}
					}
				});
		
	});


	/*
		GET FILE:Get the HTML file, in this file we disply the annotations
		Format ex: http://localhost:3000/annotation/demoTest/code.html
		* @param code: Content identificator
		* @param username: User that is doing the update
		*/
	
	app.get('/annotation/:username/:code.html', function(req, res){
		
		var code = req.params.code; 
		var username = req.params.username; 	
		
		logger.info('[Load HTML] user:' + username +' | code: ' + code);
		loggerConsole.info('[Load HTML] user:' + username +' | code: ' + code);
		load_html(code,username,res);

		console.log(code+' '+username);
	});

	/*
		New annotation
		Format ex: http://localhost:3000/annotation/new/demoTest/code
		* @param code: Content identificator
		* @param username: User that is doing the update
		*/
	
	app.post('/annotation/new/:username/:code', function(req, res){
		
		var code = req.params.code; 
		var username = req.params.username; 	var objetJson = req.body;
		var objAnnotation = new annotationDAO();
		
		logger.info('[Crea annotation]  user:' + username +' | code: ' + code);	
		loggerConsole.info('[Crea annotation]  user:' + username +' | code: ' + code);	

			objAnnotation.add(code,username,objetJson,function(ObjResult){
				if(ObjResult.message!='') {
					logger.error('[This username doesn\'t exists]  user:' + username +' | code: ' + code);	
					res.json("error",404);
				}
			
				var JSONObject = {"id":ObjResult.insertId};
				var resultJSON = "{\"id\":\""+ObjResult.insertId+"\"}";
				var cleaner = "["+resultJSON;
				cleaner = cleaner.concat("]");
				var sAnotacio = JSON.stringify(JSONObject);
				var objetJson = JSON.parse(resultJSON);
			 
				res.json(objetJson,200);		

			}); //Anotation
		
	});

	/*
	GET Annotations in PDF Format
	*/
	app.get('/annotation/:username/:code.pdf', function(req, res){
	
		var code = req.params.code; 
		var username = req.params.username; 	

		logger.info('[Download PDF] user:' + username +' | code: ' + code);									
		loggerConsole.info('[Download PDF]  user:' + username +' | code: ' + code);									

		var objAnnotation = new annotationDAO();
		var i = 1;
		objAnnotation.getAll(username,code,function(ObjResult){						
			var objpdf = new pdfanotations();
			objpdf.getPDF(ObjResult,function(doc){
					doc.output(function(pdf) {
						res.type('application/pdf');
	  					res.end(pdf,'binary');
	  				});
			});	
		});				
	
	});


	load_html =  function(code,username,res){
    		
			console.log(app.get('url_materials') +code+'.html');
			request(app.get('url_materials') +code+'.html', function (error, response, body) {
	  		
	  			if (!error && response.statusCode == 200) {
	  				res.setHeader('Content-Type', 'text/html');
	  				var htmlFile = body.replace('{$__propietary__$}',username);
	  				htmlFile = htmlFile.replace('{$__code__$}',code);
	  				res.end(htmlFile);
	  				
	  				
	  			} else if (response.statusCode == 404) {
	  				res.setHeader('Content-Type', 'text/html');
	  				var htmlFile = "<html><body> "+code+".html doesn't exists </body></html>";
	  				logger.error('[ERROR doesn\'t exists HTML] code: ' + code + '.html');								
	  				res.end(htmlFile);

	  			} else {
	  				res.setHeader('Content-Type', 'text/html');
	  				var htmlFile = "<html><body>Error de material</body></html>";
	  				logger.error('[ERROR doesn\'t exists HTML] code: ' + code + '.html');	
	  				res.end(htmlFile);     
	  			}

			});
		

	};


};

