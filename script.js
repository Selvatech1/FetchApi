document.addEventListener('DOMContentLoaded', function() {
    const countries = ['Afghanistan', 'Albania', 'Aland Islands', 'Falkland Islands']; // Example countries

    const countryCardsContainer = document.getElementById('countryCards');

    countries.forEach(country => {
        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(response => response.json())
            .then(data => {
                const countryData = data[0]; // Assuming the first result is the correct country data

                const card = document.createElement('div');
                card.classList.add('col-lg-4', 'col-sm-12', 'mb-4');

                card.innerHTML = `
                    <div class="card">
                        <div class="card-header">${country}</div>
                        <div class="card-body">
                            <p><strong>Capital:</strong> ${countryData.capital}</p>
                            <p><strong>Region:</strong> ${countryData.region}</p>
                            <p><strong>Country Codes:</strong> ${countryData.cca3}</p>
                            <img src="${countryData.flags.png}" class="img-fluid mb-3" alt="Flag">
                            <button class="btn btn-primary btn-block" onclick="fetchWeather('${countryData.capital}', '${country}')">Click for Weather</button>
                            <div id="${country}-weather"></div>
                        </div>
                    </div>
                `;

                countryCardsContainer.appendChild(card);
            })
            .catch(error => console.log('Error fetching country data:', error));
    });
});

function fetchWeather(city, country) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById(`${country}-weather`);
            weatherDiv.innerHTML = `
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
}
