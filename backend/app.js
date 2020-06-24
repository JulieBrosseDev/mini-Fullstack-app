const  http  =  require('http');
const  path  =  require('path');
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const connection = require('./helpers/db.js');






  var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

  
  
const  bodyParser  =  require('body-parser');
const  morgan  =  require('morgan');
const port = process.env.PORT || 5000;



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));



app.get('/',
  function(req, res) {
    res.render('signup', { user: req.user });
  });

// const checkData = (data, request, response) => {
//     var email = data.email
//     var passwordconf = request.body.passwordconf
//     var password = data.password
//     //checkValidation()
//     const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return(
//     checkEmail.test(String(email).toLowerCase())
//     ? password === passwordconf 
//         ?  connection.query('INSERT INTO users SET ?', data, (err, res, fields) => {
//             if (err)
//                 res.status(500).json({ flash:  err.message });
//             else
//                 res.status(200).json({ flash:  "User has been signed up!" });
//             })
//         : res.status(500).json({ flash: "Please confirm your password again" })

//     : res.status(500).json({ flash: "Please give a correct email" })
//     )
// }


app.post('/signup', (req, res) => {
    var data  = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };
    const request = req
    const response = res
    // checkDatat(data, response, request)
     var email = data.email
     var passwordconf = req.body.passwordconf
     var password = data.password
     //checkValidation()
     const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     // *** LATER : SET ALL THE CODE BELLOW MADE TO CHECK BAD INFORMATION ENTRANCE, IN AN OUTSIDE FUNCTION *** /
     checkEmail.test(String(email).toLowerCase())
     ? password === passwordconf 
         ?  connection.query('INSERT INTO users SET ?', data, (error, response, fields) => {
             if (error)
                 res.status(500).json({ flash:  error.message });
             else
                res.status(200).json({ flash:  "User has been signed up!" , path: '/profile'})
             })
         : res.status(500).json({ flash: "Please confirm your password again" })

     : res.status(500).json({ flash: "Please give a correct email" });
});


app.post('/signin', (req, res) => {
  var data  = {
      email: req.body.email,
      password: req.body.password
  };
  const request = req
  const response = res
  // checkDatat(data, response, request)
   //checkValidation()
   const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   // *** LATER : SET ALL THE CODE BELLOW MADE TO CHECK BAD INFORMATION ENTRANCE, IN AN OUTSIDE FUNCTION *** /
   checkEmail.test(String(data.email).toLowerCase())
       ?  connection.query(`SELECT * FROM users WHERE email = "${data.email}" AND password = "${data.password}"`, (error, response, fields) => {
        console.log('helloooooooo' + response[0])
        if (error)
               res.status(500).json({ flash: error.message});
           else
           response != '' 
           ? res.status(200).json({ flash:  "Welcome", path: '/profile'})
           : res.status(200).json({ flash:  `The email or the password is incorrect`  , path: '/profile'})
           })
   : res.status(500).json({ flash: "Please give a correct email" });
});

// in case path is not found, return the 'Not Found' 404 code
app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

app.get('/signin',
  function(req, res){
    res.render('login');
  });
  
// app.post('/signin', (req, res) => {
//   res.send("hello")
//   // passport.authenticate('local', { failureRedirect: '/' }),
//   // function(req, res) {
//   //   console.log("here we are")
//   //   res.redirect('/');
//   });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


// launch the node server
let  server  =  app.listen( process.env.PORT  ||  5000, function(){
    console.log('Listening on port '  +  server.address().port);
});

