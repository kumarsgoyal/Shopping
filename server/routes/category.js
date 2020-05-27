const express = require('express');
const router = express.Router();
const CategoryModel = require('./../models/categoryModel')


router.get('/getAllCategories', function (req, res) {
    CategoryModel.getAllCategories({}, function (err, response) {
        if (response) {
            res.status(200).send({categories: response});
        }
        else {
            res.status(401).send("Oh uh, something went wrong");
        }
    })
})

module.exports = router