const BASE_URL = "https://restcountries.com/v3.1";

/* ===========================
   SEARCH COUNTRY
=========================== */

export async function searchCountry(country) {
    const response = await fetch(
        `${BASE_URL}/name/${encodeURIComponent(country)}?fields=name,capital,region,population,flags,languages,currencies`
    );

    if (!response.ok) {
        throw new Error("Country not found.");
    }

    return await response.json();
}

/* ===========================
   ALL COUNTRIES
=========================== */

export async function getAllCountries() {
    const response = await fetch(
        `${BASE_URL}/all?fields=name,capital,region,population,flags,languages,currencies`
    );

    if (!response.ok) {
        throw new Error("Unable to load countries.");
    }

    return await response.json();
}

/* ===========================
   REGION
=========================== */

export async function getRegion(region) {
    const response = await fetch(
        `${BASE_URL}/region/${region}?fields=name,capital,region,population,flags,languages,currencies`
    );

    if (!response.ok) {
        throw new Error("Unable to load region.");
    }

    return await response.json();
}

/* ===========================
   GET ONE COUNTRY
=========================== */

export async function getCountry(country) {
    const response = await fetch(
        `${BASE_URL}/name/${encodeURIComponent(country)}?fullText=true&fields=name,capital,region,population,flags,languages,currencies,maps`
    );

    if (!response.ok) {
        throw new Error("Country not found.");
    }

    const data = await response.json();

    return data[0];
}

/* ===========================
   FLAG
=========================== */

export function getFlag(country) {
    return country.flags?.svg ||
           country.flags?.png ||
           "";
}

/* ===========================
   CAPITAL
=========================== */

export function getCapital(country) {
    return country.capital?.[0] || "Unknown";
}

/* ===========================
   LANGUAGES
=========================== */

export function getLanguages(country) {
    if (!country.languages) {
        return "Unknown";
    }

    return Object.values(country.languages).join(", ");
}

/* ===========================
   CURRENCIES
=========================== */

export function getCurrencies(country) {
    if (!country.currencies) {
        return "Unknown";
    }

    return Object.values(country.currencies)
        .map(currency => currency.name)
        .join(", ");
}

/* ===========================
   POPULATION
=========================== */

export function formatPopulation(population) {
    return new Intl.NumberFormat("en-US").format(population);
}