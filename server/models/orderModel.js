const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    seller_id: {
        type: Schema.ObjectId,
        required: true
    },
    customer_id: {
        type: Schema.ObjectId,
        required: true
    },
    product_id: {
        type: Schema.ObjectId,
        required: true
    },
    delivery_address: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    expected_delivery_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        default: 1
    },
    total_amount: {
        type: Number,
        required: true
    }
})

const orderModel = mongoose.model('order', orderSchema);

orderModel.getSellerOrders = (req, callback) => {
    orderModel.find({seller_id: req.session.user_id}, callback)
}

orderModel.getPendingOrders = (req, callback) => {
    orderModel.find({customer_id: req.session.user_id,status:"delivery_pending"}, callback)
}

orderModel.getDeliveredOrders = (req, callback) => {
    orderModel.find({customer_id: req.session.user_id,status:"delivered"}, callback)
}

orderModel.addOrder = (req, callback) => {
    let product = req.body.product;
    let cust_id = req.session.user_id;
    let order_date = new Date();
    //  console.log(order_date, order_date.toLocaleDateString());
    let expected_delivery_date = new Date()
    expected_delivery_date.setDate(order_date.getDate() + product.estimated_days_to_deliver_by_seller);
    // console.log(expected_delivery_date.toLocaleDateString());
    let totalAmount = req.body.units * product.price;
    let order = {total_amount:totalAmount, units: req.body.units, customer_id:cust_id, product_id: product._id, seller_id: product.seller_id,delivery_address: req.body.delivery_address, order_date: order_date.toString(), expected_delivery_date: expected_delivery_date.toString(), status: 'delivery_pending'}
    // console.log(order);
    orderModel.create(order, callback);
}

orderModel.updateStatusToDelivered=(req, callback) => {
    let review = {};
    orderModel.update({_id:req.body.order_id}, {$set: {
        status: "delivered"
    }}, callback)
}

orderModel.updateStatusToCancelled=(req, callback) => {
    let review = {};
    orderModel.update({_id:req.body.order_id}, {$set: {
        status: "cancelled"
    }}, callback)
}

module.exports = orderModel; 
