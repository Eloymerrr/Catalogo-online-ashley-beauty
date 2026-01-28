const previewContainer = document.querySelector('.products-preview');
const previewBox = previewContainer.querySelectorAll('.preview');

previewBox.forEach(preview => {
    const img = preview.querySelector('img');
    const closeBtn = preview.querySelector('.fa-times');
    
    // Variables de estado para el zoom
    let scale = 1;
    const minScale = 1;
    const maxScale = 5; // Límite máximo de zoom

    if (img) {
        // --- FUNCIÓN PARA POSICIÓN DEL ZOOM ---
        const updateTransform = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const { left, top, width, height } = img.getBoundingClientRect();
            const x = ((clientX - left) / width) * 100;
            const y = ((clientY - top) / height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = `scale(${scale})`;
        };

        // --- ZOOM CON RUEDA DEL MOUSE (SCROLL) ---
        preview.addEventListener('wheel', (e) => {
            e.preventDefault(); // Evita que la página haga scroll

            // Determinamos la dirección del scroll
            // deltaY negativo = scroll arriba, deltaY positivo = scroll abajo
            const delta = e.deltaY > 0 ? -0.2 : 0.2;
            
            // Actualizamos el nivel de scale manteniéndolo entre los límites
            scale = Math.min(Math.max(scale + delta, minScale), maxScale);

            updateTransform(e);
        }, { passive: false });

        // --- MOVIMIENTO DEL MOUSE ---
        img.addEventListener('mousemove', (e) => {
            if (scale > 1) updateTransform(e);
        });

        // --- RESET AL SALIR ---
        preview.addEventListener('mouseleave', () => {
            scale = 1;
            img.style.transform = "scale(1)";
            img.style.transformOrigin = "center center";
        });

        // --- SOPORTE MÓVIL (Touch) ---
        img.addEventListener('touchmove', (e) => {
            if (e.cancelable) e.preventDefault();
            scale = 2.5; // Zoom fijo al tocar en móvil
            updateTransform(e);
        }, { passive: false });

        img.addEventListener('touchend', () => {
            scale = 1;
            img.style.transform = "scale(1)";
        });
    }

    // --- CERRAR MODAL ---
    if (closeBtn) {
        closeBtn.onclick = () => {
            scale = 1;
            img.style.transform = "scale(1)";
            preview.classList.remove('active');
            previewContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };
    }
});

// Lógica de apertura (Mantenla igual que la tenías)
document.querySelectorAll('.products-container .product button').forEach(button => {
    const eyeSpan = button.querySelector('.eye');
    if (eyeSpan) {
        button.onclick = (e) => {
            const name = eyeSpan.getAttribute('data-name');
            previewContainer.classList.add('active');
            document.body.classList.add('no-scroll');
            previewBox.forEach(preview => {
                preview.classList.toggle('active', preview.getAttribute('data-target') === name);
            });
        };
    }
});