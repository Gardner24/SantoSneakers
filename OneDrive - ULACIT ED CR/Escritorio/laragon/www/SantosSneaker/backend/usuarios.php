<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

// Validar que se reciban correctamente los datos
if (!$data) {
    echo json_encode(["message" => "Error: No se recibieron datos válidos"]);
    exit;
}

$nombre = $data['nombre'] ?? null;
$email = $data['email'] ?? null;
$telefono = $data['telefono'] ?? null;
$direccion = $data['direccion'] ?? null;
$rol = $data['rol'] ?? 'cliente';

// Validación de datos
if (!$nombre || !$email || !$rol) {
    echo json_encode(["message" => "Por favor, completa todos los campos"]);
    exit;
}

// Generar contraseña automáticamente para vendedores y administradores
if ($rol === 'vendedor' || $rol === 'admin') {
    $password = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);
} elseif ($rol === 'cliente') {
    $password = $data['password'] ?? null;
    
    if (!$password) {
        echo json_encode(["message" => "Por favor, ingrese una contraseña válida para el cliente"]);
        exit;
    }
} else {
    echo json_encode(["message" => "Rol no válido"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, telefono, direccion, password, rol) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $email, $telefono, $direccion, $password, $rol]);

    echo json_encode(["message" => "$rol registrado correctamente", "password" => $password]);
} catch (Exception $e) {
    echo json_encode(["message" => "Error al registrar usuario: " . $e->getMessage()]);
}
?>
