document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!nombre || !email || !telefono || !direccion || !password) {
        mostrarMensaje("Por favor, completa todos los campos", "error");
        return;
    }

    fetch("http://localhost/SantosSneaker/backend/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, direccion, password, rol: 'cliente' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensaje("Registro exitoso. Redirigiendo al login...", "success");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);  
        } else {
            mostrarMensaje(data.message, "error");
        }
    })
    .catch(error => mostrarMensaje("Error al registrar usuario: " + error, "error"));
});

// Función para mostrar mensajes personalizados
function mostrarMensaje(mensaje, tipo) {
    const mensajeContainer = document.createElement('div');
    mensajeContainer.className = `mensaje ${tipo}`;
    mensajeContainer.innerText = mensaje;

    document.body.appendChild(mensajeContainer);

    setTimeout(() => {
        mensajeContainer.remove();
    }, 4000); 
}

