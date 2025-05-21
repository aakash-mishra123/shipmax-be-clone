const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_id: {
        type: Number,
        required: true,
        unique: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    subtotal: {
        type: Number,
        required: true,
        default: 0  
    },
    shipping_cost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['O','P','C','D'], // Open, Processed, Completed, Declined
        default: 'O'
    },
    items: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        amount: Number,
        price: Number
    }],
    shipping_address: {
        firstname: String,
        lastname: String,
        address: String,
        city: String,
        state: String,
        country: String,
        zipcode: String,
        phone: String
    },
    created_at: {
        type: Number,
        default: Math.floor(Date.now() / 1000)  
    }
});

module.exports = mongoose.model('Order', orderSchema);
