const { STATES } = require("../Data/NewsData");
const axios = require("axios");
const axiosRetry = require("axios-retry").default;
const NewsModel = require("../Models/NewModel");

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const scrapeAllData = async (req, res) => {
    const user = req.user;
    if (user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
        });
    }
    try {
        const allScrapedData = await NewsModel.find({});
        const toScrape = allScrapedData.filter(data => !data.articleBody || data.articleBody.length === 0);
        const CHUNK_SIZE = 5;
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < toScrape.length; i += CHUNK_SIZE) {
            const chunk = toScrape.slice(i, i + CHUNK_SIZE);
            console.log(i);
            const promises = chunk.map(async (data) => {
                try {
                    const response = await axios.post(
                        "https://api.zyte.com/v1/extract",
                        { "url": data.url, "article": true },
                        { auth: { username: 'f028cca6484c4176a811b72d63af562b' } }
                    );

                    if (!response.data || !response.data.article) return;

                    const article = response.data.article;
                    const articleData = {
                        headline: article.headline || "No Title",
                        articleBody: article.articleBody || "No Content",
                        datePublished: article.datePublished || new Date().toISOString(),
                        authors: article.authors?.map(author => ({
                            name: author.name || "Unknown",
                            nameRaw: author.nameRaw || "Unknown"
                        })) || [],
                        mainImage: article.mainImage?.url || "",
                        images: article.images?.map(img => img.url) || [],
                        summarization: "",
                        regions: "",
                        description: article.description || "",
                    };

                    let statesFound = [];
                    STATES.forEach(state => {
                        if (articleData.articleBody.toLowerCase().includes(state.toLowerCase())) {
                            statesFound.push(state);
                        }
                    });

                    const sentiment = {
                        score: 0,
                        sentiment: "neutral"
                    };

                    await NewsModel.findOneAndUpdate(
                        { url: data.url },
                        {
                            $set: {
                                headline: articleData.headline,
                                articleBody: articleData.articleBody,
                                datePublished: articleData.datePublished,
                                authors: articleData.authors,
                                mainImage: articleData.mainImage,
                                images: articleData.images,
                                url: data.url,
                                source: data.source || "unknown",
                                regions: statesFound,
                                topics: data.topics || "general",
                                sentiment: sentiment,
                                summarization: articleData.summarization,
                                description: articleData.description,
                            }
                        },
                        { upsert: true, new: true, setDefaultsOnInsert: true }
                    );
                } catch (err) {
                    console.error(`Skipping failed scrape for ${data.url}`);
                }
            });

            await Promise.allSettled(promises);
            await delay(2000);
        }

        res.status(200).json({count:allScrapedData?.length,success: true, message: "News articles scraped and stored successfully." });
    } catch (err) {
        console.error("Error during scraping and saving data:", err);
        res.status(500).send("Error during scraping and saving data.");
    }
};

module.exports = { scrapeAllData };