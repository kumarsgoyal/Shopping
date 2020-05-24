const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productReviewsSchema = new Schema({
    product_id: {
        type: Schema.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    customer_id: {
        type: Schema.ObjectId,
        required: true
    },
    customer_name:{
        type:String,
        required:true
    }
})


// productReviewsSchema.index({product_id: 1, customer_id: 1}, {unique: true});


const productReviewsModel = mongoose.model('product_review', productReviewsSchema);

productReviewsModel.addReview = (req, callback) => {
    let review = {};
    review.message = req.body.review;
    review.rating = req.body.rating;
    review.customer_id = req.session.user_id;
    review.product_id = req.body.product_id;
    review.customer_name=req.body.customer_name;
    productReviewsModel.create(review, callback);
}

module.exports = productReviewsModel;
