Annotator with Nodejs + express + socket.io + MySQL
==================

##Annotator with Nodejs + express + socket.io + MySQL

Is a sample and a simple aplication that uses the Annotateit (http://annotateit.org/) with nodejs and Mysql as a back store. The main aim is create an application for make annotations to the project Guttenberg books.
There is a folder called demoNodejs, this folder contains a  demo and several plug-ins, a category plug-in, store plug-in, and a panel viewer plugin (https://github.com/okfn/annotator/wiki). 
This aplication let you store, delete and update annotations, export anotations to PDF, display annotations in a right panel viewer, create annotations with Tinymce, categorize annotations and share annotations.

The annotations are displayed in the right panel with an icon for deleting, editing using TinyMce, and a little eye, it means that the annotations is shared. If you are the owner of the annotations your username is displayed in a white background, if not it is displayed in a gray background.

The book that will be annotate, could be imported from the Guttenber ebooks in epub format, I've created a paralel project that allow us do that.

This Application uses [annotator 1.2.9] (https://github.com/openannotation/annotator/releases/tag/v1.2.9)

##Complete Demo

[Demo Frankenstein](http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/mary/demo.html)

Its a completely opened demo, you can use all the users that you want without security, its a demo.
If you want to change the user, you only have to change the user in the URL:
http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/user/demo.html

I've created a [mary](http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/mary/demo.html) and [testuser] (http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/testuser/demo.html).

The HTML that we can annotate is an especial HTML5 format, we can achieve this format using an [epub to other formats project](https://github.com/albertjuhe/epub-to-other-formats), this project convert epub, from the [Guttenberg Library](http://www.gutenberg.org/) to other formats, in our case we need the HTML5 annotation format.

There is a backend to view stadistics about annotations added, this back end has been developed using [passport] (http://passportjs.org/) and ejs for templating. The backend is in http://localhost:3000/login
http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/login

You can enter to the admin using http://localhost:3000/login user:testAdmin and password:password.

The backoffice has been developed in a file called backOfficeRouting.js.

##Demo

You can execute after the installation with: node node_aplicaction_folder/app.js
You can try with this URL:
http://localhost:3000/annotation/testuser1/demo.html
and test with other users
http://localhost:3000/annotation/testuser2/demo.html
http://localhost:3000/annotation/testuser3/demo.html

In the annotator display panel you can see the users that are currently viewing the same content, the same contens means the same HTML file.

##Annotatorjs Plug-ins Used
- [Panel Margin View Annotations](https://github.com/albertjuhe/annotator_view)
- [Annotations Categorization](https://github.com/albertjuhe/annotator_view/blob/master/src/categories.js)
- [RichEditor](https://github.com/albertjuhe/richEditor)
- [Share annotations](https://github.com/albertjuhe/Share-annotations-with-SmallUrl-for-Annotatorjs)

##Installation

You need install several in the nodejs folder package before start (npm install):
- express (http://expressjs.com/)
- i18n (https://github.com/mashpie/i18n-node)
- log4js (https://github.com/nomiddlename/log4js-node)
- underscore
- mysql
- hasids
- http
- request
- wkhtmltopdf (Export annotaions to PDF format) (https://www.npmjs.org/package/wkhtmltopdf)
- socket.io (http://socket.io/) Who is reading the content. Chat rooms in the future.
- passport
- ejs
- connect-flash
- multer (upload files)
- express-namespace //Namespaces in express routes

Copy the content of the github into the nodejs folder.
Inside this folder there is a file called config.json, is the config file.

```json
 {
    "materials": "http://localhost/demoNodejs/",
    "server": "localhost",
    "user": "root",
    "password": "",
    "database": "annotations",   
    "database_port":3306,
    "port": 3000

}
```

* materials: URL where we can find documents.
* server: database server
* user:database user
* password: database password
* port: port where we can find the aplication

You have to copy the folder: demoNodejs into your http server (ex:C:\wamp_server\www\demoNodejs).

For the PDF export anotations, firts install wkhtmltopdf and configure it, follow the web site instructions.
After this you have to update the app.js file, you have to change the line:

```nodejs
 __dirname = 'C:\\wamp_server\\www\\demoNodejs\\';
```

 and change for the folder where are the js,css,locale,etc..., if you follow the installation steps you can't change this line.

 Inside the sql folder you can find the database sample structure that I have created, open the sql files and execute the content in a mysql database.

The file that you have to execute is app.js, ex:nodejs folder_name/app.js and from the browser, If you haven't change the port, with http://localhost:3000/annotation/testuser/demo.html, if you want to test with diferent user only change the username.

demo.html is the file that you can find inside the demoNodejs, you can copy other files inside this folder and put the annotateit javascript inside to test with other files.

After the excution you can find a log files in the log folder.

Inside the file demoNodejs/demoNodejs/js/annotator_init.js you can find the plug-ins configuration for annotations.

```html
 <script>
      var socket = io.connect('http://localhost:3000');
      var propietary = '{$__propietary__$}';
      var code = '{$__code__$}';

      jQuery(function($) {

                    $.i18n.load(i18n_dict); //Internazionalization

                    var annotator = $('body').annotator().annotator().data('annotator');
                    annotator.addPlugin('Permissions', {
                        user: propietary,
                        permissions: {
                            'read': [propietary],
                            'update': [propietary],
                            'delete': [propietary],
                            'admin': [propietary]
                        },
                        showViewPermissionsCheckbox: true,
                        showEditPermissionsCheckbox: false
                    });
                    //Categories: Name of the annotation: css to apply
                       $('body').annotator().annotator('addPlugin', 'Categories',{
                           errata:'annotator-hl-errata',
                           destacat:'annotator-hl-destacat',
                           subratllat:'annotator-hl-subratllat' }
                     );
                   $('body').annotator().annotator('addPlugin', 'RichEditor');
                   $('body').annotator().annotator('addPlugin', 'Markdown');
                   $('body').annotator('addPlugin', 'Store', {
                        prefix: 'http://localhost:3000/annotation',
                        urls: {
                            // These are the default URLs.
                            create: '/new/'+propietary+'/'+code,
                            read: '/get/'+propietary+'/'+code,
                            update: '/update/'+propietary+'/'+code+'/:id',
                            destroy: '/destroy/'+propietary+'/'+code+'/:id'
                        }
                    });
                   $('body').annotator().annotator('addPlugin', 'viewannotator');
               jQuery("body").annotator().annotator('addPlugin', 'Touch', {
               force: location.search.indexOf('force') > -1,
               useHighlighter: location.search.indexOf('highlighter') > -1
               });
                   $('#anotacions-uoc-panel').slimscroll({height: '100%'});
                });

         socket.emit('login', { username: propietary });
         socket.emit('join',code);

         socket.on('notification', function (data) {
            var n = data.online;
             $('#count-anotations-alert').text(n);

      });
      </script>
```

      The content of the variable propietary are overwrite by the nodejs,

      var propietary = '{$__propietary__$}';
      var code = '{$__code__$}';.

      Its important that the socket.io connection
      var socket = io.connect('http://localhost:3000');
      use the same port than the nodejs.

      When a user is displaying a document for example:
      http://localhost:3000/annotation/testuser2/demo.html nodejs are executing (get), the aplication search in the anotations table, all the annotations belonging to testuser2 with code equal to demo.

##Plugins

There are a several Annotator plugins:
- Panel Viewer Plugin (demoNodejs/js/viewannotations.js)
- Categorization plugin (demoNodejs/js/categories.js)
- RichEditor Plugin (demoNodejs/js/richEditor.js) Use tinymc 4.0
- Share annotations
- Categorize plugin

##Annotator Development

**In this new release Annotator is modified, this aplication uses 1.2.9 version.**
- Store.prototype.annotationCreated = function(annotation) has been modified, added an id annotation attribute.

##Nodejs Development

- All the routing in the nodejs application are in the lib\rest\buffer.js

REST Services Annotatorjs vs. Nodejs

- update annotation: app.put('/annotation/update/:username/:code/:id', function(req, res)
- delete annotation app.delete('/annotation/destroy/:username/:code/:id', function(req, res) 
- get annotations app.get('/annotation/get/:username/:code', function(req, res)
- get HTML file and render: app.get('/annotation/:username/:code.html', function(req, res)
- new annotation: app.post('/annotation/new/:username/:code', function(req, res)
- get annotations in pdf format: app.get('/annotation/:username/:code.pdf', function(req, res)
- BackOffice control in lib\rest\back_office.js. User back office control.

##Upload files
We need to upload files that will be annotated, this files will be uploaded in epub format.
We use the 'multer' lib.

First we need to handle application/x-www-form-urlencoded for uploading, we have to add app.use(express.urlencoded());
in the app.js.

After this we need to control the uploading, for this stuff we use multer lib. After upload we rename the file, unique name.

```javascript
    var upload_folder = './upload';
    app.use(multer({ dest: upload_folder,
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
        }
    }));
```


After Uploading a file, we can bind a special behaviour.

```javascript
 app.post('/upload', function(req, res) {
        console.log("New file added");
        console.log(process.cwd());
        res.redirect('/profile');
    });
```

##BackOffice
The Back office Routing is in the backOfficeRouting.js, to control user access we use passport and a passport-local strategy:
```javascript
    var LocalStrategy   = require('passport-local').Strategy;
```

Passport needs several functions to control user access as passport.serializeUser, passport.deserializeUser and isLoggedIn.
All this functions uses the UserController (DAO/user.js) class and the user model (model/user.js) to control Users using MySQL. For encription we use bcrypt-nodejs library.

##Database

there are two tables:
Table anotacions where we store annotations.
Table log where we store the logs.








