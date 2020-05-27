const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

const sellerReviewsSchema = new Schema({
    seller_id: {
        type: Schema.ObjectId,
        required: true
    },
    reviews: {
        type: [reviewSchema],
        required: true
    }
})

const sellerReviewsModel = mongoose.model('seller_review', sellerReviewsSchema);


module.exports = sellerReviewsSchema;