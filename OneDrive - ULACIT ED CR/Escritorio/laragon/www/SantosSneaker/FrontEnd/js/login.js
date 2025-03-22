document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    fetch("http://localhost/SantosSneaker/backend/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                text: "¡Bienvenido!",
                confirmButtonText: "Aceptar"
            }).then(() => {
                // Redirigir al rol correspondiente
                if (data.user.rol === "admin") {
                    window.location.href = "panelAdmin.html";
                } else if (data.user.rol === "vendedor") {
                    window.location.href = "panelVendedor.html";
                } else if (data.user.rol === "cliente") {
                    window.location.href = "menuPrincipal.html";  // Redirige aquí
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message,
                confirmButtonText: "Aceptar"
            });
        }
    })
    .catch(error => {
        console.error("Error en el inicio de sesión:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo conectar con el servidor.",
            confirmButtonText: "Aceptar"
        });
    });
});
