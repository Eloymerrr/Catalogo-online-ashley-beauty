// LISTAS DE DESEOS //

// Selección de elementos del DOM
const btnsFavorite = document.querySelectorAll('.favorite');
const productElements = document.querySelectorAll('.producto-index');
const counterFavorites = document.querySelector('.counter-favorite');
const containerListFavorites = document.querySelector('.container-list-favorites');
const listFavorites = document.querySelector('.list-favorites');

// Array para almacenar los productos favoritos
let favorites = [];

// Funciones de manejo de favoritos

// Función para actualizar los favoritos en localStorage
const updateFavoritesInLocalStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Función para cargar los favoritos desde localStorage al iniciar
const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
        showHTML();
    }
};

// Función para alternar (agregar o quitar) un producto de favoritos
const toggleFavorite = (product) => {
    const index = favorites.findIndex(element => element.id === product.id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(product);
    }
    updateFavoritesInLocalStorage();
};

// Función para remover un producto específico de favoritos
const removeFavorite = (productId) => {
    favorites = favorites.filter(fav => fav.id !== productId);
    updateFavoritesInLocalStorage();
    showHTML();
};

// Función para actualizar el menú de favoritos en el HTML
const updateFavoriteMenu = () => {
    listFavorites.innerHTML = favorites.map(fav => `
        <div class="card-favorite">
            <img src="${fav.image}" alt="${fav.title}" class="favorite-image">
            <p class="title">${fav.title}</p>
            <p>${fav.price}</p>
            <button class="remove-favorite btn btn-danger" data-id="${fav.id}"><i class="remove-favorite fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');

    // Añadir evento a los botones de eliminar
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFavorite(productId);
        });
    });
};

// Función para mostrar el estado de los favoritos en el HTML (botones, contador, etc.)
const showHTML = () => {
    productElements.forEach(product => {
        const contentCard = product.querySelector('.content-card-product');
        const productId = contentCard.dataset.productId;
        const isFavorite = favorites.some(favorite => favorite.id === productId);

        const favoriteButton = product.querySelector('.favorite');
        const favoriteButtonActive = product.querySelector('#added-favorite');
        const favoriteRegularIcon = product.querySelector('#favorite-regular');

        favoriteButtonActive.classList.toggle('active', isFavorite);
        favoriteRegularIcon.classList.toggle('active', isFavorite);
        favoriteButton.classList.toggle('favorite-active', isFavorite);
    });

    counterFavorites.textContent = favorites.length;
    updateFavoriteMenu();
};

// Manejo de eventos

// Evento para los botones de favorito en las tarjetas de productos
btnsFavorite.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.content-card-product');
        const product = {
            id: card.dataset.productId,
            title: card.querySelector('h3').textContent,
            price: card.querySelector('.precio').textContent,
            image: card.closest('.producto-index').querySelector('img').src // Obtener la URL de la imagen
        };
        toggleFavorite(product);
        showHTML();
    });
});

// Selección de elementos para cerrar el menú de favoritos
const btnClose = document.querySelector('#btn-close');
const buttonHeaderFavorite = document.querySelector('#button-header-favorite');

// Evento para mostrar/ocultar el contenedor de la lista de favoritos
buttonHeaderFavorite.addEventListener('click', () => {
    containerListFavorites.classList.toggle('show');
});

// Evento para cerrar el contenedor de la lista de favoritos
btnClose.addEventListener('click', () => {
    containerListFavorites.classList.remove('show');
});

// Inicialización
loadFavoritesFromLocalStorage();
updateFavoriteMenu();