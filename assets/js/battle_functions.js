// numero aleatorio 
export const numRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


// obtener pokemon aleatorio
export const pokeRandom = async () => {
    const pokeId = numRandom(1, 1008);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    const pokemonData = await response.json();
    return pokemonData;
};

// ataque aleatorio pokemon
export const attackRandom = (pokemon) => {
    const indAttack = numRandom(0, pokemon.moves.length - 1);
    return pokemon.moves[indAttack].move.name;
};

// batalla con ataques y comparando stat
export const startBattle = async () => {
    const pokemon1 = await pokeRandom();
    const pokemon2 = await pokeRandom();

    const attackPokemon1 = attackRandom(pokemon1);
    const attackPokemon2 = attackRandom(pokemon2);

    const result = document.getElementById('result');
    result.innerHTML = `<p>${pokemon1.name} vs ${pokemon2.name}</p>`;
    result.innerHTML += `<p>${pokemon1.name} usó ${attackPokemon1}</p>`;
    result.innerHTML += `<p>${pokemon2.name} usó ${attackPokemon2}</p>`;

    if (pokemon1.stats[1].base_stat > pokemon2.stats[1].base_stat) {
        result.innerHTML += `<p1>¡${pokemon1.name} es el ganador!</p1>`;
    } else if (pokemon2.stats[1].base_stat > pokemon1.stats[1].base_stat) {
        result.innerHTML += `<p1>¡${pokemon2.name} es el ganador!</p1>`;
    } else {
        result.innerHTML += `<p1>¡Es un empate!</p1>`;
    }
//mostras img de pokemones

    const imgPokemon1 = document.getElementById('img-pokemon1');
    const imgPokemon2 = document.getElementById('img-pokemon2');
    const namePokemon1 = document.getElementById('name-pokemon1');
    const namePokemon2 = document.getElementById('name-pokemon2');

    imgPokemon1.src = pokemon1.sprites.front_default;
    imgPokemon2.src = pokemon2.sprites.front_default;
    namePokemon1.textContent = pokemon1.name;
    namePokemon2.textContent = pokemon2.name;
};

