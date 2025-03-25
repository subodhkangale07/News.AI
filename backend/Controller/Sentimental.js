const axios = require('axios');
const NewsModel = require('../Models/NewModel');

const updateSentimentForAllNews = async (req, res) => {
    try {
        const newsArticles = await NewsModel.find(); 

        for (let article of newsArticles) {
            if (article.articleBody) {
                console.log("i am running sentiment....");
                const sentimentResponse = await axios.post('http://localhost:5001/sentiment-analysis', { text: article.articleBody });
                
                article.sentiment = {
                    score: sentimentResponse.data.score,
                    sentiment: sentimentResponse.data.sentiment
                };
                await article.save();
            }
        }

        res.status(200).json({ message: "Sentiment updated for all articles" });
    } catch (error) {
        console.error("Error updating sentiment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { updateSentimentForAllNews };
