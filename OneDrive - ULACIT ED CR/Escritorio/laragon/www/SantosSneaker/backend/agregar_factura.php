<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$idProducto = $data['idProducto'] ?? null;
$cantidad = $data['cantidad'] ?? null;
$metodoPago = $data['metodoPago'] ?? null;
$idUsuario = $data['idUsuario'] ?? null; 

if (!$idProducto || !$cantidad || !$metodoPago) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

try {
    // Verificar si el producto existe y tiene inventario suficiente
    $stmt = $pdo->prepare("SELECT cantidad, precio FROM inventario INNER JOIN productos ON inventario.producto_id = productos.id WHERE inventario.producto_id = ?");
    $stmt->execute([$idProducto]);
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$producto) {
        echo json_encode(["success" => false, "message" => "El producto no existe."]);
        exit;
    }

    if ($producto['cantidad'] < $cantidad) {
        echo json_encode(["success" => false, "message" => "Inventario insuficiente"]);
        exit;
    }

    // Calcular el total
    $total = $producto['precio'] * $cantidad;

    // Registrar la factura
    $stmt = $pdo->prepare("INSERT INTO facturas (total, fecha, metodo_pago, idUsuario) VALUES (?, NOW(), ?, ?)");
    $stmt->execute([$total, $metodoPago, $idUsuario]);
    $facturaId = $pdo->lastInsertId();

    // Registrar el detalle de la factura
    $stmt = $pdo->prepare("INSERT INTO detalle_factura (factura_id, producto_id, cantidad) VALUES (?, ?, ?)");
    $stmt->execute([$facturaId, $idProducto, $cantidad]);

    // Actualizar el inventario
    $stmt = $pdo->prepare("UPDATE inventario SET cantidad = cantidad - ? WHERE producto_id = ?");
    $stmt->execute([$cantidad, $idProducto]);

    echo json_encode(["success" => true, "message" => "Factura generada correctamente", "factura_id" => $facturaId]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error inesperado: " . $e->getMessage()]);
}
?>
