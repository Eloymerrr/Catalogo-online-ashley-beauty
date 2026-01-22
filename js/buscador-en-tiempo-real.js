function search() {
    // Obtener el valor del filtro y convertirlo a mayúsculas
    const filter = document.getElementById('find').value.toUpperCase();
    
    // Seleccionar todos los elementos con clase 'product'
    const items = document.querySelectorAll('.product');
    
    // Iterar sobre cada producto
    items.forEach(item => {
        // Buscar el elemento h3 dentro del producto
        const h3 = item.querySelector('h3');
        if (h3) {
            // Obtener el texto del h3 en mayúsculas
            const value = h3.textContent.toUpperCase();
            // Usar regex para coincidencia exacta de palabra completa (case-insensitive)
            const regex = new RegExp(`\\b${filter}\\b`, 'i');
            // Mostrar u ocultar el producto según si contiene la palabra exacta
            item.style.display = regex.test(value) ? '' : 'none';
        } else {
            // Si no hay h3, ocultar el producto
            item.style.display = 'none';
        }
    });

    // Contar los productos visibles después del filtro
    const visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
    const visibleCount = visibleItems.length;

    // Obtener el elemento del mensaje
    const resultMessage = document.getElementById('result-message');

    // Mostrar el mensaje solo si hay un filtro escrito (no vacío)
    if (filter !== '') {
        // Generar el mensaje basado en la cantidad de productos visibles y el filtro
        let message = '';
        if (visibleCount > 0) {
            message = `Se encontraron ${visibleCount} producto${visibleCount === 1 ? '' : 's'}"${filter.toLowerCase()}".`;
        } else {
            message = `No se encontraron productos  "${filter.toLowerCase()}".`;
        }

        // Mostrar el mensaje usando Bootstrap con animación suave
        resultMessage.innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    } else {
        // Si el filtro está vacío, ocultar el mensaje
        resultMessage.innerHTML = '';
    }
}