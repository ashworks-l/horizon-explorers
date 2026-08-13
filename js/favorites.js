import {
    getFavorites,
    removeFavorite
} from "./storage.js";

const container =
    document.querySelector("#favoritesContainer");

displayFavorites();

function displayFavorites() {
    const favorites = getFavorites();

    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No favorite destinations yet</h2>
                <p>
                    Search for a country and save it to your favorites.
                </p>

                <a
                    href="index.html"
                    class="primary-button">
                    Explore Destinations
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = favorites
        .map(
            (country) => `
                <article class="favorite-card">

                    <h2>${country.country}</h2>

                    <p>
                        <strong>Capital:</strong>
                        ${country.capital || "Not available"}
                    </p>

                    <p>
                        <strong>Currency:</strong>
                        ${country.currency || "Not available"}
                    </p>

                    <div class="favorite-actions">

                        <a
                            class="details-button"
                            href="destination.html?country=${encodeURIComponent(country.country)}">
                            Explore
                        </a>

                        <button
                            class="remove-button"
                            data-country="${country.country}">
                            Remove
                        </button>

                    </div>

                </article>
            `
        )
        .join("");

    document
        .querySelectorAll(".remove-button")
        .forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    removeFavorite(
                        button.dataset.country
                    );

                    displayFavorites();
                }
            );
        });
}