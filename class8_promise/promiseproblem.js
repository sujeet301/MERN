function getWeather(city) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (city === "Delhi") {
                resolve({
                    temp: 35,
                    weather: "sunny"
                });
            } else {
                reject("City not found");
            }

        }, 1500);

    });
}

getWeather("Delhi")
    .then((data) => {
        console.log(`${data.temp}°C, ${data.weather}`);
    })
    .catch((error) => {
        console.log("Error:", error);
    })
    .finally(() => {
        console.log("Weather fetch complete");
    });