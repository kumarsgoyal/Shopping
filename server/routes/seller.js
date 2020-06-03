const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateRegisterInput = require('../validation/Register');
const SellerModel = require('../models/sellermodel')
const ProductModel = require('../models/productModel') 
const ProductImagesModel = require('../models/productImagesModel')
const OrderModel = require('../models/orderModel.js');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
var hash;

const sellerCookieValidator = (req, res, next)=>{
    // console.log(req.session.user_id, req.session.account_type);
    if(req.session.user_id && req.session.account_type === 'seller'){
        SellerModel.findOne({_id: mongoose.Types.ObjectId(req.session.user_id)}, (error, result)=>{
            // console.log('result', result);
            if(error){
                // console.log(error);
                res.status(501).send({error: true,message: 'server eroor'})
            }
            if(result)
            {
                // console.log('seller vallidated');
                next();
            }
            else{
                // console.log('no seller found');
                res.status(401).send({error: false, message: 'not authenticated', loginRequired: true})
            }
        })
    }
    else{
        // console.log('not logged in');
        res.status(401).send({error: false, message: 'not authenticated', loginRequired: true})
    }
}

router.get('/getLoggedInUserInfo', sellerCookieValidator, (req, res) => {
    SellerModel.findOne({_id: req.session.user_id}, (err, user) => {
        if(err) {
            res.status(501).send("error");
        }
        if(user) {
            res.status(200).send({user})
        }
    })
})

router.post('/login', function(req, res) {
    SellerModel.findOne({email: req.body.email}, function(err, user) {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                req.session.email = user.email;
                req.session.user_id = user._id;
                req.session.account_type = 'seller';
                // console.log(req.sessionID);
                res.status(200).send({user: user.first_name + " " + user.last_name, account_type: 'seller'});
                
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
        SellerModel.findOne({email: req.body.email}).then(user => {
            if(user) {
                res.status(401).send("invalid credentials");
            }
            else {
                hash = bcrypt.hashSync(req.body.password1, salt); 
                const newrecord = new SellerModel({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    address: req.body.address,
                    shop_name: req.body.shop_name,
                    phone_no: req.body.mobile,
                    rating: '',
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

// protected routes
router.post('/addProduct', sellerCookieValidator, (req, res) => {
    // validation pending

     ProductModel.addProduct(req, (error, product_added) => {
        if(error) {
            // console.log(error);
            res.status(501).send("error");
        }
        if(product_added) {
            // get product._id (product id) and add its images
            // console.log('product_added');
            let product_images = {};
            product_images['product_id'] = product_added._id;
            product_images['images'] = req.body.additionalImages;
            ProductImagesModel.addProductImages(product_images, (e, r) => {
                if(e) {
                    // console.log(e);
                    res.status(501).send("error");
                }
                if(r) {
                    // console.log('images added');
                    res.status(200).send("product and its images added");
                }
            })
        }
    })
})

router.post('/update_product', sellerCookieValidator, (req, res) => {
    ProductModel.updateProduct(req, (error, result) => {
        if(error) {
            // console.log(error);
            res.status(501).send("error");
        }
        if(result) {
            if(req.body.imagesChanged !== undefined && req.body.imagesChanged === false) {
                res.status(200).send("ok");
                return;
            }
            let product_images = {};
            product_images['product_id'] = req.body.product_id;
            product_images['images'] = req.body.additionalImages;
            ProductImagesModel.updateProductImages(product_images, (e, r) => {
                // console.log('inside product images callback');
                if(!e && !r) {
                    console.log("??");
                }
                if(e) {
                    // console.log(e);
                    res.status(501).send("error");
                }
                if(r) {
                    // console.log('images updated');
                    res.status(200).send("ok");
                }
            })
        }
    })
})


router.post('/update_profile', sellerCookieValidator, (req, res) => {
    SellerModel.updateProfile(req, (error, result) => {
        if(error) {
            // console.log(error);
            res.status(501).send("error");
        }
        if(result) {
            // console.log('profile udpated')
           res.status(200).send("profile updated");
        }
    })
})


router.get('/orders', sellerCookieValidator, (req, res) => {
    // console.log(query, typeof(query.seller_id));
    OrderModel.getSellerOrders(req, (error, response) => {
        if(error) {
            // console.log(error);
            res.status(501).send("error");
        }
        if(response) {
            // console.log(response);
            res.status(200).send({orders: response});
        }
    })
})


router.get('/products', sellerCookieValidator, (req, res) => {
    // console.log(query, typeof(query.seller_id));
    ProductModel.getSellerProducts(req, (error, response) => {
        if(error) {
            // console.log(error);
            res.status(501).send("error");
        }
        if(response) {
            // console.log(response);
            res.status(200).send({products: response});
        }
    })
})


// debug routes
router.get('/deleteAll', (req, res) => {
    ProductModel.deleteMany({}, (error, response) => {
        if(error) {
            // console.log(error);
            res.status(501).send("error");
        }
        if(response) {
            // console.log(response);
            res.status(200).send({products: response});
        }
    })  
})

module.exports = router


