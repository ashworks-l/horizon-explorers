/* ===============================
   CREATE COUNTRY CARD
=============================== */

export function createCountryCard(country) {

    return `

        <article class="destination-card">

            <img
                src="${country.flags.svg}"
                alt="${country.name.common}">

            <div class="card-content">

                <h3>

                    ${country.name.common}

                </h3>

                <p>

                    <strong>Capital:</strong>

                    ${country.capital
                        ? country.capital[0]
                        : "Unknown"}

                </p>

                <p>

                    <strong>Region:</strong>

                    ${country.region}

                </p>

                <p>

                    <strong>Population:</strong>

                    ${new Intl.NumberFormat().format(country.population)}

                </p>

                <a
                    href="destination.html?country=${encodeURIComponent(country.name.common)}"
                    class="details-btn">

                    View Details

                </a>

            </div>

        </article>

    `;

}


/* ===============================
   DISPLAY COUNTRIES
=============================== */

export function displayCountries(countries, container) {

    container.innerHTML = "";

    countries.forEach(country => {

        container.innerHTML += createCountryCard(country);

    });

}


/* ===============================
   LOADING
=============================== */

export function showLoading(container) {

    container.innerHTML = `

        <h2 class="text-center">

            Loading...

        </h2>

    `;

}


/* ===============================
   ERROR
=============================== */

export function showError(container, message) {

    container.innerHTML = `

        <h2 class="text-center">

            ${message}

        </h2>

    `;

}