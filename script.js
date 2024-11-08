function getWeather() {
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert('Masukkan lokasi!');
        return;
    }

    const apiKey = 'c1c9dd2aedb1e15d13a763e54e7174ba';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('weatherDesc').textContent = data.weather[0].description;
                document.getElementById('temperature').textContent = `Suhu: ${data.main.temp}°C`;
                document.getElementById('humidity').textContent = `Kelembapan: ${data.main.humidity}%`;

                document.getElementById('weatherResult').style.display = 'block';

                const weatherCondition = data.weather[0].main.toLowerCase();

                changeBackground(weatherCondition, data.weather[0].description);
            } else {
                alert('Lokasi tidak ditemukan!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function changeBackground(mainCondition, description) {
    let backgroundImage = 'url(images/clear.jpg)'; // Default background

    if (mainCondition === 'clouds' || description.includes('cloud')) {
        backgroundImage = 'url(images/cloudy.jpeg)';
    }
    else if (mainCondition === 'rain' || description.includes('rain')) {
        backgroundImage = 'url(images/rainy.jpg)';
    }
    else if (mainCondition === 'snow' || description.includes('snow')) {
        backgroundImage = 'url(images/snowy.jpg)';
    }
    else if (mainCondition === 'thunderstorm' || description.includes('thunderstorm')) {
        backgroundImage = 'url(images/thunderstorm.jpeg)';
    }
    else if (mainCondition === 'fog' || description.includes('fog')) {
        backgroundImage = 'url(images/fog.jpg)';
    }
    else if (mainCondition === 'wind' || description.includes('wind')) {
        backgroundImage = 'url(images/windy.jpg)';
    }
    else if (mainCondition === 'drizzle' || description.includes('drizzle')) {
        backgroundImage = 'url(images/drizzle.webp)';
    }
    else if (mainCondition === 'dust' || description.includes('dust') || description.includes('ash')) {
        backgroundImage = 'url(images/dust.png)';
    }
    else if (mainCondition === 'clear') {
        backgroundImage = 'url(images/clear.jpg)';
    }

    document.body.style.backgroundImage = backgroundImage;
}