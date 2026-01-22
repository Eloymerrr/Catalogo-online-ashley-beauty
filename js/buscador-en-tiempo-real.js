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
            // Mostrar u ocultar el producto según si contiene el filtro
            item.style.display = value.includes(filter) ? '' : 'none';
        } else {
            // Si no hay h3, ocultar el producto (puedes ajustar este comportamiento)
            item.style.display = 'none';
        }
    });
}
