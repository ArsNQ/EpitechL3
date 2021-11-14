export const autocompleteWiki = async (value) => {
    if (!value.length) return await [];

    var Init = { method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }};
    return fetch(`http://localhost:8081/wiki/autoCompleteWiki/${value}`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log("err", err));
};
