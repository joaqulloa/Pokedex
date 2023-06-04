import { pokemonContainer, spinner, previous, next} from "./massivesearch_functions.js";
import { fetchPokemon, fetchPokemons, createPokemon, progressBars, removeChildNodes, clearPokemonContainer, loadFirstPokemons } from "./massivesearch_functions.js";

let limit = 20;
let offset = 0;

next.addEventListener("click", () => {
    offset += limit;
    fetchPokemons(offset, limit);
});

fetchPokemons(offset, limit);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearPokemonContainer);

const loadButton = document.getElementById("load-btn");
loadButton.addEventListener("click", loadFirstPokemons);