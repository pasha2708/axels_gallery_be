const { Schema, model } = require('mongoose')

const schema = new Schema({
    url: { type: String, required: true },
    fullUrl: { type: String, required: true },
    id: { type: Number, default: false },
    comments: [{
        id: Number,
        date: Number,
        name: String,
        comment: String,
        text: String,
    }]
})

module.exports = model('image', schema)