// Función para mezclar un array usando el algoritmo de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Función para ordenar aleatoriamente los productos
  function shuffleProducts() {
    const container = document.querySelector('.products-container');
    if (!container) return; // Si no encuentra el contenedor, salir
  
    // Obtener todos los elementos de producto (los divs con clase 'product-item')
    const products = Array.from(container.querySelectorAll('.product-item'));
  
    // Mezclar el array de productos
    const shuffledProducts = shuffleArray(products);
  
    // Vaciar el contenedor
    container.innerHTML = '';
  
    // Reinsertar los productos en el orden mezclado
    shuffledProducts.forEach(product => {
      container.appendChild(product);
    });
  }
  
  // Ejecutar la función cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', shuffleProducts);