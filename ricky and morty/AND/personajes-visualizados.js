const apiUrl = "https://rickandmortyapi.com/api/character";


// Función para obtener los personajes y capítulos desde el API
function getAllCharactersWithEpisodes() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      createCharacterCardsWithEpisodes(data.results);

      // Verificar si hay más páginas de personajes
      if (data.info.next) {
        fetchMoreCharacters(data.info.next);
      }
    })
    .catch((error) => console.error("Error al obtener personajes:", error));
}

// Función para obtener más personajes si hay más páginas
function fetchMoreCharacters(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      createCharacterCardsWithEpisodes(data.results);

      // Si hay más páginas, seguir obteniendo personajes
      if (data.info.next) {
        fetchMoreCharacters(data.info.next);
      }
    })
    .catch((error) => console.error("Error al obtener más personajes:", error));
}

// Función para crear las tarjetas de personajes con sus capítulos
function createCharacterCardsWithEpisodes(characters) {
  const charactersContainer = document.getElementById("charactersContainer");

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    // Nombre del personaje
    const nameElement = document.createElement("h2");
    nameElement.textContent = character.name;

    // Género del personaje
    const genderElement = document.createElement("p");
    genderElement.textContent = `Género: ${character.gender === "Male" ? "Masculino" : "Femenino"}`;

    // Especie del personaje
    const speciesElement = document.createElement("p");
    speciesElement.textContent = `Especie: ${character.species === "Human" ? "Humano" : character.species === "Alien" ? "Alienígena" : character.species}`;
    
    // Imagen del personaje
    const imageElement = document.createElement("img");
    imageElement.src = character.image;

    // Lista de episodios
    const episodesElement = document.createElement("p");
    episodesElement.textContent = "Capítulos:";
    const episodesList = document.createElement("ul");

    // Obtener y listar los capítulos
    character.episode.forEach((episodeUrl) => {
      fetch(episodeUrl)
        .then((response) => response.json())
        .then((episodeData) => {
          const episodeItem = document.createElement("li");
          episodeItem.textContent = `S${episodeData.episode.split('E')[0].replace('S', '')}E${episodeData.episode.split('E')[1]} - ${episodeData.name}`;
          episodesList.appendChild(episodeItem);
        })
        .catch((error) => console.error("Error al obtener episodio:", error));
    });

    card.appendChild(imageElement);
    card.appendChild(nameElement);
    card.appendChild(genderElement);
    card.appendChild(speciesElement);
    card.appendChild(episodesElement);
    card.appendChild(episodesList);
    charactersContainer.appendChild(card);
  });
}

// Cargar todos los personajes con sus capítulos cuando la página se carga
window.onload = getAllCharactersWithEpisodes;