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
        }, 400);
    });
});