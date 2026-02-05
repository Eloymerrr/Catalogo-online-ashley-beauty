/**
 * CONFIGURACIÓN Y DICCIONARIOS
 */
 const CATEGORY_NAMES = {
    'skincare': 'Skincare',
    'makeup': 'Makeup',
    'perfumes': 'Perfumes',
    'Bolsos & Carteras': 'Bolsos & Carteras'
};

/**
 * 1. ALGORITMO DE MEZCLA (FISHER-YATES)
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleProducts() {
    const container = document.querySelector('.products-container');
    if (!container) return;
    const products = Array.from(container.querySelectorAll('.product-item'));
    const shuffledProducts = shuffleArray(products);
    
    container.innerHTML = '';
    shuffledProducts.forEach(product => container.appendChild(product));
}

/**
 * 2. FUNCIÓN DE BÚSQUEDA Y FILTRADO INTEGRADO
 */
function search() {
    const findInput = document.getElementById('find');
    const filter = findInput ? findInput.value.trim().toUpperCase() : '';
    
    const activeBtn = document.querySelector('.category_item.ct_item-active');
    const activeCategory = activeBtn ? activeBtn.getAttribute('category') : 'all';
    
    const items = document.querySelectorAll('.product-item');
    const resultMessage = document.getElementById('result-message');
    
    let visibleCount = 0;
    let suggestions = new Set();

    items.forEach(item => {
        const itemCat = item.getAttribute('category');
        const title = item.querySelector('h3')?.textContent.toUpperCase() || '';
        
        const matchesSearch = filter === '' || title.includes(filter);
        const matchesCategory = activeCategory === 'all' || itemCat === activeCategory;

        // Lógica de visualización con animación
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
            // Pequeño timeout para que el navegador procese el display antes de la escala
            setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
            }, 10);
            visibleCount++;
        } else {
            item.style.transform = 'scale(0)';
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.display = 'none';
            }, 400); // Duración de la animación CSS
            
            // Si el nombre coincide pero está oculto por categoría, lo sugerimos
            if (matchesSearch && !matchesCategory) {
                suggestions.add(CATEGORY_NAMES[itemCat] || itemCat);
            }
        }
    });

    // 3. MANEJO DINÁMICO DE MENSAJES (COLORES POR SITUACIÓN)
    if (filter !== '') {
        let message = '';
        let alertClass = ''; 

        if (visibleCount > 0) {
            // ÉXITO: Productos encontrados (Verde)
            alertClass = 'alert-success'; 
            message = `<i class="fa-solid fa-check-circle me-2"></i> Se encontraron ${visibleCount} producto(s) para "${filter.toLowerCase()}".`;
        } else if (suggestions.size > 0) {
            // ADVERTENCIA: Existe en otra categoría (Amarillo/Naranja)
            alertClass = 'alert-warning';
            const catList = Array.from(suggestions).join(', ');
            message = `<i class="fa-solid fa-triangle-exclamation me-2"></i> No está en esta categoría. Intenta en: <b>${catList}</b>.`;
        } else {
            // ERROR: No existe nada (Rojo)
            alertClass = 'alert-danger';
            message = `<i class="fa-solid fa-circle-xmark me-2"></i> No se encontró nada relacionado con "${filter.toLowerCase()}".`;
        }

        resultMessage.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert" style="transition: all 0.3s ease; margin: 10px 0;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        
        // Listener para limpiar buscador si cierran la alerta
        resultMessage.querySelector('.btn-close')?.addEventListener('click', () => {
            if(findInput) findInput.value = '';
            search();
        });
    } else {
        resultMessage.innerHTML = ''; // Limpiar si no hay búsqueda
    }
}

/**
 * 5. FUNCIONES PARA MANEJO DEL MODAL EN DESKTOP (ZOOM Y CURSOR)
 */
function setupModalZoom() {
    // Detectar si es desktop (ancho > 768px, asumiendo que es PC/laptop)
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    
    if (!isDesktop) return; // Solo aplicar en desktop
    
    const modal = document.querySelector('.products-preview');
    const img = modal ? modal.querySelector('.preview img') : null;
    
    if (!modal || !img) return;
    
    // Observer para detectar cuando el modal se abre (añade clase 'active')
    const observer = new MutationObserver(() => {
        if (modal.classList.contains('active')) {
            // Resetear el zoom al abrir el modal
            img.style.transform = 'scale(1)';
        }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    
    // Event listeners para cursor y zoom en la imagen
    img.addEventListener('mouseenter', () => {
        img.style.cursor = 'zoom-in'; // Cambiar cursor a zoom-in
        img.style.transform = 'scale(1.2)'; // Aplicar zoom (ajusta el nivel si es necesario)
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.cursor = 'default'; // Resetear cursor
        img.style.transform = 'scale(1)'; // Deshacer zoom
    });
}

/**
 * 4. INICIALIZACIÓN Y EVENTOS (jQuery)
 */
$(document).ready(function() {
    // 1. Aleatorizar productos al inicio
    shuffleProducts();

    // 2. Función para actualizar los números (contadores) en los botones
    function updateCategoryCounts() {
        const totalItems = $('.product-item').length;
        $('.category_item').each(function() {
            const cat = $(this).attr('category');
            const count = (cat === 'all') 
                ? totalItems 
                : $(`.product-item[category="${cat}"]`).length;
            
            const baseText = $(this).text().split(' (')[0];
            $(this).text(`${baseText} (${count})`);
        });
    }

    updateCategoryCounts();

    // 3. Evento Click en Categorías
    $('.category_item').click(function(e) {
        e.preventDefault();
        
        if ($(this).hasClass('ct_item-active')) return;

        // UI: Cambiar clase activa
        $('.category_item').removeClass('ct_item-active');
        $(this).addClass('ct_item-active');

        // Animación de salida global
        $('.product-item').css('transform', 'scale(0)');
        
        // Esperar a que la animación de "encogimiento" termine para filtrar
        setTimeout(() => {
            search(); 
        }, 400);
    });

    // 4. Evento en tiempo real para el buscador
    $('#find').on('keyup', function() {
        search();
    });

    // 5. Configurar zoom y cursor en modal para desktop
    setupModalZoom();
});