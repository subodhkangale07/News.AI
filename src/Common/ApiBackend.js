// ✅ Cleaned version of src/Common/ApiBackend.js

const backendDomain = "https://news-ai-nuxb.onrender.com";

const summaryApi = {
    logIn: {
        url: `${backendDomain}/api/v1/auth/google_auth`,
        method: "post"
    },
    getAllNews: {
        url: `${backendDomain}/api/v1/news/getAllNews`,
        method: "get"
    },
    summarisedNews: {
        url: `${backendDomain}/process-news`,
        method: "post"
    },
    sentimentalAnalysis: {
        url: `${backendDomain}/sentimental-analysis`,
        method: "post"
    },
    scrapeNews: {
        url: `${backendDomain}/api/v1/news/scrapeNews`,
        method: "get"
    },
    setAllData: {
        url: `${backendDomain}/api/v1/news/setAllData`,
        method: "get"
    },
    fake_news: {
        url: `${backendDomain}/detect-fake-news`,
        method: "post"
    },
    newsDetection: {
        url: `${backendDomain}/api/v1/news/newsDetection`,
        method: "get"
    },
    sentiment: {
        url: `${backendDomain}/api/v1/news/sentiment`,
        method: "get"
    }
};

export default summaryApi;
