// Función para cargar usuarios desde el archivo JSON
const cargarUsuarios = async () => {
    try {
        const response = await fetch('/json/usuarios.json'); 
        if (!response.ok) {
            console.error(`Error ${response.status}: No se pudo cargar usuarios.json`);
            throw new Error('Error al cargar usuarios');
        }
        const data = await response.json();
        console.log("Usuarios cargados:", data);
        return data;
    } catch (error) {
        console.error('Error en cargarUsuarios:', error);
        throw error;
    }
};

// Función para validar el formato del correo
function esCorreoValido(correo) {
    const patronCorreo = /^e[0-9]{10}@live\.uleam\.edu\.ec$/;
    return patronCorreo.test(correo);
}

// Función para validar la seguridad de la contraseña
function validarContraseña(contraseña) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(contraseña);
}

// Función principal de validación de inicio de sesión
export async function validarInicioSesion(usuario, contraseña) {
    if (!esCorreoValido(usuario)) {
        return 'Por favor, ingrese un correo válido';
    }

    if (!validarContraseña(contraseña)) {
        return 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números';
    }

    try {
        const usuariosData = await cargarUsuarios(); 
        const usuarioEncontrado = usuariosData.usuarios.find(
            user => user.usuario === usuario && user.contraseña === contraseña
        );
        
        if (usuarioEncontrado) {
            return usuarioEncontrado.rol === 'admin'
                ? '/inicio-administrador'
                : '/inicio-estudiante';
        } else {
            return 'Usuario o contraseña incorrectos';
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        return 'Error al cargar usuarios. Por favor, inténtelo de nuevo más tarde.';
    }
}


