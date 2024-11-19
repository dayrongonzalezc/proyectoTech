 //DOM
 document.addEventListener('DOMContentLoaded',() =>{
    //Variables -base de datos
    const baseDeDatos=[
        {
            id: 1,
            nombre: "Jogger Hombre",
            descripcion: "Deportivo - casual",
            precio: 112000,
            categoria: "jogger",
            imagen: "assets/img/Nuevas/nvjogger1.jpeg"
        },
        {
            id: 2,
            nombre: "Leggins",
            descripcion: "Leggins Marrón de tiro alto",
            precio: 85000,
            categoria: "leggins",
            imagen: "assets/img/Nuevas/nvLeggins.jpg"
        },
        {
            id: 3,
            nombre: "Leggins",
            descripcion: "Leggins negro de tiro alto",
            precio: 110000,
            categoria: "leggins",
            imagen: "assets/img/Nuevas/nvLeggins2.jpg"
        },
        {
            id: 4,
            nombre: "Pantaloneta",
            descripcion: "Pantaloneta negra - hombres",
            precio: 45000,
            categoria: "shorts",
            imagen: "assets/img/Nuevas/nvShortH.png"
        },
        {
            id: 5,
            nombre: "Short Mujer",
            descripcion: "Short deportivo licrado",
            precio: 36000,
            categoria: "shorts",
            imagen: "assets/img/Nuevas/nvShotM.jpg"
        },
        {
    
            id: 6,
            nombre: "Camiseta Mujer",
            descripcion: "Camiseta sencilla Talla única",
            precio: 26000,
            categoria: "camisetas",
            imagen: "assets/img/Nuevas/nvCamisetaM.jpg"
        },
        {
            id: 7,
            nombre: "Camisilla Hombre",
            descripcion: "Camisilla negra en algodón",
            precio: 22000,
            categoria: "camisetas",
            imagen: "assets/img/Nuevas/nvCamisillaH.png"
        },
        {
            id: 8,
            nombre: "Camisilla Mujer",
            descripcion: "Camisilla blanca en algodón",
            precio: 25000,
            categoria: "camisetas",
            imagen: "assets/img/Nuevas/nvCamisilla.png"
        },
        {
            id: 9,
            nombre: "Camiseta Yamaha",
            descripcion: "Camiseta azul para hombres",
            precio: 50000,
            categoria: "camisetas",
            imagen: "assets/img/Productos/p1.camiseta.jpg" 
        },
        {
            id: 10,
            nombre: "Sudadera",
            descripcion: "Pantalón sudadera",
            precio: 60000,
            categoria: "sudadera",
            imagen: "assets/img/Productos/p2.sudadera.jpg"
        },
        {
            id: 11,
            nombre:"Pantaloneta Hombre",
            descripcion: "Pantaloneta negra semi impermeable",
            precio: 36000,
            categoria: "shorts",
            imagen: "assets/img/Productos/p3.short.jpg"
        }
  
    ];


    let carrito = [];
    const divisa = 'COP';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    const filtroSelect = document.getElementById("filtro");


//seccion de funciones 
/*
Dibujamos todos los productos a partir de la base de datos
*/
function renderizarProductos(){
    DOMitems.innerHTML = "";

    const filtro = filtroSelect.value;
    const productosFiltrados = baseDeDatos.filter(producto => 
        filtro === "todas" || producto.categoria === filtro
    );
    productosFiltrados.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4', 'col-md-4',);
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        
        const miNodoTitle = document.createElement('h6');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoDescripcion = document.createElement('h6');
        miNodoDescripcion.classList.add('card-descripcion');
        miNodoDescripcion.textContent = info.descripcion;
        
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio} ${divisa}`;
        
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Agregar';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anadirProductoAlCarrito);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoDescripcion);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

// Obtén el contador del almacenamiento local
let visitas = localStorage.getItem('contadorVisitas');
if(!visitas){
    visitas = 0;
}
visitas++;
localStorage.setItem('contadorVisitas', visitas);

document.getElementById('contador').textContent = visitas;
/**
* Evento para añadir un producto al carrito de la compra
*/
function anadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'));
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
    handleCarritoValue(carrito.length)
}

function handleCarritoValue(value) {
    const carritoContainer = document.getElementById("carrito-value");
    carritoContainer.textContent =  `${value}`;
}

//dibujar todos los productos guardados en el carrito
function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'fs-6');
        miNodo.textContent = `${numeroUnidadesItem}. ${miItem[0].nombre}...  ${miItem[0].precio}${divisa} `;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-2');
        miBoton.textContent = 'x';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
}
/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
// Obtenemos el producto ID que hay en el boton pulsado
const id = evento.target.dataset.item;
// Borramos todos los productos
carrito = carrito.filter((carritoId) => {
  return carritoId !== id;
});

// volvemos a renderizar
renderizarCarrito();
// Actualizamos el LocalStorage
guardarCarritoEnLocalStorage();

handleCarritoValue(carrito.length)
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    localStorage.clear();
}

function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        handleCarritoValue(carrito.length);
    }
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
filtroSelect.addEventListener('change', renderizarProductos);

// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();

});
