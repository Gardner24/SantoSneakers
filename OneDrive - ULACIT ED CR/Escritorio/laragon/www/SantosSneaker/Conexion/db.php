<?php
// Configuración de la conexión a la base de datos
$host = 'localhost';        // Host del servidor (usualmente localhost)
$dbname = 'santossneakers'; // Nombre de tu base de datos
$username = 'root';         // Usuario por defecto en Laragon
$password = '';             // Por defecto en Laragon, el password está vacío

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Manejo de errores
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); // Resultados en formato array asociativo
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}
?>
