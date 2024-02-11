document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '570c9c623df10fe36cd9da340e2aab66';
    const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const cityDegree = document.querySelector('.city-degree');
    const cityName = document.querySelector('.city-name');
    const cityTimeDate = document.querySelector('.city-time-date');
    const cityHumidity = document.querySelector('.city-humidity');
    const cityWind = document.querySelector('.city-wind');
    const weatherIcon = document.querySelector('#weather-sunny-icon');
    const recentSearchContainer = document.querySelector('.recent-search-container');

    function updateWeatherIcon(tempCelsius) {
        let iconSrc;
        if (tempCelsius < 10) {
            iconSrc = 'img/cloudy.png';
            
            } else {
                iconSrc = 'img/sunny.png';
            }
            weatherIcon.src = iconSrc;
        }

    function getWeatherData (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`) 
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                    tempCelsius = (data.main.temp - 273.15).toFixed(0);
                    cityName.textContent = data.name;
                    cityDegree.textContent = `${tempCelsius}°C`;
                    cityTimeDate.textContent = new Date(data.dt * 1000).toLocaleString();
                    cityHumidity.textContent = `Humidity: ${data.main.humidity}%`;
                    cityWind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

                    updateWeatherIcon(tempCelsius);
                    
            } else {
                alert("City not found. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch data from the API.");
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        getWeatherData (cityInput.value);
    });

    recentSearchContainer.addEventListener('click', function (e) {
        if (e.target && e.currentTarget) {
            const city = e.target.textContent;
            getWeatherData(city);
            cityInput.value = city;
            }
        });

    });