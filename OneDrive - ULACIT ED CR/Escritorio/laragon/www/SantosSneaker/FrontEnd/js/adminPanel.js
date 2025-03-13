// Registro de Vendedor
document.getElementById('vendedorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreVendedor').value.trim();
    const email = document.getElementById('emailVendedor').value.trim();
    const telefono = document.getElementById('telefonoVendedor').value.trim();
    const direccion = document.getElementById('direccionVendedor').value.trim();
    const rol = 'vendedor';

    fetch("http://localhost/SantosSneaker/backend/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, direccion, rol })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`¡Registro exitoso!\nContraseña Generada: ${data.password}`);
        } else {
            alert(`Error: ${data.message}`);
        }
    })
    .catch(error => console.error("Error al crear usuario:", error));
});

// Registro de Administrador
document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreAdmin').value.trim();
    const email = document.getElementById('emailAdmin').value.trim();
    const telefono = document.getElementById('telefonoAdmin').value.trim();
    const direccion = document.getElementById('direccionAdmin').value.trim();
    const rol = 'admin';

    fetch("http://localhost/SantosSneaker/backend/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, direccion, rol })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`¡Registro exitoso!\nContraseña Generada: ${data.password}`);
        } else {
            alert(`Error: ${data.message}`);
        }
    })
    .catch(error => console.error("Error al crear usuario:", error));
});

// Alternar entre paneles de registro
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});
