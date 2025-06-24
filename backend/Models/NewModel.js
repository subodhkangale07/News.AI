const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    headline: { type: String, required: true },
    articleBody: { type: String, required: true },
    datePublished: { type: String, required: true },
    prediction:{type:String},
    authors: [{
        name: { type: String },
        nameRaw: { type: String },
    }],
    mainImage: { type: String },
    images: { type: [String], default: [] },
    url: { type: String, required: true, unique: true },
    source: { type: String },
    regions: { type: [String], default: [] },
    topics: { type: String },
    sentiment: {
        score: { type: Number, required: true },
        sentiment: { type: String, required: true },
    },
    summarization: { type: String },
    description: { type: String },
}, { timestamps: true });

const NewsModel = mongoose.model('News', NewsSchema);

module.exports = NewsModel;
