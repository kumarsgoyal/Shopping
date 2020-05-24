const express=require('express');
const router = express.Router();
const ReviewModel = require('./../models/productReviewsModel')

router.get('/allReviews/:id',(req,res)=>{
    let id=req.params.id;

    ReviewModel.find({product_id:id},(error,response)=>{
        if(response){
            res.status(200).send({reviews:response});
        }
        if(error){
            res.status(501).send("error");
        }
    })
})

module.exports = router
