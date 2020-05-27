const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customer_id: {
        type: Schema.ObjectId,
        required: true
    },
    products: {
        type: [{
            type: Schema.ObjectId
        }],
        required: true
    }
})

const cartModel = mongoose.model('cart', cartSchema);

cartModel.getCart = (req, callback) => {
    cartModel.findOne({customer_id: mongoose.Types.ObjectId(req.session.user_id)}, callback);
}

cartModel.addProduct = (req, callback) => {
    cartModel.find({customer_id: req.session.user_id}, (err, result) => {
        if(result && result.length === 0) {
            // console.log('created array');
            cartModel.create({customer_id: mongoose.Types.ObjectId(req.session.user_id), products: [mongoose.Types.ObjectId(req.body.product_id)]}, callback)
        }
        else if(result && result.length > 0) {
            // console.log('added in array');
            cartModel.findOneAndUpdate({customer_id: mongoose.Types.ObjectId(req.session.user_id)}, {"$addToSet": {products: mongoose.Types.ObjectId(req.body.product_id)}}, callback)
        }

        if(err) {
            // console.log(err);
        }
    })
}

cartModel.removeProduct = (req, callback) => {
    cartModel.findOneAndUpdate({customer_id: mongoose.Types.ObjectId(req.session.user_id)}, {"$pull": {products: mongoose.Types.ObjectId(req.body.product_id)}}, callback);
}

cartModel.isInCart = (req, callback) => {
    cartModel.find({customer_id: mongoose.Types.ObjectId(req.session.user_id), products: {"$all": [mongoose.Types.ObjectId(req.query.product_id)]}}, callback);
}

module.exports = cartModel;