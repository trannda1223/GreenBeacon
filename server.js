// basic server
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Middleware
var parser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var routes = require('./routes');
var config = require('./example_config');
passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// set configuration keys for Github authentication via Passport
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || config.keys.gitHubClientId,
  clientSecret: process.env.GITHUB_SECRET_KEY || config.keys.gitHubSecretKey,
  callbackURL: process.env.GIT_CALLBACK_URL || config.keys.gitCallbackUrl
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 600000*3} //30 mins
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/Client'));
app.use(parser.json());


routes.router(app);

io.on('connection', function(socket){
  console.log('a user connected!');
  socket.on('disconnect', function(){
    console.log('a user disconnected!');
  })
});

http.listen(port, function() {
  console.log('listening on port: ' + port);
});

module.exports.app = app;
