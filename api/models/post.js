const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: { type: String, required: true, maxLength: 20 },
    text: { type: String, required: true, maxLength: 100 },
    user: { type: String, ref: 'User', required: true },
    timeStamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema)