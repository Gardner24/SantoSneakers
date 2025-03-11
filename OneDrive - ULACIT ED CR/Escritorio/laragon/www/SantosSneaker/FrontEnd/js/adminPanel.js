document.getElementById('crearUsuarioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreCompleto = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const rol = document.getElementById('rol').value;

    // Generar nombre de usuario desde el correo
    const nombreUsuario = generarNombreUsuario(email);

    fetch("http://localhost/SantosSneaker/backend/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            nombre: nombreUsuario, 
            nombreCompleto, 
            email, 
            telefono, 
            direccion, 
            rol 
        })
    })
    .then(response => response.json())
    .then(data => alert(data.message + "\nContraseña Generada: " + data.password))
    .catch(error => console.error("Error al crear usuario:", error));
});

// Función para generar el nombre de usuario
function generarNombreUsuario(email) {
    const partes = email.split('@')[0].split('.');
    if (partes.length === 2) {
        return partes[0][0] + partes[1]; // Primera letra + apellido
    } else {
        return partes[0].substring(0, 6); // Si el formato no es correcto, usar primeros 6 caracteres
    }
}