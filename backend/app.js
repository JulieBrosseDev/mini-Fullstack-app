const  http  =  require('http');
const  path  =  require('path');
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const  morgan  =  require('morgan');
const  app  =  express();
const connection = require('./helpers/db.js');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));


app.get("/", (req,res) => {
    res.send("youhou");
})


app.post('/signup', (req, res) => {
    var data  = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    };
    connection.query('INSERT INTO users SET ?', data, (err, response, fields) => {
        if(err) {
           throw err;
        }else{
            console.log("THE DATA WAS INSERTED !!!")
            res.end();
        }
    });
});

/// in case path is not found, return the 'Not Found' 404 code
app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});


// launch the node server
let  server  =  app.listen( process.env.PORT  ||  5000, function(){
    console.log('Listening on port '  +  server.address().port);
});

