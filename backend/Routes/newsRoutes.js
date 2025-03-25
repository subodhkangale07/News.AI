const express = require('express');
const { scrapeArticles } = require('../Controller/scrapeController');
const { scrapeAllData } = require('../Controller/scrapeAllDataController');
const { getAllNews } = require('../Controller/getAllNews');
const { authToken } = require('../Middleware/authMiddleware');
const { updateSentimentForAllNews } = require('../Controller/Sentimental');
const { detectFakeNews } = require('../Controller/fakeNews');

const router = express.Router();

// Define routes
router.get('/scrapeNews',authToken, scrapeArticles);
router.get('/setAllData',authToken, scrapeAllData);
router.get("/getAllNews",getAllNews);
router.get("/sentiment",updateSentimentForAllNews);
router.get("/newsDetection",detectFakeNews)
// router.post('/scrape', scrapeController.createScrapeJob);
// router.put('/scrape/:id', scrapeController.updateScrapeJob);
// router.delete('/scrape/:id', scrapeController.deleteScrapeJob);

module.exports = router;