/* SELECCIÓN DE ELEMENTOS */
const previewContainer = document.querySelector('.products-preview');
const previewBoxes = previewContainer.querySelectorAll('.preview');
const productButtons = document.querySelectorAll('.products-container .product button');

/* LÓGICA DE APERTURA DEL MODAL */
productButtons.forEach(button => {
    button.onclick = () => {
        const eyeSpan = button.querySelector('.eye');
        if (!eyeSpan) return;
        
        const name = eyeSpan.getAttribute('data-name');
        
        previewContainer.classList.add('active');
        document.body.classList.add('no-scroll');
        
        previewBoxes.forEach(preview => {
            const target = preview.getAttribute('data-target');
            if (target === name) {
                preview.classList.add('active');
                const img = preview.querySelector('img');
                if(img) {
                    img.style.transform = "scale(1)";
                    img.style.transformOrigin = "center center";
                    img.dataset.scale = "1"; // Guardamos el estado de escala inicial
                }
            } else {
                preview.classList.remove('active');
            }
        });
    };
});

/* LÓGICA DE CIERRE Y ZOOM */
previewBoxes.forEach(preview => {
    const closeBtn = preview.querySelector('.fa-times');
    const img = preview.querySelector('img'); 
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            preview.classList.remove('active');
            previewContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
            if(img) resetZoom();
        };
    }

    if (img) {
        img.style.transition = "transform 0.1s ease-out"; 
        let currentScale = 1;

        const handleZoom = (clientX, clientY, newScale) => {
            const { left, top, width, height } = img.getBoundingClientRect();
            const x = ((clientX - left) / width) * 100;
            const y = ((clientY - top) / height) * 100;

            currentScale = newScale;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = `scale(${currentScale})`;
        };

        const resetZoom = () => {
            currentScale = 1;
            img.style.transformOrigin = "center center";
            img.style.transform = "scale(1)";
        };

        // --- EVENTO RUEDA DEL MOUSE (PC) ---
        img.addEventListener('wheel', (e) => {
            e.preventDefault(); // Evita que la página haga scroll
            
            // Determinamos la dirección del zoom
            // deltaY negativo = scroll arriba (zoom in), positivo = scroll abajo (zoom out)
            let delta = e.deltaY > 0 ? -0.2 : 0.2;
            let tempScale = currentScale + delta;

            // Limitamos el zoom entre 1x y 3x
            if (tempScale >= 1 && tempScale <= 3) {
                handleZoom(e.clientX, e.clientY, tempScale);
            } else if (tempScale < 1) {
                resetZoom();
            }
        }, { passive: false });

        // --- SEGUIMIENTO DE MOVIMIENTO (Opcional) ---
        // Esto hace que si ya hay zoom, la imagen se mueva siguiendo al cursor
        img.addEventListener('mousemove', (e) => {
            if (currentScale > 1) {
                handleZoom(e.clientX, e.clientY, currentScale);
            }
        });

        img.addEventListener('mouseleave', resetZoom);

        // --- EVENTOS TOUCH (MÓVIL) ---
        // Mantenemos el zoom táctil tal como estaba o lo activamos por defecto al tocar
        img.addEventListener('touchmove', (e) => {
            if(e.cancelable) e.preventDefault();
            handleZoom(e.touches[0].clientX, e.touches[0].clientY, 2);
        }, { passive: false });

        img.addEventListener('touchend', resetZoom);
    }
});

/* CERRAR AL CLICAR FUERA */
previewContainer.addEventListener('click', (e) => {
    if (e.target === previewContainer) {
        previewContainer.classList.remove('active');
        document.body.classList.remove('no-scroll');
        previewBoxes.forEach(box => {
            box.classList.remove('active');
            const img = box.querySelector('img');
            if(img) {
                img.style.transform = "scale(1)";
                img.style.transformOrigin = "center center";
            }
        });
    }
});