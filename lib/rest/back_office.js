var annotationDAO = require('../DAO/annotatio');
var UserController = require('../DAO/user.js');
var UserEntity = require('../model/User.js');
var fs = require('fs');
var log4js = require('log4js');
var logger  = log4js.getLogger('loggerAnotacionsFile');
var loggerConsole = log4js.getLogger('loggerAnotacionsConsole');
var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(app,passport){

    var UserAnotation = new UserController();

	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

    app.get('/insertAdmin', function(req, res) {
        UserAnotation.save('admin','pass', function(user) {
              console.log(user);
        });
    });

	passport.use('local-login', new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
			// we are checking to see if the user trying to login already exists

            UserAnotation.findOne(username, password, function(err, user, password) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Incorrect.')); // req.flash is the way to set flashdata using connect-flash

    			// if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Incorrect.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }
    ));

      // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages        
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });


	passport.serializeUser(function(user, done) {
       done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(u, done) {
         UserAnotation.findById(u.id, function(err, user) {
            done(err, user);
        });
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }

    app.post('/upload', function(req, res) {
        console.log("New file added");
        console.log(process.cwd());
        res.redirect('/profile');
    });
};