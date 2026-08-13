import { getCountry } from "./api.js";
import {
    saveFavorite,
    addToWishlist
} from "./storage.js";

const searchInput =
    document.querySelector("#countrySearch");

const searchButton =
    document.querySelector("#searchBtn");

const countryContainer =
    document.querySelector("#countryContainer");

if (searchButton) {
    searchButton.addEventListener(
        "click",
        searchCountry
    );
}

if (searchInput) {
    searchInput.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Enter") {
                searchCountry();
            }
        }
    );
}

async function searchCountry() {

    const searchValue =
        searchInput.value.trim();

    if (!searchValue) {

        countryContainer.innerHTML = `
            <p class="message">
                Please enter a country name.
            </p>
        `;

        return;
    }

    countryContainer.innerHTML = `
        <p class="loading">
            Searching for ${searchValue}...
        </p>
    `;

    try {

        console.log(
            "Searching for:",
            searchValue
        );

        const country =
            await getCountry(searchValue);

        console.log(
            "Country received:",
            country
        );

        if (!country) {

            countryContainer.innerHTML = `
                <p class="message">
                    Country not found.
                </p>
            `;

            return;
        }

        displayCountry(country);

    } catch (error) {

        console.error(
            "Search error:",
            error
        );

        countryContainer.innerHTML = `
            <p class="message">
                Unable to load country information.
                Please try again.
            </p>
        `;
    }
}

function displayCountry(country) {

    countryContainer.innerHTML = `
        <article class="destination-card">

            <div class="card-content">

                <h3>
                    ${country.country}
                </h3>

                <p>
                    <strong>Capital:</strong>
                    ${country.capital || "Not available"}
                </p>

                <p>
                    <strong>Currency:</strong>
                    ${country.currency || "Not available"}
                </p>

                <div class="card-buttons">

                    <a
                        href="destination.html?country=${encodeURIComponent(country.country)}"
                        class="details-btn">
                        Explore
                    </a>

                    <button
                        class="favorite-btn"
                        id="favoriteSearchButton"
                        type="button"
                        aria-label="Save to favorites">
                        ❤️
                    </button>

                    <button
                        class="favorite-btn"
                        id="wishlistSearchButton"
                        type="button"
                        aria-label="Add to wishlist">
                        ⭐
                    </button>

                </div>

            </div>

        </article>
    `;

    document
        .querySelector("#favoriteSearchButton")
        .addEventListener(
            "click",
            () => {

                saveFavorite(country);

                document.querySelector(
                    "#favoriteSearchButton"
                ).textContent = "✓";
            }
        );

    document
        .querySelector("#wishlistSearchButton")
        .addEventListener(
            "click",
            () => {

                addToWishlist(country);

                document.querySelector(
                    "#wishlistSearchButton"
                ).textContent = "✓";
            }
        );
}