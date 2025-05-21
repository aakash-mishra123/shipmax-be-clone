const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_code: {
        type: String,
        required: true,
        unique: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    product_type: {
        type: String,
        enum: ['P', 'C', 'D'], // Physical, Configurable, Digital
        default: 'P'  
    },
    status: {
        type: String,
        enum: ['A', 'D', 'H'], // Active, Disabled, Hidden
        default: 'A'
    },
    list_price: {
        type: Number,
        required: true,
        default: 0
    },
    amount: {
        type: Number,
        default: 0  
    },
    weight: {
        type: Number,
        default: 0
    },
    length: Number,
    width: Number, 
    height: Number,
    shipping_params: {
        min_items: Number,
        max_items: Number,
        box_length: Number,
        box_width: Number,
        box_height: Number
    },
    localizations: [{
        lang_code: String,
        name: String,
        description: String,
        meta_keywords: String,
        meta_description: String,
        page_title: String,
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    created_at: {
        type: Number,
        default: Math.floor(Date.now() / 1000)
    },
    updated_at: {
        type: Number,
        default: Math.floor(Date.now() / 1000)
    }
});

productSchema.index({ product_code: 1, company_id: 1 });

module.exports = mongoose.model('Product', productSchema);
