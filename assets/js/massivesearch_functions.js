export const pokemonContainer = document.querySelector(".pokemon-container");
export const spinner = document.querySelector("#spinner");
export const previous = document.querySelector("#previous");
export const next = document.querySelector("#next");


//función para solicitar datos de la API 
export async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!response.ok) {
            throw new Error("No se pudo obtener el Pokémon");
        }
        const data = await response.json();
        createPokemon(data);
        spinner.style.display = "none";
    } catch (error) {
        console.error(error);
    }
}

export async function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i < offset + limit; i++) {
        await fetchPokemon(i + 1);
    }
}

//creamos la estructura en html para mostrar los pokemones
export function createPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    cardBack.appendChild(progressBars(pokemon.id));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

//Se crea el grafico que muestre los poderes de los pokemones utilizando la libreria canvas.js
export function progressBars(id) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
    statsContainer.classList.add("chart-container");
    statsContainer.setAttribute("id", `chartContainer${id}`);

    const url = "https://pokeapi.co/api/v2/pokemon/";

    const getData = async(id) => {
        try {
            const response = await fetch(url + id);
            if (!response.ok) {
                throw new Error("No se pudo obtener los datos del Pokémon");
            }
            const datosApi = await response.json();

            let abilities = datosApi.abilities.map((ability) => ability.ability.name);
            let estadistica = datosApi.stats.map((stat) => {
                return { y: stat.base_stat, label: stat.stat.name };
            });

            let config = {
                animationEnabled: true,
                title: {
                    text: "Estadisticas",
                },
                axisY: {
                    title: "valor",
                },
                axisX: {
                    title: "power stats",
                },
                data: [{
                    indexLabel: "{label} ({y})",
                    type: "pie",
                    dataPoints: estadistica,
                }, ],
            };
            let chart = new CanvasJS.Chart(`chartContainer${id}`, config);
            chart.render();
        } catch (error) {
            console.error(error);
        }
    };

    getData(id);

    return statsContainer;
}

//Función para borrar el contenido cargado de pokemones
export function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function clearPokemonContainer() {
    removeChildNodes(pokemonContainer);
}

export function loadFirstPokemons() {
    removeChildNodes(pokemonContainer);
    let offset = 0;
    let limit = 20;
    fetchPokemons(offset, limit);
}