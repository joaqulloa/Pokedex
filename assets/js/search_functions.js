export const URL = 'https://pokeapi.co/api/v2/pokemon/';
export const searchInput = document.getElementById('searchInput');
export const pokedexContainer = document.getElementById('pokemonTypes');


// Funcion para mostrar un mensaje de error
export function showError(message) {
    pokedexContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Funcion para buscar un Pokemon
export async function searchPokemon() {
    // Obtener el valor del campo de busqueda y convertirlo a minusculas
    const searchedPokemon = searchInput.value.toLowerCase();

    try {
        // Realizar una peticion a la API de PokeAPI con el nombre del Pokemon
        const response = await fetch(URL + searchedPokemon);
        if (!response.ok) {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            showError(`No se encontró ningún Pokémon llamado "${searchedPokemon}"`);
            return;
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Mostrar los datos del Pokemon en el contenedor de resultados
        pokedexContainer.innerHTML = 
        `   <div class="card" style="width: 18rem;">
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>ID: ${data.id}</p>
            <p>Altura: ${data.height / 10} m</p>
            <p>Peso: ${data.weight / 10} kg</p>
            <div>
        `;
    } catch (error) {
        // Si ocurre un error durante la peticion, se muestra un mensaje de error
        showError('Ha ocurrido un error al buscar el Pokémon');
        console.error(error);
    }
}


export function crearCometa() {
    // Crea un nuevo elemento div para el cometa
    let cometa = document.createElement("div");

    // Establece la clase CSS para el cometa
    cometa.className = "cometa";

    // Establece la posición inicial del cometa
    cometa.style.left = "-50px";
    cometa.style.top = Math.random() * window.innerHeight + "px";

    // Agrega el cometa al cuerpo del documento HTML
    document.body.appendChild(cometa);

    // Anima el cometa
    let velocidad = Math.random() * 5 + 2;
    let animacion = cometa.animate([
        { transform: "translateX(-50px)" },
        { transform: "translateX(" + (window.innerWidth + 50) + "px)" }
    ], velocidad * 1000);

    // Elimina el cometa del cuerpo del documento HTML cuando la animación termine
    animacion.onfinish = function() {
        cometa.parentNode.removeChild(cometa);
    }
}

