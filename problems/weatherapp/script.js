const apiKey = "c9136129152c94d3bc6e7efbda886098";
// const apiKey = "f726b595aff583f93c5325cd2ae7abfd";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const weatherInfo = document.getElementById("weatherInfo");
const error = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const cityName = cityInput.value.trim();

    if(cityName === ""){
        error.textContent = "Please enter a city name";
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try{

        error.textContent = "";

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        city.textContent =
        `${data.name}, ${data.sys.country}`;

        temp.textContent =
        `Temperature: ${data.main.temp} °C`;

        condition.textContent =
        ` Condition: ${data.weather[0].main}`;

        humidity.textContent =
        ` Humidity: ${data.main.humidity}%`;

        wind.textContent =
        ` Wind Speed: ${data.wind.speed} m/s`;

        weatherInfo.style.display = "block";

    }
    catch(err){

        weatherInfo.style.display = "none";

        error.textContent =
        "City not found or API error occurred";
    }
}