
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var session = require('cookie-session');
var favicon = require('serve-favicon');
var passport = require('passport'),
    InstagramStrategy = require('passport-instagram').Strategy;
var config = require('./modules/config');

var app = express();

// all environments
app.configure(function() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(session({
        keys: ['key1', 'key2']
    }))
    app.use(csrf());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/users', user.list);

passport.use(new InstagramStrategy({
        clientID: config.get('instagram:client_id'),
        clientSecret: config.get('instagram:client_secret'),
        callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(profile);

        process.nextTick(done(null, profile));
    }
));
app.get('/auth/instagram/callback',
    function(req, res, next) {
        passport.authenticate('instagram', function(accessToken, user) {
            console.log(accessToken);
        });
    }
);

app.get('/auth/instagram',
    passport.authenticate('instagram'),
    function(req, res) {
        console.log('authed');
    }
);


app.listen(config.get('port'), function(){
  console.log('Express server listening on port ' + config.get('port'));
});
