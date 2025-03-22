// Array para almacenar los productos temporalmente
let productos = [];

// Función para agregar un producto al array
function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const precio = document.getElementById('precioProducto').value.trim();
    const categoria = document.getElementById('categoriaProducto').value;
    const cantidad = document.getElementById('cantidadProducto').value.trim();

    if (nombre && descripcion && precio && categoria && cantidad) {
        productos.push({ nombre, descripcion, precio, categoria, cantidad });
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

async function cargarCategorias() {
    try {
        console.log("Iniciando la carga de categorías...");

        const response = await fetch("http://localhost/SantosSneaker/backend/categorias.php?action=listarCategorias");
        const data = await response.json();

        console.log("Datos recibidos del backend:", data);  // <- Mostrar el JSON recibido

        const selectCategoria = document.getElementById('categoriaProducto');
        selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';

        if (data.categorias && data.categorias.length > 0) {
            data.categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                selectCategoria.appendChild(option);
            });

            console.log("Categorías cargadas correctamente.");
        } else {
            console.error("No se encontraron categorías.");
        }
    } catch (error) {
        console.error("Error al obtener categorías:", error);
    }
}


// Cargar categorías al iniciar
window.onload = cargarCategorias;


// Registro del producto
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const precio = document.getElementById('precioProducto').value.trim();
    const categoria = document.getElementById('categoriaProducto').value.trim();  // Obtiene el ID de la categoría
    const cantidad = document.getElementById('cantidadProducto').value.trim();

    if (nombre && descripcion && precio && categoria && cantidad) {
        fetch("http://localhost/SantosSneaker/backend/productos.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion, precio, categoria, cantidad })
        })
        .then(response => {
            // Depurar para ver la respuesta cruda del servidor
            console.log("Respuesta cruda del servidor:", response);

            // Verificar si la respuesta es válida y se puede convertir a JSON
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    throw new Error(`Error al convertir la respuesta en JSON: ${text}`);
                }
            });
        })
        .then(data => {
            console.log("Respuesta JSON del servidor:", data);  // <-- Verifica la respuesta en la consola

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "¡Producto registrado correctamente!",
                    confirmButtonText: "OK"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "No se pudo registrar el producto.",
                    confirmButtonText: "OK"
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al comunicarse con el servidor.",
                confirmButtonText: "OK"
            });
            console.error("Error al registrar producto:", error);
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor, completa todos los campos antes de continuar.",
            confirmButtonText: "OK"
        });
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    Swal.fire({
        title: "¿Seguro que deseas cerrar sesión?",
        text: "Serás redirigido al login.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF4C4C",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, cerrar sesión"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "login.html"; 
        }
    });
});
