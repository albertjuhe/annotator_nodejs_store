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
var Hashids = require("hashids");
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');


    module.exports = function(app){

        app.namespace('/annotation',function() {
            /*
             * Update anotations
             Format ex: http://localhost:3000/annotation/update/demoTest/code/id
             * @param code: Content identificator
             * @param username: User that is doing the update
             * @param id: Annotation id
             */
            app.put('/update/:username/:code/:id', function (req, res) {

                var anotation_id = req.params.id;
                var code = req.params.code;
                var objetJson = req.body;
                var username = req.params.username;

                logger.info('UPDATE user:' + username + ' | id annotation: ' + anotation_id + ' | code: ' + code);
                loggerConsole.info('UPDATE user:' + username + ' | id annotation: ' + anotation_id + ' | code: ' + code);

                var objAnnotation = new annotationDAO();

                objAnnotation.update(username, objetJson, anotation_id, function (ObjResult) {
                    if (ObjResult)res.json("error", 404);
                });

                res.json(req.body, 200);


            });


            /*
             * Delete anotations
             Format ex: http://localhost:3000/annotation/destroy/demoTest/code/id
             * @param code: Content identificator
             * @param username: User that is doing the delete
             * @param id: Annotation id
             */
            app.delete('/destroy/:username/:code/:id', function (req, res) {
                var code = req.params.code;
                var username = req.params.username;
                var anotation_id = req.params.id;


                logger.info('DELETE annotation   user:' + username + ' | id annotation: ' + anotation_id + ' | code: ' + code);
                loggerConsole.info('DELETE annotation   user:' + username + ' | id annotation: ' + anotation_id + ' | code: ' + code);

                var objAnnotation = new annotationDAO();
                objAnnotation.deleteAnnotation(username, anotation_id, function (ObjResult) {
                    if (ObjResult)res.json("error", 404);
                });
                res.json(req.body, 200);

            });

            /*
             * GET all the annotations.
             Format ex: http://localhost:3000/annotation/get/demoTest/code
             * @param code: Content identificator
             * @param username: User that is doing the update
             * @param id: Annotation id
             */
            app.get('/get/:username/:code', function (req, res) {

                var code = req.params.code;
                var username = req.params.username;

                logger.info('GET  user:' + username + ' | code: ' + code);
                loggerConsole.info('GET  user:' + username + ' | code: ' + code);

                var objAnnotation = new annotationDAO();
                objAnnotation.get(username, code, function (ObjResult, err) {
                    if (err) {
                        logger.error('get ' + err);
                        res.setHeader('Content-Type', 'text/html');
                        var htmlFile = "<html><body>Connection error</body></html>";
                        res.end(htmlFile);
                    } else {
                        if (ObjResult.length > 0) {
                            var resultJSON = "";

                            _.each(ObjResult, function (result) {
                                objTemp = JSON.parse(result.json_anotation);
                                objTemp.id = result.id;
                                objTemp.state = result.state;
                                objTemp.order = result.sort;
                                if (username == result.username) objTemp.propietary = 1; //Its my annotation
                                else objTemp.propietary = 0;
                                objTemp.data_creacio = result.date_creation;
                                objTempString = JSON.stringify(objTemp);
                                resultJSON = resultJSON.concat(objTempString + ",");
                            });
                            resultJSON = resultJSON.substring(0, resultJSON.length - 1);
                            cleaner = "[" + resultJSON;
                            cleaner = cleaner.concat("]");
                            objetJson = JSON.parse(cleaner);
                            res.json(objetJson, 200);
                        } else {
                            res.json(ObjResult, 200);
                        }
                    }
                });

            });


            /*
             GET FILE:Get the HTML file, in this file we display the annotations
             Format ex: http://localhost:3000/annotation/demoTest/code.html
             * @param code: Content identificator
             * @param username: User that is doing the update
             */

            app.get('/:username/:code.html', function (req, res) {

                var code = req.params.code;
                var username = req.params.username;

                logger.info('[Load HTML] user:' + username + ' | code: ' + code);
                loggerConsole.info('[Load HTML] user:' + username + ' | code: ' + code);
                load_html(code, username, res);

                console.log(code + ' ' + username);
            });

            /*
             New annotation
             Format ex: http://localhost:3000/annotation/new/demoTest/code
             * @param code: Content identificator
             * @param username: User that is doing the update
             */

            app.post('/new/:username/:code', function (req, res) {

                var code = req.params.code;
                var username = req.params.username;
                var objetJson = req.body;
                var objAnnotation = new annotationDAO();

                logger.info('[Create annotation]  user:' + username + ' | code: ' + code);
                loggerConsole.info('[Create annotation]  user:' + username + ' | code: ' + code);

                objAnnotation.add(code, username, objetJson, function (ObjResult) {
                    if (ObjResult.message != '') {
                        logger.error('[This username doesn\'t exists]  user:' + username + ' | code: ' + code);
                        res.json("error", 404);
                    }

                    var JSONObject = {"id": ObjResult.insertId};
                    var resultJSON = "{\"id\":\"" + ObjResult.insertId + "\"}";
                    var cleaner = "[" + resultJSON;
                    cleaner = cleaner.concat("]");
                    var sAnotacio = JSON.stringify(JSONObject);
                    var objetJson = JSON.parse(resultJSON);

                    res.json(objetJson, 200);

                }); //Anotation

            });

            /*
             Share annotations with other person with a special URL.
             /anotation/share/X3445D similar to tinyurl.
             @param: hashid: Shared code
             */
            app.get('/share/:hashid', function (req, res) {

                var hashids = new Hashids("shared_annotations", 8)

                var hashid = req.params.hashid;
                var annotationId = hashids.decrypt(hashid);
                console.log(hashid);

                //Searching the annotation
                if (annotationId.length > 0) {
                    var objAnnotation = new annotationDAO();
                    objAnnotation.find(annotationId[0], function (resultadoObj, err) {
                        if (err) {
                            logger.error('get ' + err);
                            res.setHeader('Content-Type', 'text/html');
                            var htmlFile = "<html><body>Can't find annotation</body></html>";
                            res.end(htmlFile);
                        } else {
                            //Getting annotation information
                            if (resultadoObj.length > 0) {
                                console.log(resultadoObj[0]);
                                var code = resultadoObj[0].code;
                                var annotation = resultadoObj[0].json_anotacio;

                                logger.info('[Load HTML]:' + code);
                                loggerConsole.info('[Load HTML]:' + code);
                                load_shared_html(code, annotation, res);

                            } else {
                                res.json(resultadoObj, 200);
                            }
                        }
                    });
                } else {
                    logger.error('can\'t find Id ');
                    res.setHeader('Content-Type', 'text/html');
                    var htmlFile = "<html><body>Can't find annotation</body></html>";
                    res.end(htmlFile);
                }

            });

            load_shared_html = function (code, annotation, res) {

                console.log(app.get('url_materials') + code + '.html');
                request(app.get('url_materials') + code + '.html', function (error, response, body) {

                    if (!error && response.statusCode == 200) {
                        res.setHeader('Content-Type', 'text/html');
                        var htmlFile = body.replace('{$__propietary__$}', '');
                        htmlFile = htmlFile.replace('{$__code__$}', '');
                        htmlFile = htmlFile.replace('annotator_init.js', 'annotations_shared.js');
                        res.end(htmlFile);


                    } else if (response.statusCode == 404) {
                        res.setHeader('Content-Type', 'text/html');
                        var htmlFile = "<html><body> " + code + ".html doesn't exists </body></html>";
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

            /*
             return json from small url
             @param: hashid: Shared code
             */
            app.get('/json/annotation/:hashid', function (req, res) {

                var hashids = new Hashids("shared_annotations", 8)

                var hashid = req.params.hashid;
                var annotationId = hashids.decrypt(hashid);

                //Searching the annotation
                if (annotationId.length > 0) {
                    var objAnnotation = new annotationDAO();
                    objAnnotation.find(annotationId[0], function (resultadoObj, err) {
                        if (err) {
                            logger.error('get ' + err);
                            res.setHeader('Content-Type', 'text/html');
                            var htmlFile = "<html><body>Can't find annotation</body></html>";
                            res.end(htmlFile);
                        } else {
                            //Getting annotation information
                            if (resultadoObj.length > 0) {
                                objTemp = JSON.parse(resultadoObj[0].json_anotation);
                                objTemp.id = resultadoObj[0].id;
                                objTemp.estat = resultadoObj[0].state;
                                objTemp.role = resultadoObj[0].role;
                                objTemp.order = resultadoObj[0].sort;
                                objTempString = JSON.stringify(objTemp);
                                res.json(objTempString, 200);
                            } else {
                                res.json(resultadoObj, 200);
                            }
                        }
                    });
                } else {
                    logger.error('can\'t find Id ');
                    res.setHeader('Content-Type', 'text/html');
                    var htmlFile = "<html><body>Can't find annotation</body></html>";
                    res.end(htmlFile);
                }

            });


            /*
             GET Annotations in PDF Format
             */
            app.get('/:username/:code.pdf', function (req, res) {

                var code = req.params.code;
                var username = req.params.username;

                logger.info('[Download PDF] user:' + username + ' | code: ' + code);
                loggerConsole.info('[Download PDF]  user:' + username + ' | code: ' + code);

                var objAnnotation = new annotationDAO();
                var i = 1;
                objAnnotation.getAll(username, code, function (ObjResult) {
                    var objpdf = new pdfanotations();
                    objpdf.getPDF(ObjResult, res, function (stream) {
                        stream.on('end', function () {
                            res.type('application/pdf');
                            res.end(stream, 'binary');
                        });
                    });
                });

            });


            load_html = function (code, username, res) {

                console.log(app.get('url_materials') + code + '.html');
                request(app.get('url_materials') + code + '.html', function (error, response, body) {

                    if (!error && response.statusCode == 200) {
                        res.setHeader('Content-Type', 'text/html');
                        var htmlFile = body.replace('{$__propietary__$}', username);
                        htmlFile = htmlFile.replace('{$__code__$}', code);
                        res.end(htmlFile);


                    } else if (response.statusCode == 404) {
                        res.setHeader('Content-Type', 'text/html');
                        var htmlFile = "<html><body> " + code + ".html doesn't exists </body></html>";
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
        });

    };

