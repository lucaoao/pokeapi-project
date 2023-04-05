const pokemonList = document.getElementById('pokemonList');
const loadButton = document.getElementsByClassName('load')[0];

const maxRecords = 151;
const limit = 12;
let offset = 0;

function loadPokemonItems(offset, limit) {    
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
        `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.image}"
                     alt="${pokemon.name}">
                 </div>
             </li>
        `).join('');

        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItems(offset, limit)

loadButton.addEventListener('click', () => {
    console.log('Carregando...');
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = qtdRecordNextPage - maxRecords;
        loadPokemonItems(offset, newLimit);

        loadButton.parentElement.removeChild(loadButton)
    } else {
        loadPokemonItems(offset, limit);
    }
})