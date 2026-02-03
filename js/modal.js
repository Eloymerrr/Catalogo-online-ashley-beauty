const previewContainer = document.querySelector('.products-preview');
const previewBoxes = previewContainer.querySelectorAll('.preview');
const productButtons = document.querySelectorAll('.products-container .product button');

// Función única para cerrar todo
const closeAllPreviews = () => {
    previewContainer.classList.remove('active');
    document.body.classList.remove('no-scroll');
    previewBoxes.forEach(box => {
        box.classList.remove('active');
        const img = box.querySelector('img');
        if (img) resetZoom(img);
    });
};

const resetZoom = (img) => {
    img.style.transformOrigin = "center center";
    img.style.transform = "scale(1)";
    img.dataset.scale = "1";
};

/* LÓGICA DE APERTURA */
productButtons.forEach(button => {
    button.onclick = (e) => {
        e.stopPropagation(); // Evita conflictos
        const eyeSpan = button.querySelector('.eye');
        const name = eyeSpan ? eyeSpan.getAttribute('data-name') : null;
        if (!name) return;

        previewContainer.classList.add('active');
        document.body.classList.add('no-scroll');

        previewBoxes.forEach(preview => {
            if (preview.getAttribute('data-target') === name) {
                preview.classList.add('active');
            } else {
                preview.classList.remove('active');
            }
        });
    };
});

/* LÓGICA DE CADA MODAL (Zoom y Cierre) */
previewBoxes.forEach(preview => {
    const closeBtn = preview.querySelector('.fa-times');
    const img = preview.querySelector('img');

    if (closeBtn) closeBtn.onclick = closeAllPreviews;

    if (img) {
        let currentScale = 1;

        const handleZoom = (clientX, clientY, newScale) => {
            const { left, top, width, height } = img.getBoundingClientRect();
            const x = ((clientX - left) / width) * 100;
            const y = ((clientY - top) / height) * 100;
            currentScale = newScale;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = `scale(${currentScale})`;
        };

        img.addEventListener('wheel', (e) => {
            if (preview.classList.contains('active')) {
                e.preventDefault();
                let delta = e.deltaY > 0 ? -0.3 : 0.3;
                let tempScale = Math.min(Math.max(currentScale + delta, 1), 3);
                handleZoom(e.clientX, e.clientY, tempScale);
            }
        }, { passive: false });

        img.addEventListener('mousemove', (e) => {
            if (currentScale > 1) handleZoom(e.clientX, e.clientY, currentScale);
        });

        img.addEventListener('mouseleave', () => resetZoom(img));
        
        // Soporte Táctil Mejorado
        img.addEventListener('touchmove', (e) => {
            if(e.touches.length === 1) { // Solo un dedo
                handleZoom(e.touches[0].clientX, e.touches[0].clientY, 2);
            }
        }, { passive: true });

        img.addEventListener('touchend', () => resetZoom(img));
    }
});

/* CERRAR AL CLICAR FUERA (Overlay) */
previewContainer.addEventListener('click', (e) => {
    if (e.target === previewContainer) closeAllPreviews();
});