document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert("Por favor, completa todos los campos");
        return;
    }

    fetch("http://localhost/SantosSneaker/backend/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.text())  
    .then(text => {
        console.log("Respuesta completa del servidor:", text); 
        try {
            const data = JSON.parse(text);
            if (data.message === "Inicio de sesión exitoso") {
                alert("Bienvenido, " + data.user.nombre);
                if (data.user.rol === "admin") {
                    window.location.href = "panelAdmin.html";
                } else if (data.user.rol === "vendedor") {
                    window.location.href = "panelVendedor.html";
                } else {
                    window.location.href = "index.php";
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error al analizar JSON:", error);
        }
    })
    .catch(error => console.error("Error en el inicio de sesión:", error));
     
});
