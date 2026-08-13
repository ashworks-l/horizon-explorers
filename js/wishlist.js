import {
    getWishlist,
    removeFromWishlist
} from "./storage.js";

const container =
    document.querySelector("#wishlistContainer");

displayWishlist();

function displayWishlist() {

    const wishlist = getWishlist();

    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <h2>
                    Your wishlist is empty
                </h2>

                <p>
                    Search for a destination and add it
                    to your wishlist.
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

    container.innerHTML = wishlist
        .map(
            (country) => `
                <article class="favorite-card">

                    <h2>
                        ${country.country}
                    </h2>

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

                    removeFromWishlist(
                        button.dataset.country
                    );

                    displayWishlist();
                }
            );

        });
}