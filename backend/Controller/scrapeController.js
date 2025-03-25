const axios = require("axios");
const { URL } = require("../Data/NewsData");
const NewsModel = require("../Models/NewModel");

const scrapeArticles = async (req, res) => {
    try {
        for (const category in URL) {
            for (const source of URL[category]) {
                if (!source.url) continue;

                console.log(`Fetching articles from: ${source.url}`);

                const response = await axios.post(
                    "https://api.zyte.com/v1/extract",
                    {
                        "url": source.url,
                        "articleList": true,
                        "articleListOptions": { "extractFrom": "httpResponseBody" }
                    },
                    { auth: { username: 'f028cca6484c4176a811b72d63af562b' } }
                );

                if (response.data.articleList?.articles) {
                    let i=0;
                    for (const article of response.data.articleList.articles) {
                        if (!article?.url) continue; // Ensure URL exists
                        if(i===30){
                            break;
                        }
                        await NewsModel.findOneAndUpdate(
                            { url: article.url },
                            {
                                $set: {
                                    url: article.url,
                                    headline: article.headline || "No Title", // Fix headline property
                                    mainImage: article.mainImage?.url || "" ,// Fix undefined mainImage issue
                                    source: source.source,
                                    topics: category,
                                }
                            },
                            { upsert: true, new: true, setDefaultsOnInsert: true }
                        );
                        i++;
                    }
                }
            }
        }
        console.log("News articles scraped and stored successfully.");
        res.status(200).json({ success: true, message: "News articles scraped and stored successfully." });
    } catch (error) {
        console.error("Error scraping articles:", error);
        res.status(500).json({ success: false, message: "Error scraping articles", error: error.message });
    }
};

module.exports = { scrapeArticles };
