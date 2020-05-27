const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/Register');
const ClientModel = require('../models/clientmodel')
const ProductReviewsModel = require('../models/productReviewsModel.js');
const mongoose = require('mongoose');
const ProductModel = require('./../models/productModel.js');
const OrderModel = require('./../models/orderModel');
const CartModel = require('./../models/cartModel.js');

var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
var hash;

const customerCookieValidator = (req, res, next) => {
    console.log('cookie validator called');
    // console.log(req.session.user_id, req.session.account_type);
    if(req.session.user_id && req.session.account_type === 'customer'){
        ClientModel.findOne({_id: mongoose.Types.ObjectId(req.session.user_id)}, (error, result)=>{
            // console.log('result', result);
            if(error){
                // console.log(error);
                res.status(501).send({error: true,message: 'server eroor'})
            }
            if(result)
            {
                // console.log('customer vallidated');
                next();
            }
            else{
                // console.log('no customer found');
                res.status(401).send({error: false, message: 'not authenticated', loginRequired: true})
            }
        })
    }
    else{
        res.status(401).send({error: false, message: 'not authenticated', loginRequired: true})
    }
}

router.post('/login', function(req, res) {
    ClientModel.findOne({email: req.body.email}, function(err, user) {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                // req.session.email = user.email;
                req.session.account_type = 'customer';
                req.session.user_id = user._id;
                res.status(200).send({user: user});
            }
            else {
                res.status(401).send("Oh uh, something went wrong");
            }
        }
        else {
            res.status(401).send("Oh uh, something went wrong");
        }  
    }).catch(error => {
        res.status(501).send("error");
    })
})

router.post('/register', function(req, res) {

    const x = validateRegisterInput(req.body);
    if(x.isValid === true) {
        ClientModel.findOne({email: req.body.email}).then(user => {
            if(user) {
                res.status(401).send("invalid credentials");
            }
            else {
                hash = bcrypt.hashSync(req.body.password1, salt); 
                const newrecord = new ClientModel({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    address: req.body.address,
                    phone_no: req.body.mobile,
                    password: hash,
                });
                newrecord.save().then(data => {
                    res.status(200).send("ok");
                }).catch(err => {
                    res.status(501).send("error");
                })
            }
        }).catch(error => {
            res.status(501).send("error");
        })

    }
    else {
        res.status(405).send("password doesn't match");
    }
})



router.post('/addOrder', customerCookieValidator, (req, res) => {
    console.log("sasasa");
    OrderModel.addOrder(req, (error, response) => {
        // req.body = {product, delivery_address, units}
        if(error) {
            // console.log(error);
            res.status(501).send("error, in adding order");
        }
        if(response) {
            // order added, now increase the number of soled units
            // console.log(response);
            // res.status(200).send("success");
            // console.log(ProductModel.increaseProductUnitSold);
            ProductModel.increaseProductUnitSold(req, (error, response) => {
                if(error) {
                    // console.log(error);
                    res.status(501).send("error, in increasing the sold amount");
                }
                if(response) {
                    // console.log(response);
                    res.status(200).send("success");
                }
            })
        }
    })
})

router.post('/addProductReview', customerCookieValidator, (req, res) => {
    ProductReviewsModel.addReview(req, (error, response) => {
        if(error) {
            // console.log(error);
            res.status(501).send("error in add review");
        }
        if(response) {
            // console.log(response);
            ProductModel.updateReviews(req, (error, response) => {
                if(error) {
                    // console.log(error);
                    res.status(501).send("error in updating avg_rating of product");
                }
                if(response) {
                    // console.log(response);
                    res.status(200).send("success");
                }
            })
        }
    })
})

router.post('/addToCart', customerCookieValidator, (req, res) => {
    CartModel.addProduct(req, (err, result) => {
        if(err) {
            // console.log(err);
            res.status(501).send("error");
        }
        if(result) {
            // console.log(result);
            res.status(200).send("success");
        }
    })
})


router.post('/removeFromCart', customerCookieValidator, (req, res) => {
    CartModel.removeProduct(req, (err, result) => {
        if(err) {
            // console.log(err);
            res.status(501).send("error");
        }
        if(result) {
            // console.log(result);
            res.status(200).send("success");
        }
    })
})

router.get('/isInCart', customerCookieValidator, (req, res) => {
    CartModel.isInCart(req, (err, result) => {
        if(err) {
            // console.log(err);
            res.status(501).send("error");
        }
        if(result) {
            // console.log(result);
            if(result.length > 0) {
                res.status(200).send({isInCart: true});
            }
            else {
                res.status(200).send({isInCart: false})
            }
        }
    })
})

router.get('/getCart', customerCookieValidator, (req, res) => {
    CartModel.addProduct(req, (err, result) => {
        if(err) {
            // console.log(err);
            res.status(501).send("error");
        }
        if(result) {
            // console.log(result);
            ProductModel.getProductsFromIds(result.products, (e, r) => {
                if(e) {
                    // console.log(e);
                    res.status(501).send("error");
                }
                if(r) {
                    // console.log(r);
                    res.status(200).send({products: r});
                }
            })
        }
    })
})

router.get('/isReviewed/:id', customerCookieValidator, (req, res) => {
    ProductReviewsModel.isReviewed(req, (err, result) => {
        if(err) {
            // console.log(err);
            res.status(501).send("error");
        }
        if(result) {
            // console.log(result);
            if(result.length > 0) {
                res.status(200).send({isReviewed: true,Review:result[0]});
            }
            else {
                res.status(200).send({isReviewed: false,Review:result[0]});
            }
        }
    })
})

router.put('/editProductReview',customerCookieValidator,(req,res)=>{
    ProductReviewsModel.editReview(req,(err,response)=>{
        if(response){
            res.status(200).send('updated');
        }
        if(err){
            res.status(501).send('error');
        }
    })
})

module.exports = router