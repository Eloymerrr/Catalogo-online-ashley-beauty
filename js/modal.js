const previewContainer = document.querySelector('.products-preview');
const previewBox = previewContainer.querySelectorAll('.preview');

previewBox.forEach(preview => {
    // Buscamos la imagen: ya sea por clase .main-img o la primera img que encuentre
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
            currentIndex = index;
            if (currentIndex < 0) currentIndex = images.length - 1;
            if (currentIndex >= images.length) currentIndex = 0;
            img.src = images[currentIndex];
            scale = 1; 
            img.style.transform = "scale(1)";
        };

        if(btnNext) btnNext.onclick = (e) => { e.stopPropagation(); updateImage(currentIndex + 1); };
        if(btnPrev) btnPrev.onclick = (e) => { e.stopPropagation(); updateImage(currentIndex - 1); };
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
        // Aseguramos que la imagen tenga transición suave y la clase necesaria si no la tiene
        img.style.transition = "transform 0.1s ease-out";

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

        // Soporte Táctil
        img.addEventListener('touchmove', (e) => {
            if (scale > 1) e.preventDefault(); 
            scale = 2; 
            updateTransform(e);
        }, { passive: false });

        img.addEventListener('touchend', () => {
            scale = 1;
            img.style.transform = "scale(1)";
        });
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

// Apertura de modal
document.querySelectorAll('.products-container .product button').forEach(button => {
    const eyeSpan = button.querySelector('.eye');
    if (eyeSpan) {
        button.onclick = () => {
            const name = eyeSpan.getAttribute('data-name');
            previewContainer.classList.add('active');
            document.body.classList.add('no-scroll');
            previewBox.forEach(preview => {
                preview.classList.toggle('active', preview.getAttribute('data-target') === name);
            });
        };
    }
});