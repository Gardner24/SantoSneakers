// Array para almacenar los productos
let productos = [];

// Función para agregar un producto al array
function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value.trim();
    const categoria = document.getElementById('categoriaProducto').value.trim();
    const precio = document.getElementById('precioProducto').value.trim();
    const tipo = document.getElementById('tipoProducto').value.trim();
    const cantidad = document.getElementById('cantidadProducto').value.trim();

    if (nombre && categoria && precio && tipo && cantidad) {
        productos.push({ nombre, categoria, precio, tipo, cantidad });
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: 'El producto se ha agregado correctamente.',
            confirmButtonText: 'Aceptar'
        });
        document.getElementById('productForm').reset(); // Limpiar el formulario
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Función para registrar todos los productos
function registrarProductos() {
    if (productos.length > 0) {
        // Simulación de envío al servidor (puedes reemplazar esto con tu lógica de fetch)
        fetch("http://localhost/SantosSneaker/backend/productos.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productos)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Productos registrados',
                    text: 'Los productos se han registrado exitosamente.',
                    confirmButtonText: 'Aceptar'
                });
                productos = []; // Limpiar el array después del registro
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `No se pudieron registrar los productos: ${data.message}`,
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(error => {
            console.error("Error al registrar productos:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al registrar los productos. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Aceptar'
            });
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Sin productos',
            text: 'No hay productos para registrar.',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Evento para agregar otro producto
document.getElementById('agregarOtroProducto').addEventListener('click', agregarProducto);

// Evento para registrar productos
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    registrarProductos();
});