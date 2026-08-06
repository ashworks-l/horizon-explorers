import {
    getCountry,
    getFlag,
    getCapital,
    getLanguages,
    getCurrencies,
    formatPopulation
} from "./api.js";

import {
    addFavorite,
    isFavorite,
    addTrip
} from "./storage.js";

/* ===============================
   ELEMENTS
=============================== */

const destinationContainer = document.querySelector("#destinationContainer");
const favoriteButton = document.querySelector("#favoriteButton");
const plannerButton = document.querySelector("#plannerButton");
const countryMap = document.querySelector("#countryMap");

/* ===============================
   URL PARAMETERS
=============================== */

const params = new URLSearchParams(window.location.search);
const countryName = params.get("country");
console.log("Country:", countryName);

let currentCountry = null;

/* ===============================
   INITIALIZE
=============================== */

async function initialize() {

    if (!countryName) {

        destinationContainer.innerHTML = `
            <h2 class="text-center">
                Country not found.
            </h2>
        `;

        return;
    }

    currentCountry = await getCountry(countryName);

    if (!currentCountry) {

        destinationContainer.innerHTML = `
            <h2 class="text-center">
                Country not available.
            </h2>
        `;

        return;
    }

    document.title =
        `${currentCountry.name.common} | Horizon Explorers`;

    renderCountry(currentCountry);

    updateFavoriteButton();

    loadMap();

}

initialize();

/* ===============================
   FAVORITES
=============================== */

function updateFavoriteButton() {

    if (!favoriteButton) return;

    if (isFavorite(currentCountry.name.common)) {

        favoriteButton.textContent =
            "❤️ Already in Favorites";

    } else {

        favoriteButton.textContent =
            "🤍 Add to Favorites";

    }

}

if (favoriteButton) {

    favoriteButton.addEventListener("click", () => {

        if (!isFavorite(currentCountry.name.common)) {

            addFavorite(currentCountry);

            alert(
                `${currentCountry.name.common} added to Favorites.`
            );

        } else {

            alert(
                `${currentCountry.name.common} is already in Favorites.`
            );

        }

        updateFavoriteButton();

    });

}

/* ===============================
   TRIP PLANNER
=============================== */

if (plannerButton) {

    plannerButton.addEventListener("click", () => {

        const trip = {

            id: Date.now(),

            country: currentCountry.name.common,

            capital: getCapital(currentCountry),

            region: currentCountry.region,

            date: "",

            status: "Planned"

        };

        addTrip(trip);

        alert(
            `${currentCountry.name.common} added to Trip Planner.`
        );

    });

}

/* ===============================
   RENDER COUNTRY
=============================== */

function renderCountry(country) {

    const languages = getLanguages(country);

    const currencies = getCurrencies(country);

    const population = formatPopulation(country.population);

    const area = country.area
        ? new Intl.NumberFormat("en-US").format(country.area)
        : "Unknown";

    const subregion = country.subregion || "Unknown";

    const continent = country.region || "Unknown";

    const timezones = country.timezones
        ? country.timezones.join(", ")
        : "Unknown";

    const domain = country.tld
        ? country.tld.join(", ")
        : "Unknown";

    destinationContainer.innerHTML = `

        <div class="country-details">

            <div class="country-image">

                <img
                    src="${getFlag(country)}"
                    alt="${country.name.common}">

            </div>

            <div class="country-information">

                <h2>${country.name.common}</h2>

                <div class="info-grid">

                    <p><strong>Capital:</strong> ${getCapital(country)}</p>

                    <p><strong>Region:</strong> ${continent}</p>

                    <p><strong>Subregion:</strong> ${subregion}</p>

                    <p><strong>Population:</strong> ${population}</p>

                    <p><strong>Area:</strong> ${area} km²</p>

                    <p><strong>Languages:</strong> ${languages}</p>

                    <p><strong>Currencies:</strong> ${currencies}</p>

                    <p><strong>Time Zones:</strong> ${timezones}</p>

                    <p><strong>Internet Domain:</strong> ${domain}</p>

                </div>

            </div>

        </div>

    `;

}

/* ===============================
   GOOGLE MAP
=============================== */

function loadMap() {

    if (!countryMap) return;

    if (!currentCountry.latlng) return;

    const latitude = currentCountry.latlng[0];

    const longitude = currentCountry.latlng[1];

    countryMap.src =
        `https://maps.google.com/maps?q=${latitude},${longitude}&z=5&output=embed`;

}

/* ===============================
   MOBILE MENU
=============================== */

const menuButton = document.querySelector("#menuButton");
const navbar = document.querySelector(".navbar");

if (menuButton && navbar) {

    menuButton.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

/* ===============================
   BACK TO TOP
=============================== */

const backToTop = document.querySelector("#backToTop");

if (backToTop) {

    backToTop.style.display = "none";

    window.addEventListener("scroll", () => {

        backToTop.style.display =
            window.scrollY > 300 ? "flex" : "none";

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===============================
   ESC KEY
=============================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        window.location.href = "index.html";

    }

});