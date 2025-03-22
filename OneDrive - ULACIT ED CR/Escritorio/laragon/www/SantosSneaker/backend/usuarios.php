<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

// Para limpiar las salidas
ob_clean();
ob_start();


$data = json_decode(file_get_contents("php://input"), true);

file_put_contents("log_datos.txt", print_r($data, true)); // Verificacion de datos en archivo loog_datos.txt

// Logiin
if (isset($data['email']) && isset($data['password']) && !isset($data['nombre'])) {
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (empty($email) || empty($password)) {
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
            exit;
        } else {
            echo json_encode(["message" => "Contraseña incorrecta"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["message" => "Error en el inicio de sesión: " . $e->getMessage()]);
        exit;
    }
}

// register
$nombre = trim($data['nombre'] ?? '');
$email = trim($data['email'] ?? '');
$telefono = trim($data['telefono'] ?? '');
$direccion = trim($data['direccion'] ?? '');
$password = trim($data['password'] ?? '');
$rol = trim($data['rol'] ?? 'cliente');


if (empty($nombre) || empty($email) || empty($telefono) || empty($direccion)) {
    echo json_encode(["message" => "Por favor, completa todos los campos"]);
    exit;
}

// Restriccion verifica si el correo ya existe
try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        echo json_encode(["message" => "El correo ya está registrado", "success" => false]);
        exit;
    }

    // Generar contraseña automática para administradores y vendedores
    if ($rol === 'vendedor' || $rol === 'admin') {
        $password = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);
    }

    // Insertar nuevo usuario
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, telefono, direccion, password, rol) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $email, $telefono, $direccion, $password, $rol]);

    echo json_encode([
        "message" => "Registro exitoso",
        "password" => $password, // Mostrar contraseña generada para admins y vendedores
        "success" => true
    ]);
} catch (Exception $e) {
    echo json_encode([
        "message" => "Error al registrar usuario: " . $e->getMessage(),
        "success" => false
    ]);
}
?>
