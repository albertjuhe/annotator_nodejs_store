Annotator with Nodejs + express + socket.io + MySQL
==================

##Annotator with Nodejs + express + socket.io + MySQL

Is a sample and a simple aplication that uses the Annotateit (http://annotateit.org/) with nodejs and Mysql as a back store.

There is a folder called demoNodejs, this folder contains a  demo and several plug-ins, a category plug-in, store plug-in, and a panel viewer plugin (https://github.com/okfn/annotator/wiki). 
This application let you store, delete and update annotations, export annotations to PDF, display annotations in a right panel viewer, create annotations with Tinymce, categorize annotations and share annotations.

The annotations are displayed in the right panel with an icon for deleting, editing using TinyMce, and a little eye, it means that the annotations is shared. If you are the owner of the annotations your username is displayed in a white background, if not it is displayed in a gray background.

The documents that you can anotate could be created by hand or usign a paralel tool that I have created, this tool converts a epub (ebook) to HTML5 document that can be annotated. We could import from the Guttenber ebooks in epub format (https://github.com/albertjuhe/epub-to-other-formats).

This Application uses [annotator 1.2.9] (https://github.com/openannotation/annotator/releases/tag/v1.2.9)

##Complete Demo

[Demo Frankenstein](http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/mary/demo.html)

Its a completely opened demo, you can use all the users that you want without security, its a demo.
If you want to change the user, you only have to change the user in the URL:
http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/user/demo.html

I've created a [mary](http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/mary/demo.html) and [testuser] (http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/testuser/demo.html).

The HTML that we can annotate is an especial HTML5 format, we can achieve this format using an [epub to other formats project](https://github.com/albertjuhe/epub-to-other-formats), this project convert epub, from the [Guttenberg Library](http://www.gutenberg.org/) to other formats, in our case we need the HTML5 annotation format.

There is a backend to view statistics about annotations added, this back end has been developed using [passport] (http://passportjs.org/) and ejs for templating. The backend is in http://localhost:3000/login
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

### Download basics
First you have to install nodejs [http://nodejs.org/download/]. (For example I have installed in C:\nodejs).

This aplication uses MySQL and Apache 4.2.2, you need to install Xampp [https://www.apachefriends.org/index.html], Wampp [http://www.wampserver.com/en/], or similar software. Xampp and Wampp installs Apache, MySQL, PHP, phpMyAdmin and Perl.

### Download project
There are two ways to download the project: Using Git clone or download the last Release.
* With Git you first need to have installed the Git and execute from the command line 
```
c:\nodejs\>git clone https://github.com/albertjuhe/annotator_nodejs_store.git
```
* Download the last release. Its in Zip format you have to unzip it, for example inside de nodejs folder c:\nodejs\annotator_nodejs_store.

The file that needs to start the aplication is app.js. If you try to execute the project with:
```
node app.js
```
Node likely throw and exception like this:
```
C:\nodejs\annotator_nodejs_store>node app.js

module.js:340
    throw err;
          ^
Error: Cannot find module 'log4js'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.Module._load (module.js:280:25)
    at Module.require (module.js:364:17)
    at require (module.js:380:17)
    at Object.<anonymous> (C:\nodejs\annotator_nodejs_store\app.js:24:14)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
 ```
Because need some external libraries (modules). In this case node says that can't find log4js module, to figure out this you need to install node modules.

### Install node modules

Now you need to install all the libraries (modules) that needs the aplication to work. 
Use the sentence 
c:\nodejs\> install -g [module] or c:\nodejs\annotator_nodejs_store> install [module]
You need install this modules:
- express (http://expressjs.com/)
```
c:\nodejs\annotator_nodejs_store>npm install express --save
```
- i18n (https://github.com/mashpie/i18n-node). This modules for work with different languages.
```
c:\nodejs\annotator_nodejs_store>npm install i18n
```
- log4js (https://github.com/nomiddlename/log4js-node). This module stores a log message similar to log4j (java).
```
c:\nodejs\annotator_nodejs_store>npm install log4js
```
- underscore
- mysql
```
c:\nodejs\annotator_nodejs_store>npm install mysql
```
- hashids. Used to generate unique key.
```
c:\nodejs\annotator_nodejs_store>npm install hashids
```
- http
- request
- wkhtmltopdf (Export annotaions to PDF format) (https://www.npmjs.org/package/wkhtmltopdf)
- socket.io (http://socket.io/) Who is reading the content. Chat rooms in the future.
- passport [http://passportjs.org/], Simple, unobtrusive authentication for Node.js
```
c:\nodejs\annotator_nodejs_store>npm install passport
```
- bcrypt-nodejs. Used for passport module
```
c:\nodejs\annotator_nodejs_store>npm install bcrypt-nodejs
```
- passport-local. Used for passport module
```
c:\nodejs\annotator_nodejs_store>npm install passport-local
```
- ejs
- connect-flash
```
c:\nodejs\annotator_nodejs_store>npm install connect-flash
```
- multer (upload files)
- express-namespace //Namespaces in express routes

For the PDF export anotations, firts install wkhtmltopdf (https://www.npmjs.com/package/wkhtmltopdf) and configure it, follow the web site instructions.

### Config project

Inside the app.js there is an important variable: __dirname, is the folder where nodejs search css,js and images.
```
__dirname = 'C:\\nodejs\\annotator_nodejs_store\\demoNodejs\\';
```

The documents that have to be annotated must be copied to the http://localhost/demoNodejs/ (C:\wamp_server\www\demoNodejs) folder.

Inside this folder c:\nodejs\annotator_nodejs_store\config.json there is a file called config.json, is the config file.

```json
#C:\nodejs\annotator_nodejs_store\config.json
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

* materials: URL where we can find documents that will be annotated (for this reason needs xampp or wampp). In this case, http://localhost/demoNodejs/, if you have wampp installed in the C:\wamp_server folder the folder http://localhost/demoNodejs/ will be C:\wamp_server\www\demoNodejs.
* server: database server
* user:database user
* password: database password
* port: port where we can find the aplication (Ex:3000) the application works in the port number 3000.

Log4js config:
```
// Logger configuration
log4js.configure({
 appenders: [
   { type: 'console', category: 'loggerAnotacionsConsole' },
   { type: 'file', filename: './logs/anotacions.log', category: 'loggerAnotacionsFile' }
  ]
});
```
We need this folder and file to store logs:
the appender -> filename. C:\\nodejs\\annotator_nodejs_store\\logs\\anotacions.log. 

### Database

The back store uses Connection Pooling.

Create the database annotations, database variable..
```json
#C:\nodejs\annotator_nodejs_store\config.json
 {
    ...
    "server": "localhost",
    "user": "root",
    "password": "",
    "database": "annotations",   
    "connectionLimit":10,
    "database_port":3306,
    ...

}
```
Inside the c:\nodejs\annotator_nodejs_store\sql folder you can find the database sample structure that I have created, open the sql files and execute the content in a annotations mysql database.

There are two tables:
Table anotacions where we store annotations.
Table log where we store the logs.
Table last-login. Last login to the backoffice
Table users: Back office users

#### Connection Pooling

The connections Pooling are in the folder lib/database/pooling.js and mysql.js.

In the file pooling.js we load the pool configuration, in the variable poolData we store the parameters, on of this parameters is very important for the pool, this parameter is connectionLimit: The maximum number of connections to create at once, default: 10.

```
 var poolData = {
        host: config.server,
        database: config.database,
        user: config.user,
        password: config.password,
        port: config.database_port,
        connectionLimit: config.connextionLimit
    };

    var pool = mysql.createPool(poolData);

    exports.getConnection = function (callback) {
        pool.getConnection(function (err, connection) {
            callback(err, connection);
        });
    };
```
After the configuration data we create the pool mysq.createPool(..) and finally we create a connection manager called getConnectio.

This class is used in the mysql.js file to execute queries, var mysqlPooling = require('../database/poolling');

```
var mysqlPooling = require('../database/poolling');

var MySQL = function(){
....
 var query = function(str,callback){
        mysqlPooling.getConnection(function(err, conn){
            conn.query( str,  function(err, rows,fields){
                if(err)	{
                    throw err;
                }else{
                    callback(err,rows,fields);
                }
            });
            conn.release();
        })
    };
    ...
        return {query:query,clean:clean}
};
module.exports = MySQL;
```
Inside this class we have created a functions that manage Queries, its important to release the connection after using it.

### Execute

The file that you have to execute is app.js (c:\nodejs\nodejs annotator_nodejs_store\app.js).
```
(c:\nodejs\nodejs annotator_nodejs_store\node app.js
```
In the console you must view
```
[2015-01-01 11:18:40.998] [DEBUG] loggerAnotacionsConsole - Loaded.3000
   info  - socket.io started
 ```
 
and from the browser, If you haven't change the port, with http://localhost:3000/annotation/testuser/demo.html, if you want to test with diferent user only change the username (testuser).

###PDF
Install wkhtmltopdf (http://wkhtmltopdf.org/downloads.html). (ex: c:\wkhtmltopdf).

To export the annotatios to pdf you need to configure the PATH (environment variables) to c:\wkhtmltopdf\bin.

### Annotatorjs config

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









