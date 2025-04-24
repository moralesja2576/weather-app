async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = 'Loading...';
  
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();
  
      if (data.error) {
        resultDiv.innerHTML = `<p>${data.error}</p>`;
      } else {
        resultDiv.innerHTML = `
          <h2>${data.city}</h2>
          <img src="${data.icon}" alt="${data.description}" />
          <p>${data.description}</p>
          <p>Temperature: ${data.temperature}</p>
          <p>Humidity: ${data.humidity}</p>
        `;
      }
    } catch (err) {
      resultDiv.innerHTML = '<p>Error retrieving weather data.</p>';
    }
  }
  