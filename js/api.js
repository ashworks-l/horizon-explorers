const BASE_URL = "https://restcountries.com/api/v1";

export async function getAllCountries() {
    const response = await fetch(`${BASE_URL}/all`);

    if (!response.ok) {
        throw new Error("Unable to load countries.");
    }

    return await response.json();
}

export async function searchCountry(country) {
    const response = await fetch(
        `${BASE_URL}/name/${encodeURIComponent(country)}`
    );

    if (!response.ok) {
        throw new Error("Country not found.");
    }

    return await response.json();
}

export async function getRegion(region) {
    const response = await fetch(
        `${BASE_URL}/region/${region}`
    );

    if (!response.ok) {
        throw new Error("Unable to load region.");
    }

    return await response.json();
}

export async function getCountry(country) {
    const data = await searchCountry(country);
    return data[0];
}

export function getFlag(country) {
    return country.flags?.svg || country.flags?.png || "";
}

export function getCapital(country) {
    return country.capital?.[0] || "Unknown";
}

export function getLanguages(country) {
    if (!country.languages) return "Unknown";
    return Object.values(country.languages).join(", ");
}

export function getCurrencies(country) {
    if (!country.currencies) return "Unknown";
    return Object.values(country.currencies)
        .map(c => c.name)
        .join(", ");
}

export function formatPopulation(population) {
    return new Intl.NumberFormat("en-US").format(population);
}