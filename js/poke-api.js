const pokeApi = {}

function convertPokeApiDetail(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetail)
}

pokeApi.getPokemon = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json()) //devolve um resultado caso a requisição tenha sucesso. (utilizando função anônima/arrow function)
        .then((jsonBody) => jsonBody.results) //encadeamento de then, sendo que o resultado do primeiro será jogado pro segundo.
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => (pokemonDetails))
        .catch((error) => console.error(error))
}