// Seleccionamos todos los contenedores de slider que existan en la página
const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
    let counter = 0;
    // Buscamos los productos y botones ESPECÍFICOS de este slider
    const products = slider.querySelectorAll(".product");
    const btnLeft = slider.querySelector(".left");
    const btnRight = slider.querySelector(".right");

    // Función para mover solo los productos de este slider
    function scroll() {
        products.forEach((item) => {
            // Ajustamos el valor 305 según el ancho de tu producto + margin
            item.style.transform = `translateX(-${counter * 305}px)`;
        });
    }

    // Evento Derecha
    btnRight.addEventListener("click", () => {
        // Lógica: No avanzar más allá del límite de productos
        // Ajusta el "3" dependiendo de cuántos productos quieres ver a la vez
        if (counter < products.length - 3) { 
            counter++;
        } else {
            counter = 0; // Reinicia al principio (opcional)
        }
        scroll();
    });

    // Evento Izquierda
    btnLeft.addEventListener("click", () => {
        if (counter > 0) {
            counter--;
        } else {
            counter = products.length - 3; // Va al final (opcional)
        }
        scroll();
    });
});