// ============================================================
// MÚSICA DE FONDO
// ============================================================
 
// Creamos la música de fondo.
// "new Audio" crea un reproductor invisible y le dice qué archivo usar.
// Todavía no suena: solo queda preparado.
// IMPORTANTE: el archivo debe llamarse exactamente así (sin espacio antes de "_bros").
const musicaFondo = new Audio("sonidos/super_mario_bros_cancion.mp3");
 
// loop = true hace que, cuando la canción termina, vuelva a empezar sola.
musicaFondo.loop = true;
 
// volume va de 0 (silencio) a 1 (máximo).
// Usamos 0.3 para que sea música de fondo y no tape otros sonidos.
musicaFondo.volume = 0.3;
 
 
// ============================================================
// ELEMENTOS DE LA PÁGINA
// ============================================================
 
// Buscamos en el HTML los elementos que vamos a necesitar, por su id,
// y los guardamos en variables para poder usarlos más abajo.
const confirmar = document.getElementById("confirmar");         // botón "CONFIRMAR EQUIPO"
const contenido = document.getElementById("contenido");         // contenido principal (bloqueado al inicio)
const banderita = document.getElementById("banderita");         // zona donde se arma la bandera
const colorEquipo = document.getElementById("colorEquipo");     // lugar donde se muestra la bandera ya confirmada
const contenidoHead = document.getElementById("contenidoHead"); // menú de navegación (bloqueado al inicio)
 
// Lista de colores que pueden tener los casilleros.
const colores = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "lightblue",
    "magenta",
    "orange"
];
 
 
// ============================================================
// CREACIÓN DE LA CUADRÍCULA
// ============================================================
 
// Creamos la cuadrícula para elegir los colores del equipo:
const puzzle = document.getElementById("puzzle");
 
// Esta función crea 9 casilleros (divs) y los mete dentro del contenedor
// que le pasemos (seleColor).
function cuadricula (seleColor) {
    for (let i = 0; i < 9; i++) {
 
        // Creamos un div nuevo.
        let casilla = document.createElement("div");
 
        // Le ponemos la clase "casilla" para que tome los estilos del CSS.
        casilla.classList.add("casilla");
 
        // Lo agregamos adentro del contenedor.
        seleColor.appendChild(casilla);
    }
}
 
// Esta función copia los colores de la bandera armada (casillas)
// a los casilleros de la bandera confirmada (casilleros).
function colorear (casilleros){
    // Agregué "let" delante de la i: sin eso, la variable queda global
    // y puede causar errores difíciles de encontrar.
    for (let i = 0; i < casilleros.length; i++){
        casilleros[i].style.backgroundColor =
            casillas[i].style.backgroundColor;
    }
}
 
// Ejecutamos la función: se crean los 9 casilleros dentro del puzzle.
cuadricula(puzzle);
 
 
// ============================================================
// COLORES INICIALES AL AZAR
// ============================================================
 
// Ahora que están creadas, obtenemos todas las casillas.
// querySelectorAll devuelve una lista con todos los elementos de clase "casilla".
const casillas = document.querySelectorAll(".casilla");
 
// Devuelve un color al azar de la lista "colores".
function colorRandom() {
 
    // Math.random() da un número entre 0 y 1.
    // Lo multiplicamos por la cantidad de colores y lo redondeamos hacia abajo
    // para obtener una posición válida de la lista.
    let numero = Math.floor(Math.random() * colores.length);
 
    return colores[numero];
}
 
// A cada casilla le asignamos un color inicial al azar.
casillas.forEach(function(casilla) {
 
    casilla.style.backgroundColor = colorRandom();
 
});
 
 
// ============================================================
// CLIC EN LAS CASILLAS (cambiar color + arrancar música)
// ============================================================
 
casillas.forEach(function(casilla) {
 
    // Cada casilla queda "escuchando" los clics.
    casilla.addEventListener("click", function() {
 
        // Solo funciona mientras el equipo NO esté confirmado.
        if (confirmar.disabled != true) {
 
            // --- MÚSICA ---
            // "paused" es true cuando la música NO está sonando.
            // Con este if, la música arranca solo en el primer clic.
            // En los clics siguientes ya está sonando y no hace nada.
            // (Los navegadores exigen que el usuario haga algo antes de
            // permitir sonido: este clic cumple esa condición.)
            if (musicaFondo.paused) {
                musicaFondo.play();
            }
 
            // --- CAMBIO DE COLOR ---
            // Leemos el color actual de la casilla.
            let colorActual = casilla.style.backgroundColor;
 
            // Buscamos en qué posición de la lista "colores" está ese color.
            let posicion = colores.indexOf(colorActual);
 
            // Pasamos al siguiente color de la lista.
            posicion++;
 
            // Si nos pasamos del final, volvemos al primero.
            if (posicion >= colores.length) {
                posicion = 0;
            }
 
            // Aplicamos el nuevo color a la casilla.
            casilla.style.backgroundColor = colores[posicion];
        }
    });
 
});
 
 
// ============================================================
// BOTÓN "CONFIRMAR EQUIPO"
// ============================================================
 
confirmar.addEventListener("click", function() {
 
    // Leemos los colores de la bandera armada.
    let equipo = determinarEquipo();
 
    // Guardamos el equipo en el navegador (localStorage) como texto,
    // para poder usarlo después en los juegos.
    localStorage.setItem("equipo", JSON.stringify(equipo));
 
    // Ocultamos la zona de armado de la bandera.
    banderita.classList.add("bloqueado");
 
    // Mostramos el contenido principal y el menú.
    contenido.classList.remove("bloqueado");
    contenidoHead.classList.remove("bloqueado");
 
    // Deshabilitamos el botón para que no se confirme dos veces.
    confirmar.disabled = true;
 
    // Creamos la cuadrícula de la bandera confirmada...
    cuadricula (colorEquipo);
 
    // ...obtenemos sus casilleros...
    const casilleros = colorEquipo.querySelectorAll(".casilla");
 
    // ...y les copiamos los colores elegidos.
    colorear (casilleros);
 
    // NOTA: la música NO se detiene acá, así que sigue sonando.
    // Si quisieras detenerla al confirmar, agregá esta línea:
    // musicaFondo.pause();
});
 
// Luego, en los juegos: let equipo = localStorage.getItem("equipo");
 
// Devuelve una lista con el color de cada casilla, en orden.
function determinarEquipo() {
    // Array.from convierte la lista de casillas en un array,
    // y map recorre cada casilla devolviendo su color de fondo.
    const patron = Array.from(casillas).map(casilla => casilla.style.backgroundColor);
    return patron;
}
 