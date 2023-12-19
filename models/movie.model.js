const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    rating: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    releaseYear: {
        type: Number
    },
})

module.exports = mongoose.model("Movies", MovieSchema);