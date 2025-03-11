<?php
session_start();

// Verificar si hay una sesión activa
if (!isset($_SESSION['usuario'])) {
    header("Location: login.html");
    exit();
}

// Redirigir según el rol del usuario
if ($_SESSION['usuario']['rol'] === 'cliente') {
    header("Location: index.php");
} elseif ($_SESSION['usuario']['rol'] === 'vendedor') {
    header("Location: panelVendedor.html");
} elseif ($_SESSION['usuario']['rol'] === 'admin') {
    header("Location: panelAdmin.html");
}
?>
