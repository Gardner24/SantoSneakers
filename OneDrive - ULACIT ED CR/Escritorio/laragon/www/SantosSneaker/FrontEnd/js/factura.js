// Obtener productos al cargar la página
async function cargarProductos() {
    try {
        const response = await fetch("http://localhost/SantosSneaker/backend/obtener_productos.php");
        const data = await response.json();

        const selectProducto = document.getElementById('idProducto');
        selectProducto.innerHTML = '<option value="">Seleccione un producto</option>';

        if (data.success && data.productos.length > 0) {
            data.productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                selectProducto.appendChild(option);
            });
        } else {
            console.error("No se encontraron productos.");
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// Generar factura
document.getElementById('facturaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const idProducto = document.getElementById('idProducto').value;
    const cantidad = document.getElementById('cantidad').value;
    const metodoPago = document.getElementById('metodoPago').value;
    const idUsuario = 1;  

    if (!idProducto || !cantidad || !metodoPago) {
        Swal.fire("Error", "Por favor, completa todos los campos.", "error");
        return;
    }

    fetch("http://localhost/SantosSneaker/backend/agregar_factura.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idProducto, cantidad, metodoPago, idUsuario })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor.");
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            Swal.fire("Éxito", "Factura generada correctamente.", "success");
        } else {
            Swal.fire("Error", data.message, "error");
        }
    })
    .catch(error => {
        console.error("Error al generar la factura:", error);
        Swal.fire("Error", "Hubo un problema al generar la factura.", "error");
    });
});


window.onload = cargarProductos;
