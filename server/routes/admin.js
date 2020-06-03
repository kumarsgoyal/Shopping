const express = require('express');
const router = express.Router();
const SellerModel =require('../models/sellermodel');
const ClientModel=require('../models/clientmodel');
const ProductModel=require('../models/productModel')
const AdminModel=require('../models/adminModel')
const ProductImagesModel=require('../models/productImagesModel')
const ProductReviewModel=require('../models/productReviewsModel')
const mongoose=require('mongoose')
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
var hash;


const adminCookieValidator = (req, res, next) => {
    console.log('cookie validator called');
    // console.log(req.session.user_id, req.session.account_type);
    if(req.session.user_id && req.session.account_type === 'admin'){
        AdminModel.findOne({_id: mongoose.Types.ObjectId(req.session.user_id)}, (error, result)=>{
            // console.log('result', result);
            if(error){
                // console.log(error);
                res.status(501).send({error: true,message: 'server eroor'})
            }
            if(result)
            {
                // console.log('Admin vallidated');
                next();
            }
            else{
                // console.log('no ADmin found');
                res.status(401).send({error: false, message: 'not authenticated', loginRequired: true})
            }
        })
    }
    else{
        res.status(401).send({error: false, message: 'not authenticated', loginRequired: true})
    }
}



router.get('/',(req,res)=>{
    // console.log('req comes at /')
    res.send('hello')
})
router.get('/getAllSellers',adminCookieValidator,(req,res)=>{
    // console.log('req comes at /getsellers')
    SellerModel.find({},(err,response)=>{
        if(response){
            res.status(200).send({response});
        }
        if(err){
            res.status(501).send('error');
        }
    })
})
router.get('/getAllCustomers',adminCookieValidator,(req,res)=>{
    ClientModel.find({},(err,response)=>{
        if(response){
            res.status(200).send({response});
        }
        if(err){
            res.status(501).send('error');
        }
    })
})
router.get('/getAllProducts/:id',adminCookieValidator,(req,res)=>{
    ProductModel.find({seller_id:req.params.id},(err,response)=>{
        if(response){
            res.status(200).send({response});
        }
        if(err){
            res.status(501).send('error');
        }
    })
})


router.post('/login', function(req, res) {

    AdminModel.findOne({email: req.body.email}, function(err, admin) {
        if(admin) {
            if(bcrypt.compareSync(req.body.password, admin.password)) {
                // console.log(admin._id);
                req.session.account_type = 'admin';
                req.session.user_id = admin._id;
                res.status(200).send({user: user.first_name + " " + user.last_name, account_type: 'admin'});
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

router.delete('/deleteProduct/:id',adminCookieValidator,(req,res,next)=>{
    ProductModel.deleteOne({_id:req.params.id},(err,response)=>{
        if(response){
            next();
        }
    })
},(req,res,next)=>{
    ProductImagesModel.deleteOne({product_id:req.params.id},(err,response)=>{
        if(response){
            // console.log('product images deleted')
            next();
        }
    })
},(req,res)=>{
    ProductReviewModel.deleteMany({product_id:req.params.id},(error,response)=>{
        if(response){
            res.status(200).send('product deleted');
        }
    })
})

module.exports=router