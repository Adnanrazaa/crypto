const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get('https://cryptobubbles.net/backend/data/bubbles1000.usd.json');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});