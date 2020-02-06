const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    img: {
        type: Array,
        required: true
    },
    price: {
        euro: {
            type: String,
            required: true
        },
        cents: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    deliveryType: {
        type: String,
        required: true
    },
    sellerInfo: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

module.exports = Item = mongoose.model('Item', ItemSchema)