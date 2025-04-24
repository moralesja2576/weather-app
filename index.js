const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );

    const data = response.data;
    res.json({
      city: data.name,
      temperature: `${data.main.temp}°F`,
      description: data.weather[0].description,
      humidity: `${data.main.humidity}%`,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    });
  } catch (error) {
    res.status(404).json({ error: 'City not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
