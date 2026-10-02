const confirmar = document.getElementById("confirmar");
const contenido = document.getElementById("contenido");
const banderita = document.getElementById("banderita");
const colorEquipo = document.getElementById("colorEquipo");
const contenidoHead = document.getElementById("contenidoHead");
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

//creamos la cuadricula para elegir los colores del equipo:
const puzzle = document.getElementById("puzzle");
function cuadricula (seleColor) {
for (let i = 0; i < 9; i++) {

    let casilla = document.createElement("div");

    casilla.classList.add("casilla");

    seleColor.appendChild(casilla);
}}
function colorear (casilleros){
    for (i=0; i< casilleros.length;i++){
         casilleros[i].style.backgroundColor =
            casillas[i].style.backgroundColor;

}
    }
cuadricula(puzzle);

// ahora que estan creadas, obtenemos las casillas:

const casillas = document.querySelectorAll(".casilla");

function colorRandom() {

    let numero = Math.floor(Math.random() * colores.length);

    return colores[numero];
}


casillas.forEach(function(casilla) {

    casilla.style.backgroundColor = colorRandom();

});

casillas.forEach(function(casilla) {

    casilla.addEventListener("click", function() {

if (confirmar.disabled != true) {
        let colorActual = casilla.style.backgroundColor;

        let posicion = colores.indexOf(colorActual);

        posicion++;

        if (posicion >= colores.length) {
            posicion = 0;
        }

        casilla.style.backgroundColor = colores[posicion];

}});

});

confirmar.addEventListener("click", function() {

    let equipo = determinarEquipo();

    localStorage.setItem("equipo", equipo);
banderita.classList.add("bloqueado");
    contenido.classList.remove("bloqueado");
    contenidoHead.classList.remove("bloqueado");
    confirmar.disabled = true;
    cuadricula (colorEquipo);

    const casilleros = colorEquipo.querySelectorAll(".casilla");

    colorear (casilleros);
});

//luego en los juegos: let equipo = localStorage.getItem("equipo");
function determinarEquipo () {
localStorage.setItem(
    "colores",
    JSON.stringify(colores)
);}