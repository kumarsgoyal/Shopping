const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ProductReviewsModel = require('./productReviewsModel.js');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category_id: {
        type: Schema.ObjectId,
        required: true
    },
    stock: {
        type: Number
        // required: true
    },
    unit_sold: {
        type: Number,
        default: 0
    },
    seller_id: {
        type: Schema.ObjectId,
        required: true
    },
    avg_rating: {
        type: Number,
        default: 0.0
    },
    number_of_reviews: {
        type: Number,
        default: 0.0
    },
    main_photo: {
        type: {
            data: Buffer,
            contentType: String
        },
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: [{type: String}],
        required: true
    },
    // options like [{name: 'color', options: [red, blue, black]} ]
    options: {
        type: [{type: Object}]
    },
    // photos: {
    //     images: [{ data: Buffer, contentType: String }],
    //     required: true
    // },
    // form input
    estimated_days_to_deliver_by_seller: {
        type: Number,
        required: true
    }
})

const productModel = mongoose.model('product', productSchema);
productModel.addProduct = (req, callback) => {
    let body = req.body;
    let product = {name: body.name, category_id: body.category_id,price: body.price, main_photo: body.main_photo, description: body.description, features: body.features, options: body.options, estimated_days_to_deliver_by_seller: body.estimated_days_to_deliver_by_seller};
    product.seller_id = req.session.user_id;
    // console.log('product', product);
    productModel.create(product, callback); 
}

productModel.updateProduct = (req, callback) => {
    let body = req.body;
    let product = {name: body.name, category_id: body.category_id,price: body.price, main_photo: body.main_photo, description: body.description, features: body.features, options: body.options, estimated_days_to_deliver_by_seller: body.estimated_days_to_deliver_by_seller};
    product.seller_id = req.session.user_id;
    // console.log('product', product);
    productModel.findOneAndUpdate({_id: req.body.product_id}, product, callback); 

}

productModel.getSellerProducts = (req, callback) => {
    let query = {}
    query['seller_id'] = req.session.user_id;
    productModel.find(query, callback)
}

productModel.search = (req, callback) => {
    let query = {}
    query.name = { "$regex": req.query.search, "$options": "i" }
    productModel.find(query, callback);
}

productModel.getAllProducts = (req, callback) => {
    productModel.find({}, callback);
}

//puneet added
productModel.getAllNames=(product,callback)=>{
    productModel.find({},{name:1,price:1,main_photo:1},callback)
}

productModel.increaseProductUnitSold = (req, callback) => {
    console.log(req.body.product._id);
    productModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.product._id)}, {$inc: {unit_sold: req.body.units}}, callback);
}


productModel.updateReviews = (req, callback) => {
    ProductReviewsModel.aggregate([
        {$match: {product_id: mongoose.Types.ObjectId(req.body.product_id)}},
        {$group: {_id: "$product_id", average_rating: {$avg: "$rating"}, number_of_reviews: {$sum: 1} } }
    ], (err, res) => {
        if(err) {
            console.log(err);
            res.status(501).send("error");
        }
        if(res) {
            console.log('inside update rating of product', res);
            // if(res.length > 0) {
            productModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.product_id)}, {$set: {avg_rating: res[0]['average_rating']}, number_of_reviews: res[0]['number_of_reviews']}, callback)
            // }
        }
    })
}

productModel.getProductsFromIds = (product_ids, callback) => {

    let product_ObjectIds = product_ids.map((id) => {
        return mongoose.Types.ObjectId(id);
    })

    console.log(product_ids, product_ObjectIds);
    productModel.find({
            '_id': {
                $in: product_ObjectIds 
            }
        }, callback);
}


module.exports = productModel;
    
