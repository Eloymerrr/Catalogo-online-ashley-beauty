const previewContainer = document.querySelector('.products-preview');
const previewBox = previewContainer.querySelectorAll('.preview');

previewBox.forEach(preview => {
    const img = preview.querySelector('.main-img') || preview.querySelector('img:not([src*="whatsapp"])');
    const closeBtn = preview.querySelector('.fa-times');
    const btnNext = preview.querySelector('.next');
    const btnPrev = preview.querySelector('.prev');
    
    let scale = 1;
    const minScale = 1;
    const maxScale = 5;

    // --- LÓGICA DE GALERÍA ---
    if (img && img.dataset.images) {
        const images = img.dataset.images.split(',').map(s => s.trim());
        let currentIndex = 0;

        if (images.length <= 1) {
            btnNext?.classList.add('hidden');
            btnPrev?.classList.add('hidden');
        }

        const updateImage = (index) => {
            currentIndex = (index + images.length) % images.length; // Ciclo infinito simplificado
            img.src = images[currentIndex];
            scale = 1; 
            img.style.transform = "scale(1)";
        };

        if(btnNext) btnNext.onclick = (e) => { e.stopPropagation(); updateImage(currentIndex + 1); };
        if(btnPrev) btnPrev.onclick = (e) => { e.stopPropagation(); updateImage(currentIndex - 1); };

        // --- SOPORTE SWIPE (DESLIZAR) ---
        let touchStartX = 0;
        let touchEndX = 0;

        preview.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        preview.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeDistance = touchEndX - touchStartX;
            if (scale === 1) { // Solo cambiar imagen si no hay zoom activo
                if (swipeDistance < -50) updateImage(currentIndex + 1); // Deslizar a la izquierda
                if (swipeDistance > 50) updateImage(currentIndex - 1);  // Deslizar a la derecha
            }
        };
    }

    // --- LÓGICA DE ZOOM ---
    const updateTransform = (e) => {
        if (!img) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = ((clientX - left) / width) * 100;
        const y = ((clientY - top) / height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = `scale(${scale})`;
    };

    if (img) {
        img.style.transition = "transform 0.1s ease-out";

        // Zoom con Rueda (Desktop)
        preview.addEventListener('wheel', (e) => {
            if (preview.classList.contains('active')) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.2 : 0.2;
                scale = Math.min(Math.max(scale + delta, minScale), maxScale);
                updateTransform(e);
            }
        }, { passive: false });

        img.addEventListener('mousemove', (e) => { 
            if (scale > 1) updateTransform(e); 
        });
        
        preview.addEventListener('mouseleave', () => {
            scale = 1;
            img.style.transform = "scale(1)";
        });

        // Zoom Táctil (Doble Tap o toque largo)
        img.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) e.preventDefault(); // Prevenir zoom nativo del navegador
        }, { passive: false });
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            scale = 1;
            if(img) img.style.transform = "scale(1)";
            preview.classList.remove('active');
            previewContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };
    }
});

// Apertura de modal (Sin cambios, corregido el toggle)
document.querySelectorAll('.products-container .product button').forEach(button => {
    button.onclick = () => {
        const eyeSpan = button.querySelector('.eye');
        if (!eyeSpan) return;
        const name = eyeSpan.getAttribute('data-name');
        previewContainer.classList.add('active');
        document.body.classList.add('no-scroll');
        previewBox.forEach(preview => {
            preview.classList.toggle('active', preview.getAttribute('data-target') === name);
        });
    };
});