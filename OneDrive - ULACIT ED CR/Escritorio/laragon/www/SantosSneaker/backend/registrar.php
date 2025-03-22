<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$nombre = trim($data['nombre'] ?? '');
$email = trim($data['email'] ?? '');
$telefono = trim($data['telefono'] ?? '');
$direccion = trim($data['direccion'] ?? '');
$password = trim($data['password'] ?? '');
$rol = trim($data['rol'] ?? 'cliente');


if (empty($nombre) || empty($email) || empty($telefono) || empty($direccion) || empty($password)) {
    echo json_encode(["message" => "Por favor, completa todos los campos"]);
    exit;
}

// Verificar si el correo ya existe
try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        echo json_encode(["message" => "El correo ya está registrado", "success" => false]);
        exit;
    }

    // nuevos usuarios
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, telefono, direccion, password, rol) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $email, $telefono, $direccion, $password, $rol]);

    echo json_encode(["message" => "Registro exitoso", "success" => true]);
} catch (Exception $e) {
    echo json_encode(["message" => "Error al registrar usuario: " . $e->getMessage()]);
}
?>
