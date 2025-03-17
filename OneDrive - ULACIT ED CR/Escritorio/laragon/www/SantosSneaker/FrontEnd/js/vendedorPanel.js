
let productos = [];


function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value.trim();
    const categoria = document.getElementById('categoriaProducto').value.trim();
    const precio = document.getElementById('precioProducto').value.trim();
    const tipo = document.getElementById('tipoProducto').value.trim();
    const cantidad = document.getElementById('cantidadProducto').value.trim();

    if (nombre && categoria && precio && tipo && cantidad) {
        productos.push({ nombre, categoria, precio, tipo, cantidad });
        document.getElementById('productForm').reset(); 
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: 'El producto se ha agregado correctamente. ¿Deseas agregar otro producto?',
            showCancelButton: true,
            confirmButtonText: 'Sí, agregar otro',
            cancelButtonText: 'No, registrar productos',
        }).then((result) => {
            if (result.isConfirmed) {
                
            } else {
                //  (no hace nada)
                Swal.fire({
                    icon: 'info',
                    title: 'Productos no registrados',
                    text: 'Los productos no se han enviado al servidor.',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
            confirmButtonText: 'Aceptar'
        });
    }
}


document.getElementById('agregarOtroProducto').addEventListener('click', agregarProducto);