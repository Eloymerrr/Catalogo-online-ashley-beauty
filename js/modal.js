// Seleccionar elementos principales
const previewContainer = document.querySelector('.products-preview');
const previewBox = previewContainer.querySelectorAll('.preview');

// Seleccionamos todos los botones de "ojo" directamente
document.querySelectorAll('.products-container .product .eye').forEach(eyeButton => {
    
    eyeButton.onclick = (e) => {
        // Evitamos que el clic se propague a otros elementos (por si acaso)
        e.stopPropagation();

        // 1. Activar el contenedor principal
        previewContainer.classList.add('active');
        document.body.classList.add('no-scroll');

        // 2. Obtener el nombre del producto desde el data-name del ojo
        let name = eyeButton.getAttribute('data-name');

        // 3. Mostrar el modal específico que coincida con el data-target
        previewBox.forEach(preview => {
            let target = preview.getAttribute('data-target');
            if (name === target) {
                preview.classList.add('active');
            } else {
                preview.classList.remove('active'); // Limpiar otros por seguridad
            }
        });
    };
});

// Lógica para cerrar el modal
previewBox.forEach(close => {
    const closeBtn = close.querySelector('.fa-times');
    if (closeBtn) {
        closeBtn.onclick = () => {
            close.classList.remove('active');
            previewContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };
    }
});

// Cerrar al hacer clic fuera del contenido (en el overlay)
previewContainer.onclick = (e) => {
    if (e.target === previewContainer) {
        previewContainer.classList.remove('active');
        previewBox.forEach(preview => preview.classList.remove('active'));
        document.body.classList.remove('no-scroll');
    }
};

