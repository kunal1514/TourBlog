const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    name: {
        type: String
    },
    creator: {
        type: String
    },
    tags: [String],
    imageFile: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likeCount: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

module.exports = mongoose.model("Tour", tourSchema);