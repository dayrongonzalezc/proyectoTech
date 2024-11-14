// Precio fijo del producto
const productPrice = 80000;

// Función para actualizar la cantidad y el total
function updateQuantity(change) {
    const quantityInput = document.getElementById("quantity");
    let quantity = parseInt(quantityInput.value);

    // Actualiza la cantidad en función del botón presionado
    quantity += change;

    // Asegurarse de que la cantidad no sea menor que 1
    if (quantity < 1) {
        quantity = 1;
    }

    // Actualizar el valor del input de cantidad
    quantityInput.value = quantity;

    // Actualizar la cantidad en pantalla y el total
    document.getElementById("product-quantity").textContent = quantity;
    document.getElementById("total").textContent = `$${(quantity * productPrice).toLocaleString("es-CO")}`;
}

// Control del carrusel
// Selecciona el contenedor que contiene las tarjetas
const carousel = document.querySelector('.cards-wrapper');

// Función para mover el carrusel a la izquierda o derecha
function scrollCarousel(direction) {
    const cardWidth = document.querySelector('.card').offsetWidth;
    const scrollAmount = cardWidth * 4; // Desplazar por 4 tarjetas a la vez

    if (direction === 'next') {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (direction === 'prev') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Agrega los eventos de clic a los botones de control del carrusel
document.querySelector('.carousel-control-next').addEventListener('click', () => scrollCarousel('next'));
document.querySelector('.carousel-control-prev').addEventListener('click', () => scrollCarousel('prev'));
