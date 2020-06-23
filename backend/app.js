const  http  =  require('http');
const  path  =  require('path');
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const  morgan  =  require('morgan');
const  app  =  express();
const connection = require('./helpers/db.js');
const port = process.env.PORT || 5000;



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));


app.get("/", (req,res) => {
    res.send("youhou");
})

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

// in case path is not found, return the 'Not Found' 404 code
app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});


// launch the node server
let  server  =  app.listen( process.env.PORT  ||  5000, function(){
    console.log('Listening on port '  +  server.address().port);
});

