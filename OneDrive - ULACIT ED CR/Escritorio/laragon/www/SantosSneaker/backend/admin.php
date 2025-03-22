<?php
require_once "../Conexion/db.php";

header("Content-Type: application/json");

// Verificar si 'action' está definido
if (!isset($_GET['action'])) {
    echo json_encode(["message" => "Acción no especificada"]);
    exit;
}

// Obtener usuarios para el panel de administración
if ($_GET['action'] === 'listarUsuarios') {
    try {
        $stmt = $pdo->query("SELECT id, nombre, email, telefono, direccion, rol FROM usuarios");
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Verifica los datos en el log para depuración
        file_put_contents("log_datos.txt", print_r($usuarios, true));

        echo json_encode(["usuarios" => $usuarios]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Error al obtener usuarios: " . $e->getMessage()]);
    }
}

// Eliminar usuario desde el panel de administración
if ($_GET['action'] === 'eliminarUsuario' && isset($_GET['id'])) {
    $id = intval($_GET['id']);

    try {
        $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Usuario eliminado correctamente"]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Error al eliminar usuario: " . $e->getMessage()]);
    }
}

// Editar usuario desde el panel de administración
if ($_GET['action'] === 'editarUsuario' && isset($_POST['id'])) {
    $id = intval($_POST['id']);
    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $telefono = trim($_POST['telefono']);
    $direccion = trim($_POST['direccion']);
    $rol = trim($_POST['rol']);

    if (empty($nombre) || empty($email) || empty($telefono) || empty($direccion) || empty($rol)) {
        echo json_encode(["message" => "Por favor, completa todos los campos"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, direccion = ?, rol = ? WHERE id = ?");
        $stmt->execute([$nombre, $email, $telefono, $direccion, $rol, $id]);
        echo json_encode(["message" => "Usuario actualizado correctamente"]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Error al actualizar usuario: " . $e->getMessage()]);
    }
}
?>
