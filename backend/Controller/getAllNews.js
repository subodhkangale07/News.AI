const NewsModel = require("../Models/NewModel");

const getAllNews = async (req, res) => {
    try {
        const news = await NewsModel.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllNews };