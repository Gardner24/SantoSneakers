<?php
header("Access-Control-Allow-Origin: *");  // Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Permite enviar JSON

// Manejo de preflight request para que el navegador permita la petición
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
require_once "../Conexion/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'] ?? null;
$descripcion = $data['descripcion'] ?? null;
$precio = $data['precio'] ?? null;
$categoria = $data['categoria'] ?? null;
$cantidad = $data['cantidad'] ?? null;

if (!$nombre || !$descripcion || !$precio || !$categoria || !$cantidad) {
    echo json_encode(["success" => false, "message" => "Por favor, completa todos los campos."]);
    exit;
}

try {
    // Insertar en la tabla de productos
    $stmt = $pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nombre, $descripcion, $precio, $categoria]);

    // Obtener el ID del producto recién registrado
    $producto_id = $pdo->lastInsertId();

    // Insertar en la tabla de inventario
    $stmtInventario = $pdo->prepare("INSERT INTO inventario (producto_id, cantidad) VALUES (?, ?)");
    $stmtInventario->execute([$producto_id, $cantidad]);

    echo json_encode(["success" => true, "message" => "Producto registrado correctamente."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error al registrar el producto: " . $e->getMessage()]);
}
?>
