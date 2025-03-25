const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./Config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const axios = require('axios');  // Importing axios

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/news', require('./Routes/newsRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to the Eco-Mart API Home Page!');
});

const CHATBASE_API_KEY = "wttj7gp1eon2d51yc4zd0e07dvzn7ycf";

async function chatWithBot(userMessage) {
  try {
      const response = await axios.post(
          "https://www.chatbase.co/api/v1/chat",
          {
              messages: [{ role: "user", content: userMessage }],
              chatbotId: "Empty text",
              apiKey: CHATBASE_API_KEY
          }
      );
      return response.data;
  } catch (error) {
      console.error("Error chatting with Chatbase:", error);
      return null;
  }
}

const PORT = process.env.PORT || 8000;
dbConnect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('Database connection failed:', error));

app.post('/process-news', async (req, res) => {
  const { newsText } = req.body;
  console.log(newsText)
  if (!newsText) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const response = await axios.post('http://localhost:5001/summarize', { text: newsText });
    res.json({ summary: response.data.summary });
  } catch (error) {
    console.error('Summarization failed:', error);
    res.status(500).json({ error: 'Summarization failed' });
  }
}); 


app.post('/detect-fake-news', async (req, res) => {
  const { newsText } = req.body;
  console.log(newsText)
  if (!newsText) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const response = await axios.post('http://localhost:5001/detect_fake_news', { text: newsText });

    console.log(response);
    res.json(response.data );
  } catch (error) {
    console.error('Detection  failed:', error);
    res.status(500).json({ error: 'Detection Failed failed' });
  }
});

app.post('/sentimental-analysis', async (req, res) => {
  const { newsText } = req.body;

  if (!newsText) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const response = await axios.post('http://localhost:5001/sentiment-analysis', { text: newsText });
    res.json(response.data);
  } catch (error) {
    console.error('Sentimental analysis failed:', error);
    res.status(500).json({ error: 'Sentimental analysis failed' });
  }
});
