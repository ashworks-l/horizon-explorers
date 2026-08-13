import {
    getCountry,
    getWikipedia,
    getWikipediaPage
} from "./api.js";

const params = new URLSearchParams(
    window.location.search
);

const countryName = params.get("country");

const destinationContainer =
    document.querySelector("#destinationInfo");

loadDestination();

async function loadDestination() {
    if (!countryName) {
        destinationContainer.innerHTML = `
            <p class="message">
                No destination was selected.
            </p>
        `;
        return;
    }

    destinationContainer.innerHTML = `
        <p class="message">
            Loading destination information...
        </p>
    `;

    try {
        const country = await getCountry(countryName);
        const wikipediaResult =
            await getWikipedia(countryName);

        let wikipediaPage = null;

        if (wikipediaResult?.key) {
            wikipediaPage =
                await getWikipediaPage(
                    wikipediaResult.key
                );
        }

        displayDestination(
            country,
            wikipediaResult,
            wikipediaPage
        );

    } catch (error) {
        console.error(error);

        destinationContainer.innerHTML = `
            <p class="message">
                Unable to load destination information.
            </p>
        `;
    }
}

function displayDestination(
    country,
    wikipediaResult,
    wikipediaPage
) {
    const title =
        wikipediaResult?.title ||
        country?.country ||
        countryName;

    const description =
        wikipediaResult?.description ||
        "Explore this destination and learn more about its culture and history.";

    const wikipediaLink =
        wikipediaPage?.html_url ||
        `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

    destinationContainer.innerHTML = `
        <article class="destination-card">

            <div class="destination-header">

                <span class="destination-label">
                    HORIZON EXPLORERS
                </span>

                <h2>
                    ${country?.country || title}
                </h2>

                <p>
                    ${description}
                </p>

            </div>

            <div class="destination-details">

                <div class="detail-box">
                    <h3>Capital</h3>
                    <p>
                        ${country?.capital || "Information unavailable"}
                    </p>
                </div>

                <div class="detail-box">
                    <h3>Currency</h3>
                    <p>
                        ${country?.currency || "Information unavailable"}
                    </p>
                </div>

                <div class="detail-box">
                    <h3>Destination</h3>
                    <p>
                        ${title}
                    </p>
                </div>

            </div>

            <a
                class="primary-button"
                href="${wikipediaLink}"
                target="_blank"
                rel="noopener noreferrer">
                Learn More
            </a>

        </article>
    `;
}