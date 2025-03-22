<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

try {
    $stmt = $pdo->query("SELECT id, nombre FROM productos");
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "productos" => $productos]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error al obtener productos: " . $e->getMessage()]);
}
?>
