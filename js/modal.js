// Seleccionar elementos
let previewContainer = document.querySelector('.products-preview'); // Corregido: 'previewContainer'
let previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product').forEach(product => { // Cambiado a '.product' según tu HTML
  product.onclick = () => {
    previewContainer.classList.add('active'); // Usar clase para activar el modal
    document.body.classList.add('no-scroll'); // Bloquear scroll del body
    let eyeButton = product.querySelector('.eye'); // Buscar el botón del ojo dentro de la tarjeta
    if (eyeButton) {
      let name = eyeButton.getAttribute('data-name'); // Obtener data-name del ojo
      previewBox.forEach(preview => {
        let target = preview.getAttribute('data-target');
        if (name == target) {
          preview.classList.add('active');
        }
      });
    }
  };
});

previewBox.forEach(close => {
  close.querySelector('.fa-times').onclick = () => {
    close.classList.remove('active');
    previewContainer.classList.remove('active'); // Usar clase para cerrar
    document.body.classList.remove('no-scroll'); // Restaurar scroll del body
  };
});

// Opcional: Cerrar al hacer clic fuera del modal
previewContainer.addEventListener('click', (e) => {
  if (e.target === previewContainer) {
    previewContainer.classList.remove('active');
    previewBox.forEach(preview => preview.classList.remove('active'));
    document.body.classList.remove('no-scroll'); // Restaurar scroll del body
  }
});

// Opcional: Evitar que el clic en el botón de favorito abra el modal
document.querySelectorAll('.favorite').forEach(fav => {
  fav.onclick = (e) => {
    e.stopPropagation(); // Evita que el clic en favorito abra el modal
    // Aquí puedes agregar lógica para el favorito (e.g., toggle de clase)
  };
});