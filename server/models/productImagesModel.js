const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productImageSchema = new Schema({
    product_id: {
    	type: Schema.ObjectId,
    	required: true
    },
    images: {
    	type: [],
    	required: true
    }
})

const productImageModel = mongoose.model('productImage', productImageSchema);

productImageModel.addProductImages = (product_images, callback) => {
    // accept {product_id, images: []}
    // console.log('images', product_images);
    productImageModel.create(product_images, callback);
}

productImageModel.updateProductImages = (product_images, callback) => {
    // accept {product_id, images: []}
    // console.log('updateProductImages called');
    // console.log('images', product_images);
    productImageModel.findOneAndUpdate({product_id: product_images.product_id}, product_images, callback);
}


productImageModel.getProductImages = (req, callback) => {
    let query = {};
    query.product_id = req.query.product_id;
    // console.log(`image query`, req.query, query);
    productImageModel.findOne(query, callback);
}

module.exports = productImageModel;