// Ejercicio 1: Callbacks
// Resolver los siguientes ejercicios de callbacks (tendrás puntos extra si creas una página con botones 
// desde la cuál ejecutar cada uno de los ejercicios para probarlos).
// 1.- Muestra un mensaje en consola mediante un callback. La función que escribas debe poder mostrar el mensaje como console.warn, 
// console.log, console.info, o cualquier método para pintar en consola del objeto console.
function mostrarConsola(tipo, mensaje, callback){
    const tipoSalidaConsola = {
        "warn": console.warn,
        "log": console.log,
        "info": console.info,
    };
    const metodoConsola = tipoSalidaConsola[tipo] || console.log;

    metodoConsola(mensaje);

    if (typeof callback === 'function') {
        callback();
    }
}
mostrarConsola('warn', 'Este es un mensaje de advertencia.', function() {
    console.log('Callback ejecutado después de mostrar el mensaje.');
});
mostrarConsola('log', 'Este es un mensaje de log.', function() {
    console.log('Callback ejecutado después de mostrar el mensaje.');
});
mostrarConsola('info', 'Este es un mensaje de info.', function() {
    console.log('Callback ejecutado después de mostrar el mensaje.');
});



// 2.- Crear una función que reciba como argumento una variable de cualquier tipo y un callback. La función debe retornar como resultado, 
// mediante el callback, cual es el tipo de dato de la variable ingresada e imprimir su contenido. typeof

function recibirArgumento(variable, callback) {
    const tipo = typeof variable;
    console.log(`El tipo de la variable es: ${tipo}`);
    console.log(`Contenido de la variable: ${variable}`);
    
    const mostrarResultado = {
        'number': Number,
        'string': String,
        'boolean': Boolean
    };
    const mostrarTipo = mostrarResultado[tipo] || 'Unknown';

    if (typeof callback === 'function') {
        callback(mostrarTipo);
    }
}

recibirArgumento(10, function(tipo) {
    console.log(`Callback ejecutado. Tipo de variable: ${tipo}`);
});

recibirArgumento("DevF", function(tipo) {
    console.log(`Callback ejecutado. Tipo de variable: ${tipo}`);
});

recibirArgumento(false, function(tipo) {
    console.log(`Callback ejecutado. Tipo de variable: ${tipo}`);
});




// 3.- Crear una función que reciba como argumentos, dos números y un callback. Según el callback que se pase a la función, 
// se devuelve la suma de los dos números, la resta de los dos números, la multiplicación de los dos números o división.

function Operaciones(num1,num2,callback){
    const operacion = {
        'suma': num1+num2,
        'resta': num1-num2,
        'multiplicacion': num1 * num2,
        'division': num1/num2
    };

    const mostrarResultado = operacion[callback];
    console.log(`El resultado de ${callback} es: ${mostrarResultado}`);
}


Operaciones(4, 2, 'suma');           
Operaciones(2, 1, 'resta');          
Operaciones(3, 2, 'multiplicacion'); 
Operaciones(10, 2, 'division'); 

//4.- Escribe una función que reciba una cadena de caracteres y debe devolver, mediante un callback, 
//la cadena de caracteres en mayúsculas o en minúsculas.
//ordenSuperior("PejeLagarto", minus); -> pejelagarto ordenSuperior("PejeLagarto", mayus); -> PEJELAGARTO


function minuscula(texto) {
    return texto.toLowerCase();
}
function mayuscula(texto) {
    return texto.toUpperCase();
}

function ordenSuperior(texto, callback) {
    console.log("Antes de ser convertido: ",texto);
    return callback(texto);
}


const resultadoMinuscula = ordenSuperior("MEXICO", minuscula);
const resultadoMayuscula = ordenSuperior("oaxaca", mayuscula);

console.log("Despues der ser convertido en Minuscula: ",resultadoMinuscula); 
console.log("Despues der ser convertido en Mayuscula: ",resultadoMayuscula); 


//5.- Hacer un arreglo de 4 cantidades de tiempo (en minutos) EJEMPLO [120, 80, 200, 100] y 
//tomar solo las cantidades mayores a dos horas 
//(hacer la comparación en horas) regresar el nuevo array mediante un callback.

function tiempoMayor(minutos, callback) {
    const horas = minutos.map(tiempo => tiempo / 60); 
    const mayorHoras = horas.filter(tiempo => tiempo > 2); 
    callback(mayorHoras); 
}

const tiempoMinuto = [180, 300, 200, 100];
tiempoMayor(tiempoMinuto, cantidades => {
    console.log("Cantidades mayores a dos horas en forma de horas:",cantidades.map(hours => hours.toFixed(2)));
});

