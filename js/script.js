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
    // Obtener el valor del filtro, limpiar espacios y convertirlo a mayúsculas
    const filter = document.getElementById('find').value.trim().toUpperCase();
    
    // Obtener la categoría activa
    const activeCategory = document.querySelector('.category_item.ct_item-active').getAttribute('category');
    
    // CORRECCIÓN: Seleccionar 'product-item' para que coincida con el resto del código
    const items = document.querySelectorAll('.product-item');
    
    // Obtener el contenedor padre de los productos
    const container = document.querySelector('.products-container');
    
    // Aplicar filtros
    items.forEach(item => {
        const cat = item.getAttribute('category');
        const h3 = item.querySelector('h3');
        const value = h3 ? h3.textContent.toUpperCase().trim() : '';
        
        // Verificar si el producto pertenece a la categoría activa
        const inCategory = activeCategory === 'all' || cat === activeCategory;
        
        // Si hay filtro, verificar coincidencia; si no, mostrar si está en categoría
        let shouldShow = false;
        if (filter !== '') {
            // Se usa includes para una búsqueda más directa y compatible con copiado/pegado
            shouldShow = inCategory && value.includes(filter);
        } else {
            shouldShow = inCategory;
        }
        
        // Establecer display
        item.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) item.style.transform = 'scale(1)';
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
        let message = '';
        if (visibleCount > 0) {
            message = `Se encontraron ${visibleCount} producto${visibleCount === 1 ? '' : 's'} "${filter.toLowerCase()}".`;
        } else {
            if (activeCategory !== 'all') {
                const categoryNames = {
                    'skincare': 'Skincare',
                    'makeup': 'Makeup',
                    'perfumery': 'Aura y Aroma (Perfumería)',
                    'bags': 'Bolsos & Carteras'
                };
                
                const matchingCategories = [];
                items.forEach(item => {
                    const cat = item.getAttribute('category');
                    const h3 = item.querySelector('h3');
                    const value = h3 ? h3.textContent.toUpperCase() : '';
                    if (cat !== activeCategory && value.includes(filter)) {
                        if (!matchingCategories.includes(cat)) {
                            matchingCategories.push(cat);
                        }
                    }
                });
                
                if (matchingCategories.length > 0) {
                    const suggestions = matchingCategories.map(cat => categoryNames[cat] || cat).join(', ');
                    message = `Este producto que buscas no es de esta categoría. Prueba en : ${suggestions}.`;
                } else {
                    message = `No se encontraron productos con "${filter.toLowerCase()}".`;
                }
            } else {
                message = `No se encontraron productos con "${filter.toLowerCase()}".`;
            }
        }
        
        resultMessage.innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">
         <i class="fa-solid fa-circle-info me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        
        const closeButton = resultMessage.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                document.getElementById('find').value = '';
                search();
            });
        }
    } else {
        resultMessage.innerHTML = '';
    }
}

// Código de filtrado por categoría
$(document).ready(function() {
    function updateCategoryCounts() {
        var counts = {};
        $('.product-item').each(function() {
            var cat = $(this).attr('category');
            if (!counts[cat]) {
                counts[cat] = 0;
            }
            counts[cat]++;
        });
        
        counts['all'] = $('.product-item').length;
        
        $('.category_item').each(function() {
            var cat = $(this).attr('category');
            var originalText = $(this).text().split(' (')[0];
            $(this).text(originalText + ' (' + (counts[cat] || 0) + ')');
        });
    }
    
    updateCategoryCounts();
    $('.category_list .category_item[category="all"]').addClass('ct_item-active');

    $('.category_item').click(function() {
        var catProduct = $(this).attr('category');

        $('.category_item').removeClass('ct_item-active');
        $(this).addClass('ct_item-active');

        $('.product-item').css('transform', 'scale(0)');
        setTimeout(function() {
            $('.product-item').hide();
        }, 400);

        setTimeout(function() {
            if (catProduct === 'all') {
                $('.product-item').show().css('transform', 'scale(1)');
            } else {
                $('.product-item[category="' + catProduct + '"]').show().css('transform', 'scale(1)');
            }
            search();
        }, 400);
    });
});