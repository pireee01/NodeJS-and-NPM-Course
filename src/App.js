import React, { useState } from 'react';

function App() {
    const [name, setName] = useState('');
    const [countries, setCountries] = useState([]);

    const getCountryName = async (countryCode) => {
        const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
        const response = await fetch(url);
        const data = await response.json();
        return data[0].name.common; // Ambil nama umum dari negara
    };

    const handlePredictClick = async () => {
        const response = await fetch(`https://api.nationalize.io/?name=${name}`);
        const data = await response.json();
        const countriesWithNames = await Promise.all(
            data.country.map(async (country) => ({
                ...country,
                name: await getCountryName(country.country_id)
            }))
        );
        setCountries(countriesWithNames);
    };

    return (
        <div>
            <h1>Predict Nationality</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name"
            />
            <button onClick={handlePredictClick}>Predict</button>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        Negara {index + 1}: {country.name} dengan probabilitas {country.probability.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
