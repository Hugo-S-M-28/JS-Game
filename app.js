let numeroSecreto = 0; // Almacena el número secreto que el usuario debe adivinar
let intentos = 0; // Cuenta el número de intentos realizados por el usuario
let listaNumerosSorteados = []; // Almacena los números ya sorteados para evitar repeticiones
let numeroMaximo = 10; // Define el valor máximo del número secreto

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); // Selecciona el elemento HTML
    elementoHTML.innerHTML = texto; // Asigna el texto proporcionado al elemento
    return;
}

// Función para verificar el intento del usuario
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); // Obtiene el valor ingresado por el usuario y lo convierte a número entero
    
    if (numeroDeUsuario === numeroSecreto) {
        // Si el usuario acierta el número secreto
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`); // Muestra un mensaje de éxito
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita el botón de reiniciar
    } else {
        // Si el usuario no acierta
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor'); // Muestra un mensaje indicando que el número secreto es menor
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor'); // Muestra un mensaje indicando que el número secreto es mayor
        }
        intentos++; // Incrementa el contador de intentos
        limpiarCaja(); // Limpia el campo de entrada
    }
    return;
}

// Función para limpiar el campo de entrada
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; // Establece el valor del campo de entrada a una cadena vacía
}

// Función para generar un número secreto aleatorio
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; // Genera un número aleatorio entre 1 y el número máximo

    console.log(numeroGenerado); // Imprime el número generado en la consola (para depuración)
    console.log(listaNumerosSorteados); // Imprime la lista de números sorteados en la consola (para depuración)
    
    if (listaNumerosSorteados.length == numeroMaximo) {
        // Si ya se han sorteado todos los números posibles
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles'); // Muestra un mensaje indicando que ya no hay más números disponibles
    } else {
        // Si el número generado ya está en la lista de números sorteados
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); // Llama recursivamente a la función para generar un nuevo número
        } else {
            listaNumerosSorteados.push(numeroGenerado); // Agrega el número generado a la lista de números sorteados
            return numeroGenerado; // Devuelve el número generado
        }
    }
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', '¡Juego del número secreto!'); // Asigna el título del juego
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`); // Asigna las instrucciones del juego
    numeroSecreto = generarNumeroSecreto(); // Genera y asigna el número secreto
    intentos = 1; // Inicializa el contador de intentos a 1
    console.log(numeroSecreto); // Imprime el número secreto en la consola (para depuración)
}

// Función para reiniciar el juego
function reiniciarJuego() {
    limpiarCaja(); // Limpia el campo de entrada
    condicionesIniciales(); // Restablece las condiciones iniciales del juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); // Deshabilita el botón de reiniciar
}

// Llama a la función para establecer las condiciones iniciales al cargar la página
condicionesIniciales();
