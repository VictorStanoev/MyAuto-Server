const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const adSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        requied: true
    },
    currency:{
        type: String,
        requied: true
    },
    moreInfo:{
        type:String
    },
    pictures: [{
        type: String
    }],
    manifactureDate: {
        type: Date,
        required: true
    },
    engineType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },    
    category: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    subscribers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Ad', adSchema);
