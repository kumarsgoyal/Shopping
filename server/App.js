const express = require('express');
const session = require('express-session');
var bodyParser = require("body-parser");
const cors = require('cors');
require('./db.js')

const seller = require('./routes/seller');
const category = require('./routes/category');
const product = require('./routes/product.js');
const customer = require('./routes/customer.js');
const review = require('./routes/review.js');
const admin = require('./routes/admin');

const app = express();


// port no. of server
const port = 5000;

const whiltelist = ['http://localhost:3000'];
const corsOption = {
    origin: function(origin, callback) {
        if(whiltelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed By CORS'))
        }
    },
    credentials: true
}

// app.use(bodyParser.json());
// increasing the limit to upload photos 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors(corsOption));


app.use(session({
    key: 'passiskey',
    secret: 'passmusrbesecret',
    saveUninitialized: true,
    resave: 'false',
    // else cookie changes on each request
    cookie: { secure: false }
}))


const aunt = (req, res, next) => {
    if(req.session.email) {
        next();
    }
}

const logt = (req, res, next) => {
    if(req.session.email) {
        req.session.email = null;
        next();
    }
    else {
        res.status(401);
    }
}



// rishabh changes
app.use('/category', category);
app.use('/seller', seller);
app.use('/product', product);
app.use('/customer', customer);
app.use('/reviews', review);
app.use('/admin',admin);

app.listen(port, () => {
    console.log('server is running on port' + port);
})



// killall node
