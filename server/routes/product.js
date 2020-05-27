const express = require('express');
const router = express.Router();
const ProductModel = require('../models/productModel') 
const ProductImagesModel = require('../models/productImagesModel')
const mongoose = require('mongoose');

router.get('/search', (req, res) => {
    // req.query = {search: 'string', ...filters}
    ProductModel.search(req, function(error, response) {
        if(response) {
                res.status(200).send({products: response});
        }
        if(error) {
            res.status(501).send("error");
        }
    })
})

router.get('/images', (req, res) => {
    ProductImagesModel.getProductImages(req, function(error, response) {
        if(response) {
            res.status(200).send({images: response.images});
        }
        if(error) {
            res.status(501).send("error");
        }
    })
})

router.get('/details', (req, res) => {
    // console.log(req);
    ProductModel.findOne({_id:  req.query.product_id}, (error, response) => {
        if(response) {
            res.status(200).send({product: response});
        }
        if(error) {
            res.status(501).send("error");
        }
    })
})


// debug routes
router.get('/allProducts', (req, res) => {
    ProductModel.getAllProducts(req, (error, response) => {
        if(response) {
            res.status(200).send({products: response})
        }
        if(error) {
            res.status(501).send("error");
        }
    })
})


//puneet added
router.get('/getProductNames', function (req, res) {
    productModel.getAllNames({_id: mongoose.Types.ObjectId(req.body._id)}, function (err, response) {
        if (response) {
            res.status(200).send(response);
        }
        else {
            res.status(401).send("Oh uh, something went wrong");
        }
    })
})


module.exports = router


