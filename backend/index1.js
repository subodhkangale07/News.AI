const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const newsRoutes = require('./Routes/newsRoutes')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(newsRoutes);

// API Endpoint for summarization
app.post("/process-news", async (req, res) => {
    const { newsText } = req.body;

    if (!newsText) {
        return res.status(400).json({ error: "No text provided" });
    }

    try {
        const response = await axios.post("http://localhost:5001/summarize", { text: newsText });

        
        res.json({ summary: response.data.summary });

    } catch (error) {
        res.status(500).json({ error: "Summarization failed" });
    }
});

app.post("/sentimental-analysis",async(req,res)=>{
    try{
        const { newsText } = req.body;

    if (!newsText) {
        return res.status(400).json({ error: "No text provided" });
    }

    try {
        
        const response = await axios.post("http://localhost:5001/sentiment-analysis", { text: newsText });
        res.json({"sentimental-analysis": response.data });

    } 
    catch (error) {
        res.status(500).json({ error: "Srntimental-analysis failed" });
    }
    }
    catch(e){
        console.log(error);
    }
})


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
