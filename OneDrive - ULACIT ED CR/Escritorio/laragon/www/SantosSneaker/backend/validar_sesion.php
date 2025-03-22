<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Correo y contraseña son obligatorios"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if ($password === $user['password']) {
            $redirect = ($user['rol'] === 'admin') 
                        ? "panelAdmin.html" 
                        : (($user['rol'] === 'vendedor') ? "panelVendedor.html" : "menuPrincipal.html");

            echo json_encode([
                "success" => true,
                "message" => "Inicio de sesión exitoso",
                "user" => $user,
                "redirect" => $redirect
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Correo o contraseña incorrectos"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error en el inicio de sesión: " . $e->getMessage()]);
}
?>
