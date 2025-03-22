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

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost/SantosSneaker/backend/admin.php?action=listarUsuarios")
        .then(response => response.json())
        .then(data => {
            const tablaUsuarios = document.getElementById("tablaUsuarios");
            tablaUsuarios.innerHTML = "";

            data.usuarios.forEach(usuario => {
                const estadoIcono = usuario.rol === "admin" 
                    ? `<i class="fa-solid fa-circle status-icon" style="color: #E74C3C"></i>`  
                    : usuario.rol === "vendedor"
                    ? `<i class="fa-solid fa-circle status-icon" style="color: #F1C40F"></i>`  
                    : `<i class="fa-solid fa-circle status-icon" style="color: #2ECC71"></i>`;  

                const fila = `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.telefono}</td>
                        <td>${usuario.direccion}</td>
                        <td>${estadoIcono}</td>
                        <td>
                            <button class="editar-btn" data-id="${usuario.id}">Editar</button>
                            <button class="eliminar-btn" data-id="${usuario.id}">Eliminar</button>
                        </td>
                    </tr>
                `;
                tablaUsuarios.innerHTML += fila;
            });

            // Función para eliminar usuario
            document.querySelectorAll(".eliminar-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const userId = this.getAttribute("data-id");
                    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
                        fetch(`http://localhost/SantosSneaker/backend/admin.php?action=eliminarUsuario&id=${userId}`)
                            .then(response => response.json())
                            .then(data => {
                                alert(data.message);
                                location.reload();
                            })
                            .catch(error => console.error("Error al eliminar usuario:", error));
                    }
                });
            });
        })
        .catch(error => console.error("Error al obtener usuarios:", error));
});
// Mostrar el historial de registro
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost/SantosSneaker/backend/historial_registro.php?action=listarHistorial")
    .then(response => response.text())  // <-- Cambiar a .text() temporalmente para depurar
    .then(data => {
        console.log("Respuesta del servidor:", data);  // <-- Mostrar la respuesta completa

        // Convertir manualmente a JSON solo si es correcto
        try {
            const jsonData = JSON.parse(data);
            if (jsonData.historial.length === 0) {
                tablaHistorial.innerHTML = `<tr><td colspan="5">No hay registros en el historial</td></tr>`;
                return;
            }

            jsonData.historial.forEach(registro => {
                const fila = `
                    <tr>
                        <td>${registro.id}</td>
                        <td>${registro.vendedor}</td>
                        <td>${registro.producto}</td>
                        <td>${registro.cantidadAgregada}</td>
                        <td>${registro.fechaRegistro}</td>
                    </tr>
                `;
                tablaHistorial.innerHTML += fila;
            });
        } catch (error) {
            console.error("Error al convertir a JSON:", error);
        }
    })
    .catch(error => console.error("Error al obtener el historial:", error));
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



