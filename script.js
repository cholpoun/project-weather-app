const apiKey = 'f9f6a2848b9884ac0094319bc7eaad1f'; // Replace with your OpenWeatherMap API key
const city = 'Stockholm';

async function fetchWeather() {
    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
        );

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`
        );

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const temperatureElement = document.getElementById('temperature');
    const cityElement = document.getElementById('city');
    const descriptionElement = document.getElementById('description');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');
    const localTimeElement = document.getElementById('local-time');
    const weatherIconElement = document.getElementById('weather-icon');

    const temperature = data.main.temp.toFixed(1); // Temperature rounded to 1 decimal place
    const cityName = data.name;
    const description = data.weather[0].description;
    const sunrise = formatTime(data.sys.sunrise);
    const sunset = formatTime(data.sys.sunset);
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Calculate local time
    const timezoneOffset = data.timezone; // Timezone offset in seconds
    const utcTime = new Date(); // Current UTC time
    const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

    // Format local time as HH:mm
    const localTimeFormatted = localTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    // Update DOM elements
    temperatureElement.textContent = `${temperature}°C`;
    cityElement.textContent = cityName;
    descriptionElement.textContent = description;
    sunriseElement.textContent = `Sunrise: ${sunrise}`;
    sunsetElement.textContent = `Sunset: ${sunset}`;
    localTimeElement.textContent = `Local Time: ${localTimeFormatted}`;

    // Add or update the weather icon
    weatherIconElement.src = iconUrl;
    weatherIconElement.alt = description;
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    forecastElement.innerHTML = ''; // Clear previous forecast items
    dailyForecasts.slice(0, 5).forEach(forecast => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';

        const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const tempMin = forecast.main.temp_min.toFixed(1);
        const tempMax = forecast.main.temp_max.toFixed(1);

        forecastItem.innerHTML = `
            <div class="day">${day}</div>
            <img src="${iconUrl}" alt="Weather icon" class="icon" />
            <div class="temp-range">${tempMin}° / ${tempMax}°</div>
        `;

        forecastElement.appendChild(forecastItem);
    });
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

fetchWeather();
