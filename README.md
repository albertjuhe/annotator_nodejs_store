Annotator with Nodejs + express + socket.io + MySQL
==================

##Annotator with Nodejs + express + socket.io + MySQL

Is a Sample and simple aplication than uses the Annotateit, nodejs and Mysql as a backend.
There is a folder called demoNodejs, this contains a sample html with annotateit, a category plug-in and a panel viewer plugin. From this sample you can export annotations to PDF.

You can execute after the installation with:
node node_aplicaction_folder/app.js
with the browswer:
http://localhost:3000/annotation/testuser1/demo.html
and test with other users
http://localhost:3000/annotation/testuser2/demo.html
http://localhost:3000/annotation/testuser3/demo.html

In the annotator display panel you can see the users that are currently viewing the same content.

##Installation

You need install several in the nodejs folder package before start (npm install):
- express
- i18n
- log4js
- underscore
- mysql
- http
- request
- pdfkit
- socket.io

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

materials: URL where we can find documents.
server: database server
user:database user
password: database password
port: port where we can find the aplication

You have to copy the folder: demoNodejs into your http server (ex:C:\wamp_server\www\demoNodejs).

For the PDF export anotations, you have to copy the folder fonts and img in the root folder of nodejs.
After this you have to update the app.js file, you have to change the line:

 __dirname = 'C:\\wamp_server\\www\\demoNodejs\\';

 and change for the folder where are the js,css,locale,etc..., if you follow the installation steps you can't change this line.

 Inside the sql folder you can find the database sample structure that I have created, open the sql files and execute the content in a mysql database.

The file that you have to execute is app.js, ex:nodejs folder_name/app.js and from the browser, If you haven't change the port, with http://localhost:3000/annotation/testuser/demo.html, if you want to test with diferent user only change the username.

demo.html is the file that you can find inside the demoNodejs, you can copy other files inside this folder and put the annotateit javascript inside to test with other files.

After the excution you can find a log files in the log folder.

##Development

All the routing in the nodejs application are in the lib\rest\buffer.js
update annotation: app.put('/annotation/update/:username/:code/:id', function(req, res)
delete annotation app.delete('/annotation/destroy/:username/:code/:id', function(req, res) 
get annotations app.get('/annotation/get/:username/:code', function(req, res)
get HTML file and render: app.get('/annotation/:username/:code.html', function(req, res)
new annotation: app.post('/annotation/new/:username/:code', function(req, res)
get annotations in pdf format: app.get('/annotation/:username/:code.pdf', function(req, res)

##Database

there are two tables:
Table anotacions where we store annotations.
Table log where we store the logs.


Inside the file demoNodejs/demo.html you can find the store plug-in configuration, with the rest services.

```html
 <script>
      var socket = io.connect('http://localhost:3000');
      var propietary = '{$__propietary__$}';
      var code = '{$__code__$}';

     

      jQuery(function($) {
                    //Internazionalization
                    $.i18n.load(i18n_dict);
                   
                 
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
                       $('body').annotator().annotator('addPlugin', 'Categories',{
                           errata:'annotator-hl-errata',
                           destacat:'annotator-hl-destacat',
                           subratllat:'annotator-hl-subratllat' }
                     );
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
                   $('body').annotator().annotator('addPlugin', 'visorAnotacions');
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


