const BASE_URL = "https://api.restcountries.com/countries/v5";

const API_KEY = "rc_live_36bd0a5c37794229ad7972ef88a7e751";

async function request(url) {

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json"
        }
    });

    console.log("STATUS:", response.status);

    const text = await response.text();

    console.log("BODY:", text);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    return JSON.parse(text);
}

export async function getAllCountries() {

    const data = await request(`${BASE_URL}?pretty=1`);

    return data.data;
}

export async function searchCountry(country) {

    const data = await request(
        `${BASE_URL}?q=${encodeURIComponent(country)}&pretty=1`
    );

    return data.data;
}

export async function getCountry(country) {

    const countries = await searchCountry(country);

    return countries[0];
}

export async function getRegion(region) {

    const countries = await getAllCountries();

    return countries.filter(c => c.region === region);
}

export function getFlag(country) {
    return country.flags?.svg || "";
}

export function getCapital(country) {
    return country.capital?.[0] || "Unknown";
}

export function getLanguages(country) {
    return country.languages
        ? Object.values(country.languages).join(", ")
        : "Unknown";
}

export function getCurrencies(country) {
    return country.currencies
        ? Object.values(country.currencies)
              .map(c => c.name)
              .join(", ")
        : "Unknown";
}

export function formatPopulation(population) {
    return new Intl.NumberFormat("en-US").format(population);
}