<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$email || !$password) {
    echo json_encode(["message" => "Por favor, completa todos los campos"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["message" => "Usuario no encontrado"]);
        exit;
    }

    // Comparar la contraseña
    if ($password === $user['password']) {
        echo json_encode([
            "message" => "Inicio de sesión exitoso",
            "user" => [
                "nombre" => $user['nombre'],
                "telefono" => $user['telefono'],
                "direccion" => $user['direccion'],
                "rol" => $user['rol']
            ]
        ]);
    } else {
        echo json_encode(["message" => "Contraseña incorrecta"]);
    }
} catch (Exception $e) {
    echo json_encode(["message" => "Error en el inicio de sesión: " . $e->getMessage()]);
}
?>
