document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const password = document.getElementById('password').value;

    fetch("http://localhost/SantosSneaker/backend/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, direccion, password, rol: 'cliente' })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error al registrar usuario:", error));
});
