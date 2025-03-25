const axios = require('axios');
const NewsModel = require('../Models/NewModel');

const detectFakeNews = async (req, res) => {
    try {
        const newsArticles = await NewsModel.find(); 
        console.log("Starting fake news detection...");

        for (let article of newsArticles) {
            if (article.articleBody) {
                console.log(`Detecting fake news for article: ${article.headline}`);

                // Corrected API request structure
                const response = await axios.post(
                    'http://localhost:5001/detect_fake_news', 
                    { text: article.articleBody }
                );

                // Ensure proper data extraction
                if (response.data && response.data.prediction) {
                    article.prediction = response.data.prediction;
                    await article.save();
                } else {
                    console.warn(`No prediction received for article: ${article.headline}`);
                }
            }
        }

        res.status(200).json({ message: "Fake news detection updated for all articles" });
    } catch (error) {
        console.error("Error updating fake news detection:", error.message || error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { detectFakeNews };
