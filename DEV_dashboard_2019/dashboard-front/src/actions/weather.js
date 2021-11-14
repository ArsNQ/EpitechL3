export const autocompleteCity = async (value) => {
    if (!value.length) return await [];
    return fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY_WEATHER}&q=${value}&language=fr`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));
};
