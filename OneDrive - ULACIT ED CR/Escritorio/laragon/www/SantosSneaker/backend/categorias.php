<?php
// No permitia recibir solicitudes
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



require_once "../Conexion/db.php";
header("Content-Type: application/json");

if ($_GET['action'] === 'listarCategorias') {
    try {
        $stmt = $pdo->query("SELECT id, nombre FROM categorias");
        $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["categorias" => $categorias]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Error al obtener categorías: " . $e->getMessage()]);
    }
}
?>
