// Ejercicio 3 : Proceso de Verificación de Usuario con Callbacks
// Objetivo: Escribir una serie de funciones que simulan la verificación de un usuario en un sistema. Este proceso involucra tres pasos:
// verificar si el usuario existe, comprobar si la cuenta del usuario está activa, y finalmente, verificar si el usuario tiene permisos 
//de acceso a un recurso específico.
// Descripción del Proceso:
// <b>Verificar Usuario:</b> Simula la búsqueda de un usuario en la base de datos.
// <b>Comprobar Cuenta Activa:</b> Verifica si la cuenta del usuario está activa.
// <b>Verificar Permisos:</b> Comprueba si el usuario tiene permisos para acceder a un recurso.
// Cada paso se simulará con una función que utiliza setTimeout para emular la asincronía, y cada función aceptará un 
//callback para manejar el resultado de la operación.
// Explicación:
// El proceso comienza con la verificación de la existencia del usuario. Si el usuario no existe, el proceso termina.
// Si el usuario existe, se procede a verificar si su cuenta está activa. Si la cuenta no está activa, el proceso termina.
// Finalmente, si la cuenta está activa, se verifica si el usuario tiene permisos. Dependiendo del resultado, se concede o deniega el acceso.


function verificarUsuario(usuario, callback) {
    setTimeout(() => {
        const usuariosRegistrados = ['Ana', 'Luis'];
        const usuarioExiste = usuariosRegistrados.includes(usuario);
        callback(usuarioExiste);
    }, 1000);
}

function comprobarCuentaActiva(usuario, callback) {
    setTimeout(() => {
        const usuariosRegistrados = ['Ana', 'Luis'];
        const cuentasActivas = ['Ana'];

        if (!usuariosRegistrados.includes(usuario)) {
            return callback(false); 
        } else if (!cuentasActivas.includes(usuario)) {
            return callback(false); 
        }

        callback(true); 
    }, 1000);
}


function verificarPermisos(usuario, callback) {
    setTimeout(() => {
        const usuariosConPermisos = ['Ana'];
        const tienePermisos = usuariosConPermisos.includes(usuario);
        callback(tienePermisos);
    }, 1000);
}

function procesoDeVerificacion(usuario) {
    console.log(`Iniciando verificación para el Usuario(a): ${usuario} .....`);
    
    verificarUsuario(usuario, (existe) => {
        if (!existe) {
            return console.log(`El Usuario(a) ${usuario} no existe. x_x`);
        }
        console.log(`Usuario(a) ${usuario} verificado exitosamente.`);
        
        comprobarCuentaActiva(usuario, (activa) => {
            if (!activa) {
                return console.log(`La cuenta del usuario(a): ${usuario}  no está activa. :(`);
            }
            console.log(`La cuenta del usuario(a): ${usuario}  está activa. :)`);
            
            verificarPermisos(usuario, (permisos) => {
                if (!permisos) {
                    return console.log(`El usuario(a): ${usuario} no tiene permisos. :(`);
                }
                console.log(`El usuario(a): ${usuario} tiene permisos. Acceso concedido.:)`);
            });
        });
    });
}


procesoDeVerificacion('Ana');   // Usuario con acceso completo
procesoDeVerificacion('Luis');  // Usuario sin cuenta activa
procesoDeVerificacion('Pedro'); // Usuario que no existe
