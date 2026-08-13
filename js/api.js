const COUNTRIES_API =
    "https://countriesnow.space/api/v0.1/countries";

async function request(url) {
    const response = await fetch(url);

    console.log("API STATUS:", response.status);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    console.log("API DATA:", data);

    return data;
}

export async function getAllCountries() {
    const data = await request(COUNTRIES_API);

    return data.data || [];
}

export async function searchCountry(countryName) {
    const countries = await getAllCountries();

    const search = countryName.toLowerCase().trim();

    return countries.filter((country) =>
        country.country.toLowerCase().includes(search)
    );
}

export async function getCountry(countryName) {
    const countries = await searchCountry(countryName);

    return countries[0] || null;
}

export async function getWikipedia(countryName) {
    const url =
        `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(countryName)}&limit=1`;

    return request(url);
}