const FAVORITES_KEY = "horizon-explorers-favorites";

export function getFavorites() {
    return JSON.parse(
        localStorage.getItem(FAVORITES_KEY)
    ) || [];
}

export function saveFavorite(country) {
    const favorites = getFavorites();

    const alreadySaved = favorites.some(
        (favorite) =>
            favorite.country === country.country
    );

    if (!alreadySaved) {
        favorites.push(country);

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );
    }
}

export function removeFavorite(countryName) {
    const favorites = getFavorites();

    const updatedFavorites = favorites.filter(
        (favorite) =>
            favorite.country !== countryName
    );

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
    );
}