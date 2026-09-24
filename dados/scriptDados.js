// ============================================================
// 1. IMÁGENES / CARAS DEL DADO
// ============================================================

const dado = [
    '<img src="mario/donkeykong.png" alt="imagen Donkey Kong" width="60" height="60">',
    '<img src="mario/mario.png" alt="imagen Mario" width="60" height="60">',
    '<img src="mario/luigi.png" alt="imagen Luigi" width="60" height="60">',
    '<img src="mario/daisy.png" alt="imagen Daisy" width="60" height="60">',
    '<img src="mario/box.png" alt="imagen caja" width="60" height="60">',
    '<img src="mario/goomba.png" alt="imagen Goomba" width="60" height="60">'
];


// ============================================================
// 2. ESTADO DEL JUEGO
// ============================================================

const limite = 5;

// Lo que muestran actualmente los cinco dados
let dadosActuales = [null, null, null, null, null];

// Qué dados están seleccionados/bloqueados
// true = seleccionado
// false = libre
let seleccionados = [false, false, false, false, false];

// Cantidad de dados que quedaron seleccionados
let contadorDadosMesa = 0;

// Cantidad de tiradas realizadas
let numeroTiradas = 0;

// Tablero definitivo
// Cada elemento es una fila
//
// Ejemplo:
//
// [
//   [Mario, Luigi, Caja, Mario, Daisy],
//   [Goomba, Mario, Mario, Luigi, Caja]
// ]
//
let cuadricula = [];


// ============================================================
// 3. ELEMENTOS DEL HTML
// ============================================================

const botonTirada = document.getElementById("tirada");

const dadosHTML = [
    document.getElementById("dado1"),
    document.getElementById("dado2"),
    document.getElementById("dado3"),
    document.getElementById("dado4"),
    document.getElementById("dado5")
];

const intercambios = [
    document.getElementById("intercambio1"),
    document.getElementById("intercambio2"),
    document.getElementById("intercambio3"),
    document.getElementById("intercambio4")
];


// ============================================================
// 4. TIRAR LOS DADOS
// ============================================================

function tirarDados() {

    for (let i = 0; i < limite; i++) {

        // Si el dado NO está seleccionado,
        // puede cambiar su valor.
        if (seleccionados[i] === false) {

            const valorAleatorio =
                dado[Math.floor(Math.random() * dado.length)];

            dadosActuales[i] = valorAleatorio;
        }
    }
}


// ============================================================
// 5. MOSTRAR LOS DADOS EN PANTALLA
// ============================================================

function mostrarDados() {

    dadosHTML.forEach((dadoHTML, i) => {

        if (dadosActuales[i] !== null) {
            dadoHTML.innerHTML = dadosActuales[i];
        } else {
            dadoHTML.innerHTML = "";
        }

    });
}


// ============================================================
// 6. SELECCIONAR / DESELECCIONAR DADOS
// ============================================================

function cambiarSeleccion(i) {

    if (seleccionados[i] === false) {

        // -----------------------------
        // SELECCIONAR
        // -----------------------------

        seleccionados[i] = true;
        contadorDadosMesa++;

        console.log(`Seleccionó dado ${i + 1}`);

    } else {

        // -----------------------------
        // DESELECCIONAR
        // -----------------------------

        seleccionados[i] = false;
        contadorDadosMesa--;

        console.log(`Des-seleccionó dado ${i + 1}`);
    }

    dadosHTML[i].classList.toggle(
        "dado-seleccionado",
        seleccionados[i]
    );
}


// ============================================================
// 7. EVENTOS DE LOS DADOS
// ============================================================

dadosHTML.forEach((dadoHTML, i) => {

    dadoHTML.addEventListener("click", () => {

        cambiarSeleccion(i);

    });

});


// ============================================================
// 8. INTERCAMBIAR DADOS CON LAS FLECHAS
// ============================================================

intercambios.forEach((boton, i) => {

    boton.addEventListener("click", () => {

        // Intercambiamos el dado i con el siguiente
        [
            dadosActuales[i],
            dadosActuales[i + 1]
        ] = [
            dadosActuales[i + 1],
            dadosActuales[i]
        ];

        mostrarDados();
    });

});


// ============================================================
// 9. BOTÓN "TIRADA"
// ============================================================

botonTirada.addEventListener("click", () => {

    //colocamos fin juego antes para permitir que valgan los puntos de la ultima jugada;

    finJuego ();

    tirarDados();

    numeroTiradas++;

    mostrarDados();

    comprobarFinDeTirada();

});


// ============================================================
// 10. COMPROBAR SI TERMINÓ LA RONDA
// ============================================================

function comprobarFinDeTirada() {

    /*
        La ronda termina si:

        1. Los cinco dados fueron seleccionados

        O

        2. Se hicieron tres tiradas
    */

    if (
        contadorDadosMesa === limite ||
        numeroTiradas === 3
    ) {

        terminarRonda();
    }
}


// ============================================================
// 11. TERMINAR RONDA
// ============================================================

function terminarRonda() {

    console.log("Terminó la ronda");
    ronda++;

    // --------------------------------------------------------
    // Guardamos una COPIA de los dados actuales
    // --------------------------------------------------------

    cuadricula.push([...dadosActuales]);

    console.log("Cuadrícula:", cuadricula);


    // --------------------------------------------------------
    // Buscamos combinaciones
    // --------------------------------------------------------

    tresEnLinea();


    // --------------------------------------------------------
    // Hacemos caer los elementos
    // --------------------------------------------------------

    rellenarTodosLosHuecos();


    // --------------------------------------------------------
    // Mostramos nuevamente el tablero
    // --------------------------------------------------------

    mostrarCuadricula();


    // --------------------------------------------------------
    // Reiniciamos la ronda
    // --------------------------------------------------------

    numeroTiradas = 0;
    contadorDadosMesa = 0;

    dadosActuales = [null, null, null, null, null];

    seleccionados = [
        false,
        false,
        false,
        false,
        false
    ];

    dadosHTML.forEach((dadoHTML) => {

        dadoHTML.classList.remove("dado-seleccionado");

    });

    mostrarDados();
}


// ============================================================
// 12. MOSTRAR LA CUADRÍCULA
// ============================================================

function mostrarCuadricula() {

    for (let fila = 0; fila < cuadricula.length; fila++) {

        const elementoHTML =
            document.querySelector("#linea" + fila);

        // Si esa fila todavía no existe en el HTML,
        // no hacemos nada.
        if (elementoHTML === null) {
            continue;
        }

        let contenido = "";

        for (let columna = 0; columna < limite; columna++) {

            const valor = cuadricula[fila][columna];

            if (valor !== null) {

                contenido += `<div>${valor}</div>`;

            } else {

                contenido += `<div></div>`;
            }
        }

        elementoHTML.innerHTML = contenido;
    }
}


// ============================================================
// 13. BUSCAR TRES EN LÍNEA
// ============================================================

function tresEnLinea() {

    buscarHorizontal();
    buscarVertical();
}


// ============================================================
// 14. BUSCAR HORIZONTALMENTE
// ============================================================

function buscarHorizontal() {

    for (let fila = 0; fila < cuadricula.length; fila++) {

        /*
            Tenemos cinco columnas.

            Por eso las posiciones iniciales posibles
            para buscar tres son:

            0 → 0,1,2
            1 → 1,2,3
            2 → 2,3,4
        */

        for (let columna = 0; columna <= 2; columna++) {

            const a = cuadricula[fila][columna];
            const b = cuadricula[fila][columna + 1];
            const c = cuadricula[fila][columna + 2];

            // No queremos considerar tres espacios vacíos
            if (
                a !== null &&
                a === b &&
                b === c
            ) {

                let cantidad = 3;

                // ¿Hay un cuarto?
                if (
                    columna + 3 < limite &&
                    a === cuadricula[fila][columna + 3]
                ) {

                    cantidad = 4;
                }

                // ¿Hay un quinto?
                if (
                    columna + 4 < limite &&
                    a === cuadricula[fila][columna + 4]
                ) {

                    cantidad = 5;
                }

                console.log(
                    `Hay ${cantidad} en línea horizontal`
                );

                borrarTCoC(
                    "horizontal",
                    cantidad,
                    fila,
                    columna
                );
                sumarPuntaje(cantidad);
            }
        }
    }
}


// ============================================================
// 15. BUSCAR VERTICALMENTE
// ============================================================

function buscarVertical() {

    // Necesitamos al menos tres filas
    for (
        let fila = 0;
        fila <= cuadricula.length - 3;
        fila++
    ) {

        for (let columna = 0; columna < limite; columna++) {

            const a = cuadricula[fila][columna];
            const b = cuadricula[fila + 1][columna];
            const c = cuadricula[fila + 2][columna];

            if (
                a !== null &&
                a === b &&
                b === c
            ) {

                console.log("Tres en línea vertical");

                borrarTCoC(
                    "vertical",
                    3,
                    fila,
                    columna
                );
                sumarPuntaje(3);
            }
        }
    }
}


// ============================================================
// 16. BORRAR LAS PIEZAS DE UNA LÍNEA
// ============================================================

function borrarTCoC(sentido, cantidad, fila, columna) {

    if (sentido === "horizontal") {

        for (let i = 0; i < cantidad; i++) {

            cuadricula[fila][columna + i] = null;
        }

    } else if (sentido === "vertical") {

        for (let i = 0; i < cantidad; i++) {

            cuadricula[fila + i][columna] = null;
        }
    }

    console.log("Después de borrar:", cuadricula);
}


// ============================================================
// 17. HACER CAER LOS ELEMENTOS
// ============================================================

function rellenarTodosLosHuecos() {

    for (let columna = 0; columna < limite; columna++) {
        hacerCaerColumna(columna);
    }
}


function hacerCaerColumna(columna) {

    // filaDestino representa el hueco más bajo disponible
    let filaDestino = 0;

    for (let fila = 0; fila < cuadricula.length; fila++) {

        if (cuadricula[fila][columna] !== null) {

            // Movemos la ficha hacia abajo
            cuadricula[filaDestino][columna] =
                cuadricula[fila][columna];

            // Si la ficha estaba más arriba,
            // dejamos vacío el lugar original
            if (filaDestino !== fila) {
                cuadricula[fila][columna] = null;
            }

            filaDestino++;
        }
    }
}
// ============================================================
// FIN
// ============================================================


//  puntajes!!
//vamos a agregar un contador en tres en linea horizontal y en tres en linea vertical
// podemos togglear el fondo si puntaje > algun valor especificco
let puntajeActual = 0;
let ronda = 0;

function sumarPuntaje (cantidad) {
    puntajeActual = puntajeActual + (cantidad * 5) * ronda;
    if (ronda===7) {
        puntajeActual = puntajeActual*2
    }
    texto.innerHTML =  `<h2> ${puntajeActual} </h2>`
}


const texto = document.getElementById("texto");

function finJuego () {
 
    for  (let i=0;i<limite;i++){

    if ( cuadricula.length > 5 && cuadricula[5][i]  !==  null  )
        {
            botonTirada.disabled = true;
        } }
}