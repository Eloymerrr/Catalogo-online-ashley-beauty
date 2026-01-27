const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
    let counter = 0;
    const products = slider.querySelectorAll(".product");
    const btnLeft = slider.querySelector(".left");
    const btnRight = slider.querySelector(".right");

    function getVisibleItems() {
        // Calculamos cuántos productos caben en el contenedor actual
        const containerWidth = slider.querySelector(".container-products")?.offsetWidth || slider.offsetWidth;
        const itemWidth = products[0].offsetWidth + 15; // 15 es el gap/margin aproximado
        return Math.floor(containerWidth / itemWidth);
    }

    function scroll() {
        // Usamos el ancho real del primer producto para el movimiento
        const itemWidth = products[0].clientWidth + 20; // Ajusta el 20 al margen real (gap)
        products.forEach((item) => {
            item.style.transform = `translateX(-${counter * itemWidth}px)`;
        });
    }

    btnRight.addEventListener("click", () => {
        const visibleItems = getVisibleItems();
        // El límite ahora es el total menos los que ya se ven en pantalla
        const maxScroll = products.length - visibleItems;

        if (counter < maxScroll) {
            counter++;
        } else {
            counter = 0; // Reinicia al inicio
        }
        scroll();
    });

    btnLeft.addEventListener("click", () => {
        const visibleItems = getVisibleItems();
        const maxScroll = products.length - visibleItems;

        if (counter > 0) {
            counter--;
        } else {
            counter = maxScroll; // Salta al final correctamente
        }
        scroll();
    });

    // Resetear posición si cambian el tamaño de la pantalla (de horizontal a vertical)
    window.addEventListener("resize", () => {
        counter = 0;
        scroll();
    });
});