//BOTON HACIA ARRIBA//

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    // Usamos scrollY que es el estándar moderno
    if (window.scrollY > 200) { 
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});

// Opcional: Forzar el scroll suave al hacer clic desde JS
toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});