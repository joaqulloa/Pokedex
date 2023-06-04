import { URL, searchInput, pokedexContainer, showError, searchPokemon, crearCometa } from "./search_functions.js";

document.querySelector('button').addEventListener('click', () => {
    setTimeout(searchPokemon, 2000);
});

// Llama a la función crearCometa cada 2 segundos
setInterval(crearCometa, 2000);
