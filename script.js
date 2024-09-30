const API_KEY = 'f9f6a2848b9884ac0094319bc7eaad1f';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const URL = `${API_URL}?q=Dubai,%20AE&units=metric&APPID=${API_KEY}`

const locationElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const timeElement = document.getElementById('time');
const feelsLikeElement = document.getElementById('feelsLike');




fetch('https://api.openweathermap.org/data/2.5/weather?q=Dubai,%20AE&units=metric&APPID=f9f6a2848b9884ac0094319bc7eaad1f')
    .then(response => response.json())
    .then(data) => {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
}



