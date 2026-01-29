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

// Función de búsqueda actualizada y mejorada
function search() {
    // Obtener el valor del filtro y convertirlo a mayúsculas
    const filter = document.getElementById('find').value.toUpperCase();
    
    // Obtener la categoría activa
    const activeCategory = document.querySelector('.category_item.ct_item-active').getAttribute('category');
    
    // Seleccionar todos los elementos con clase 'product' (asumiendo que es lo mismo que 'product-item')
    const items = document.querySelectorAll('.product');
    
    // Obtener el contenedor padre de los productos (asumiendo que existe un contenedor con clase 'products-container')
    const container = document.querySelector('.products-container');
    
    // Aplicar filtros
    items.forEach(item => {
        const cat = item.getAttribute('category');
        const h3 = item.querySelector('h3');
        const value = h3 ? h3.textContent.toUpperCase() : '';
        
        // Verificar si el producto pertenece a la categoría activa
        const inCategory = activeCategory === 'all' || cat === activeCategory;
        
        // Si hay filtro, verificar coincidencia; si no, mostrar si está en categoría
        let shouldShow = false;
        if (filter !== '') {
            const regex = new RegExp(filter, 'i');
            shouldShow = inCategory && regex.test(value);
        } else {
            shouldShow = inCategory;
        }
        
        // Establecer display
        item.style.display = shouldShow ? 'block' : 'none';
    });
    
    // Si hay filtro, reordenar: visibles primero, luego ocultos
    if (filter !== '') {
        const visibleItems = Array.from(items).filter(item => item.style.display === 'block');
        const hiddenItems = Array.from(items).filter(item => item.style.display === 'none');
        const orderedItems = visibleItems.concat(hiddenItems);
        
        // Limpiar el contenedor y reordenar
        container.innerHTML = '';
        orderedItems.forEach(item => container.appendChild(item));
    }
    
    // Contar los productos visibles después del filtro
    const visibleItems = Array.from(items).filter(item => item.style.display === 'block');
    const visibleCount = visibleItems.length;
    
    // Obtener el elemento del mensaje
    const resultMessage = document.getElementById('result-message');
    
    // Mostrar el mensaje solo si hay un filtro escrito (no vacío)
    if (filter !== '') {
        // Generar el mensaje basado en la cantidad de productos visibles y el filtro
        let message = '';
        if (visibleCount > 0) {
            message = `Se encontraron ${visibleCount} producto${visibleCount === 1 ? '' : 's'} "${filter.toLowerCase()}".`;
        } else {
            // Si no hay productos visibles en la categoría activa, buscar en otras categorías
            if (activeCategory !== 'all') {
                // Objeto para mapear categorías a nombres legibles
                const categoryNames = {
                    'skincare': 'Skincare',
                    'makeup': 'Makeup',
                    'perfumery': 'Aura y Aroma (Perfumería)',
                    'bags': 'Bolsos & Carteras'
                    // Agrega más si es necesario
                };
                
                // Buscar productos que coincidan con el filtro en otras categorías
                const matchingCategories = [];
                const regex = new RegExp(filter, 'i');
                items.forEach(item => {
                    const cat = item.getAttribute('category');
                    const h3 = item.querySelector('h3');
                    const value = h3 ? h3.textContent.toUpperCase() : '';
                    if (cat !== activeCategory && regex.test(value)) {
                        if (!matchingCategories.includes(cat)) {
                            matchingCategories.push(cat);
                        }
                    }
                });
                
                if (matchingCategories.length > 0) {
                    // Si hay coincidencias en otras categorías, sugerir cambiar
                    const suggestions = matchingCategories.map(cat => categoryNames[cat] || cat).join(', ');
                    message = `Este producto que buscas no es de esta categoría. Prueba en : ${suggestions}.`;
                } else {
                    // Si no hay en ninguna categoría, mensaje genérico
                    message = `No se encontraron productos con "${filter.toLowerCase()}".`;
                }
            } else {
                // Si la categoría activa es 'all', mensaje genérico
                message = `No se encontraron productos con "${filter.toLowerCase()}".`;
            }
        }
        
        // Mostrar el mensaje usando Bootstrap con animación suave
        resultMessage.innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">
         <i class="fa-solid fa-circle-info me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        
        // Agregar evento al botón de cerrar para limpiar la búsqueda
        const closeButton = resultMessage.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                // Limpiar el campo de búsqueda
                document.getElementById('find').value = '';
                // Re-ejecutar la búsqueda para mostrar todos los productos de la categoría actual
                search();
            });
        }
    } else {
        // Si el filtro está vacío, ocultar el mensaje
        resultMessage.innerHTML = '';
    }
}

// Código de filtrado por categoría (sin cambios significativos, pero asegúrate de que use 'display' consistentemente)
$(document).ready(function() {
    // Función para calcular y mostrar el conteo de productos por categoría
    function updateCategoryCounts() {
        // Objeto para almacenar los conteos
        var counts = {};
        
        // Contar productos por categoría
        $('.product-item').each(function() {
            var cat = $(this).attr('category');
            if (!counts[cat]) {
                counts[cat] = 0;
            }
            counts[cat]++;
        });
        
        // Contar total para "all"
        counts['all'] = $('.product-item').length;
        
        // Actualizar el texto de cada enlace de categoría con el conteo
        $('.category_item').each(function() {
            var cat = $(this).attr('category');
            var originalText = $(this).text().split(' (')[0]; // Remover conteo anterior si existe
            $(this).text(originalText + ' (' + (counts[cat] || 0) + ')');
        });
    }
    
    // Llamar a la función para inicializar los conteos
    updateCategoryCounts();
    
    // Agregando clase ACTIVE al primer enlace (categoría "all")
    $('.category_list .category_item[category="all"]').addClass('ct_item-active');

    // Función para filtrar productos por categoría
    $('.category_item').click(function() {
        var catProduct = $(this).attr('category');
        console.log(catProduct);

        // Removiendo clase ACTIVE de todos los enlaces y agregándola al seleccionado
        $('.category_item').removeClass('ct_item-active');
        $(this).addClass('ct_item-active');

        // Ocultando productos con animación (escala a 0 y luego hide)
        $('.product-item').css('transform', 'scale(0)');
        setTimeout(function() {
            $('.product-item').hide();
        }, 400);

        // Mostrando productos de la categoría seleccionada con animación
        setTimeout(function() {
            if (catProduct === 'all') {
                // Mostrar todos los productos si es "all"
                $('.product-item').show().css('transform', 'scale(1)');
            } else {
                // Mostrar solo los productos de la categoría específica
                $('.product-item[category="' + catProduct + '"]').show().css('transform', 'scale(1)');
            }
            // Después de cambiar categoría, aplicar la búsqueda actual si hay filtro
            search();
        }, 400);
    });
});