// Ejercicio 2: ASYNC
// Parte importante de aprender a trabajar con peticiones HTTP implica entender cómo funciona una API.
// Para entender cómo funciona una API es necesario:
// Leer la documentación de la API (si es que existe)
// Hacer pruebas (testear) la API


// 1.- Hacer una petición a la PokeAPI para obtener cualquier Pokémon. 
// Muestra sus tipos en consola mediante un for.
//[https://pokeapi.co/](https://pokeapi.co/)

const url = 'https://pokeapi.co/api/v2/pokemon/';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const pokemons = data.results;
    console.log('Nombres de los Pokémon:');
    for (let i = 0; i < pokemons.length; i++) {
      console.log(pokemons[i].name);
    }
  })
  .catch(error => console.log('Error al obtener los Pokémon:', error));

// 2.- Escribe una función que al ejecutarse realice una petición a la API de Open Library. 
// Buscar un libro y traer el o los autores del primer libro
// Ejemplo: peticionLibro("i robot");
// [http://openlibrary.org/search.json?q=i+robot]
// (http://openlibrary.org/search.json?q=i+robot)


function consultarLibro(libro) {
    const url = `http://openlibrary.org/search.json?q=${encodeURIComponent(libro)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no se puede procesar correctamente debido a un error en la API o en la red');
            }
            return response.json();
        })
        .then(data => {
            const primerLibro = data.docs[0];
            if (primerLibro) {
                console.log('Título del libro:', primerLibro.title);
                if (primerLibro.author_name) {
                    console.log('Nombre del autor o autores:', primerLibro.author_name.join(', '));
                } else {
                    console.log('Nombre del autor o autores: No disponible');
                }
            } else {
                console.log('No se encontraron resultados para el libro especificado.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}


consultarLibro("The Biblie");



// 3.- Hacer una petición por autor y devolver la lista de sus libros.
//[http://openlibrary.org/search.json?author=asimov]
//(http://openlibrary.org/search.json?author=asimov)

function consultarAutor(Autor) {
    const url = `http://openlibrary.org/search.json?author=${encodeURIComponent(Autor)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no se puede procesar correctamente debido a un error en la API o en la red');
            }
            return response.json();
        })
        .then(data => {
            const libros = data.docs;
            if (libros.length > 0) {
                console.log(`Libros del autor ${Autor}:`);
                libros.forEach(libro => {
                    console.log(libro.title+" Autor: "+ Autor);
                });
            } else {
                console.log(`No se encontraron libros del autor ${Autor}.`);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

consultarAutor("Garcia");


// 4.- Hacer una petición y devolver el género de la banda deseada.
//[https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay]
//(https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay)

function obtenerGeneroDeBanda(nombreBanda) {
    const url = `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${encodeURIComponent(nombreBanda)}`; // Abajo
    //Cambie la url ya que no me funcionba con la direccion que daban en el ejercicio

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no se puede procesar correctamente debido a un error en la API o en la red');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.artists || data.artists.length === 0) {
                throw new Error('No se encontraron resultados para la banda especificada.');
            }
            data.artists.forEach(banda => {
                console.log('Nombre de la banda:', banda.strArtist);
                console.log('Género:', banda.strGenre);
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
}


obtenerGeneroDeBanda("EMINEM");



// 5.- Hacer una petición a la swapi para obtener un personaje y también obtener las películas donde aparece.
// [https://swapi.co/](https://swapi.co/)

async function obtenerPersonajeYPelículas(id) {
    try {
        
        const personajeResponse = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!personajeResponse.ok) {
            throw new Error('No se pudo obtener la información del personaje');
        }
        const personajeData = await personajeResponse.json();
    
        const peliculas = await Promise.all(personajeData.films.map(async (filmUrl) => {
            const filmResponse = await fetch(filmUrl);
            if (!filmResponse.ok) {
                throw new Error(`No se pudo obtener información sobre la película ${filmUrl}`);
            }
            const filmData = await filmResponse.json();
            return {
                titulo: filmData.title,
                director: filmData.director,
                lanzamiento: filmData.release_date
            };
        }));

        return {
            personaje: {
                nombre: personajeData.name,
                altura: personajeData.height,
                peso: personajeData.mass
            },
            peliculas: peliculas
        };
    } catch (error) {
        console.error('Error al obtener datos de SWAPI:', error);
        return null;
    }
}

// Ejemplo de uso
const idPersonaje = 4; //personaje
obtenerPersonajeYPelículas(idPersonaje)
    .then(data => {
        if (data) {
            console.log('Información del personaje:', data.personaje);
            console.log('Películas en las que aparece:', data.peliculas);
        } else {
            console.log('No se pudo obtener la información del personaje y sus películas.');
        }
    })
    .catch(error => console.error('Error:', error));




// 6.- (EXTRA) Devolver los asteroides que sean potencialmente peligrosos para la tierra de la semana pasada hasta 
// el día de ayer.
// [https://api.nasa.gov/](https://api.nasa.gov/)

function obtenerAsteroides() {
   
    const fechaHace7Dias = obtenerFechaHace7Dias();

   
    const fechaAyer = obtenerFechaAyer();

   
    const apiKey = 'oMDIxmc4au9WKWSD1ZnDDGP0iEOLse7Mz6cua5bE'; // Ingre una key para que me dejara, tuve que registrarme
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fechaHace7Dias}&end_date=${fechaAyer}&api_key=${apiKey}`;

   
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no se puede procesar correctamente debido a un error en la API o en la red');
            }
            return response.json();
        })
        .then(data => {
          
            const asteroidesPeligrosos = Object.values(data.near_earth_objects).flat().filter(asteroide => asteroide.is_potentially_hazardous_asteroid);

           
            console.log('Asteroides potencialmente peligrosos para la Tierra:');
            asteroidesPeligrosos.forEach(asteroide => {
                console.log('Nombre:', asteroide.name);
                console.log('Diámetro (metros):', asteroide.estimated_diameter.meters.estimated_diameter_min, '-', asteroide.estimated_diameter.meters.estimated_diameter_max);
                console.log('Distancia al acercarse (km):', asteroide.close_approach_data[0].miss_distance.kilometers);
                console.log('Fecha del acercamiento:', new Date(asteroide.close_approach_data[0].close_approach_date_full).toLocaleDateString());
                console.log('---');
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
}

function obtenerFechaHace7Dias() {
    const hoy = new Date();
    const hace7Dias = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
    return hace7Dias.toISOString().slice(0, 10);
}


function obtenerFechaAyer() {
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);
    return ayer.toISOString().slice(0, 10);
}


obtenerAsteroides();


//7.- Traer los primeros 151 pokemon de la primera generacion y devolver un arreglo de objetos con el nombre, 
//sus moves, tipos, tamaño y peso.
//[https://pokeapi.co/](https://pokeapi.co/)

async function obtenerPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=15';// 15 le puse para no hacer largo la lista
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudieron obtener los datos de la PokeAPI');
        }
        const data = await response.json();
        const pokemonDetalles = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonInfo = await obtenerDetallesPokemon(pokemon.url);
            return {
                nombre: pokemon.name,
                movimientos: pokemonInfo.moves.map(move => move.move.name),
                tipos: pokemonInfo.types.map(type => type.type.name),
                tamaño: pokemonInfo.height,
                peso: pokemonInfo.weight
            };
        }));
        return pokemonDetalles;
    } catch (error) {
        console.error('Error al obtener los datos de la PokeAPI:', error);
        return [];
    }
}

async function obtenerDetallesPokemon(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudieron obtener los detalles del Pokémon');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
        return null;
    }
}


obtenerPokemon()
    .then(pokemon => console.log(pokemon))
    .catch(error => console.error(error));

