const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true 
    },
    avatar: {
        type: String,
        default: 'I am new here!'
    },
    user_type: {
        type: String,
        enum: ['C', 'A', 'V'], // Customer, Admin, Vendor
        default: 'C'
    },
    status: {
        type: String,
        enum: ['A', 'D'], // Active, Disabled
        default: 'A'
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    last_login: Number,
    created_at: {
        type: Number,
        default: Math.floor(Date.now() / 1000)
    },
    orders: [{
        type: Schema.Types.ObjectId,