import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  url: { type: String, required: true },
  fullUrl: { type: String, required: true },
  id: { type: Number, default: false },
  comments: [{
    id: Number,
    date: Number,
    author: String,
    text: String,
  }]
})

export default mongoose.model('image', schema)