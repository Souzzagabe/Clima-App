
// Interação

const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

//Exibição
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");

const api_key = "f446e9b6e2ad545ad68c8f62a5b7a20c";

citySearchButton.addEventListener("click", () => {
    let cityName = citySearchInput.value
    getCityWeather(cityName)
})
// https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=$(api_key)

navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        
        console.log(position)
        fetch(`fetch(https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
            .then((response) => response.json())
            .then((data) => displayWeather(data))
    },
    (err) => {
        if (err.code === 1) {
            alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade atraves da barra de pesquisa")
        }
        else {
            console.log(err)
        }
    }
)

function getCityWeather(cityName) {

    weatherIcon.src = `./assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data

    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;
    weatherIcon.src = `./assets/${icon}.svg`
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formatteddate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' })
    return `hoje, ${formatteddate}`
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`
}