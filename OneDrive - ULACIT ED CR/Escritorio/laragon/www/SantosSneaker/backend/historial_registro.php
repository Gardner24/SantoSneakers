<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar si la conexión PDO está bien definida
if (!isset($pdo)) {
    echo json_encode(["error" => "Error en la conexión a la base de datos"]);
    exit();
}

// Obtener el historial de registros
if (isset($_GET['action']) && $_GET['action'] === 'listarHistorial') {
    try {
        $sql = "SELECT hr.id, u.nombre AS vendedor, p.nombre AS producto, 
                       hr.cantidadAgregada, hr.fechaRegistro
                FROM historialregistro hr
                JOIN usuarios u ON hr.idUsuario = u.id
                JOIN productos p ON hr.idProducto = p.id
                ORDER BY hr.fechaRegistro DESC";

        $stmt = $pdo->query($sql); // Cambiado a PDO
        $historial = $stmt->fetchAll();

        echo json_encode(["historial" => $historial]);
        exit();

    } catch (PDOException $e) {
        echo json_encode(["error" => "Error en la consulta SQL: " . $e->getMessage()]);
        exit();
    }
}
?>
