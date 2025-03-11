<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$email || !$password) {
    echo json_encode(["message" => "Correo y contraseña son obligatorios"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ? AND password = ?");
    $stmt->execute([$email, $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["message" => "Inicio de sesión exitoso", "user" => $user]);
    } else {
        echo json_encode(["message" => "Correo o contraseña incorrectos"]);
    }
} catch (Exception $e) {
    echo json_encode(["message" => "Error en el inicio de sesión: " . $e->getMessage()]);
}
?>
