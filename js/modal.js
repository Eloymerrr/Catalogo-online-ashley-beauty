const previewContainer = document.querySelector('.products-preview');
const previewBox = previewContainer.querySelectorAll('.preview');

// --- ABRIR MODAL ---
document.querySelectorAll('.products-container .product button').forEach(button => {
    const eyeSpan = button.querySelector('.eye');
    if (eyeSpan) {
        button.onclick = (e) => {
            e.stopPropagation();
            const name = eyeSpan.getAttribute('data-name');
            previewContainer.classList.add('active');
            document.body.classList.add('no-scroll');

            previewBox.forEach(preview => {
                if (preview.getAttribute('data-target') === name) {
                    preview.classList.add('active');
                } else {
                    preview.classList.remove('active');
                }
            });
        };
    }
});

// --- LÓGICA DE ZOOM PARA IMAGEN (PC Y MÓVIL) ---
previewBox.forEach(preview => {
    const img = preview.querySelector('img');
    const closeBtn = preview.querySelector('.fa-times');

    if (img) {
        // Función unificada para manejar la posición
        const handleZoom = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const { left, top, width, height } = img.getBoundingClientRect();
            const x = ((clientX - left) / width) * 100;
            const y = ((clientY - top) / height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = "scale(2.5)";
        };

        const resetZoom = () => {
            img.style.transform = "scale(1)";
            img.style.transformOrigin = "center center";
        };

        // Eventos Mouse (PC)
        img.addEventListener('mousemove', handleZoom);
        img.addEventListener('mouseleave', resetZoom);

        // Eventos Touch (Móvil)
        img.addEventListener('touchmove', (e) => {
            if (e.cancelable) e.preventDefault(); // Evita scroll mientras haces zoom
            handleZoom(e);
        }, { passive: false });

        img.addEventListener('touchend', resetZoom);
    }

    // --- CERRAR MODAL ---
    if (closeBtn) {
        closeBtn.onclick = () => {
            preview.classList.remove('active');
            previewContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };
    }
});