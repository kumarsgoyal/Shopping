// const mongoose = require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateRegisterInput = require('../validation/Register');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
var hash;

var Seller = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    shop_name: {
        type: String,
        require: true
    },
    avg_rating: {
        type: Number,
        default: 0.0
    },
    number_of_reviews: {
        type: Number,
        default: 0.0
    },
    address: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});

SellerModel = mongoose.model("Seller", Seller);

SellerModel.updateProfile = (req, callback) => {
    const x = validateRegisterInput(req.body);
    console.log('update profile', x);
    if(x.isValid === true) {
        hash = bcrypt.hashSync(req.body.password1, salt); 
        let seller = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            shop_name: req.body.shop_name,
            phone_no: req.body.mobile,
            // rating: '',
            password: hash,
        };    
        SellerModel.findOneAndUpdate({_id: req.body.seller_id}, seller, callback);
    }
    else {
        res.status(405).send("password doesn't match");
    }


}

module.exports = SellerModel;
