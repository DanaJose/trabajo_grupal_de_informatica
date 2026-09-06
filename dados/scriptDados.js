    let var0 = '<img src="mario/donkeykong.png" alt="imagen donki kong" width="60" height="60"> '
    let var1 = '<img src="mario/mario.png" alt="imagen mario" width="60" height="60">'
    let var2 = '<img src="mario/luigi.png" alt="imagen luiggi" width="60" height="60">'
    let var3 = '<img src="mario/daisy.png" alt="imagen princesa" width="60" height="60">'
    let var4 = '<img src="mario/box.png" alt="imagen caja" width="60" height="60">'
     // aca podriamos aprovechar para introcudir un evento al juego, donde intervenga la caja
    let varHongo = '<img src="mario/goomba.png" alt="imagen del honguito" width="60" height="60">'

const dado = [
    var0,
    var1, 
    var2,
    var3,
    var4,
    varHongo
                ];
//estos seran os valhores que o usuario vaya eligiendo
let preseleccion = [];
let numeroTiradas = 0;

//aqui "tirada" es el nombre del boton y al accionarlo se ejecuta la funcion
const tirada = document.getElementById("tirada");

tirada.addEventListener ("click", () => {
    console.log("El usuario tiró los dados");
azar (dado,limite); 
console.log(preseleccion);
numeroTiradas++
saltoLinea (contadorDadosPermaMesa, limite, numeroTiradas);
     mostrarDados(); 
});

let limite = 5;
let contadorDadosPermaMesa = 0;
let seleccion = [null,null,null,null,null];

function azar (dado,limite)  {
    for (let i=0; i<limite; i++) {
        if (seleccion[i]==null){
      let valorAleatorio = dado[Math.floor(Math.random() * dado.length)];  
     preseleccion [i] = valorAleatorio;
    }}
} 

//intentare mostrar los dados
function mostrarDados () {
document.querySelector("#dado1").innerHTML = preseleccion[0];
document.querySelector("#dado2").innerHTML = preseleccion[1];
document.querySelector("#dado3").innerHTML = preseleccion[2];
document.querySelector("#dado4").innerHTML = preseleccion[3];
document.querySelector("#dado5").innerHTML = preseleccion[4];
}


//usuario eligiendo que dados quedan en la mesa:
const dado1 = document.getElementById("dado1");
const dado2 = document.getElementById("dado2");
const dado3 = document.getElementById("dado3");
const dado4 = document.getElementById("dado4");
const dado5 = document.getElementById("dado5");


// "encendido-apagado" de las selecciones
let encendido1 = false;
let encendido2 = false;
let encendido3 = false;
let encendido4 = false;
let encendido5 = false;

// sea una buena idea armar un for? para cargar un array que vaya actualizando os valhoras das lineas!
let cuadricula = [];

    // cuadricula (1) = linea [1],linea [2],linea [3],linea [4],linea [5]; actualiza (...)
    // cuadricula (2) = linea [1],linea [2],linea [3],linea [4],linea [5]; actualiza (...)
    // cuadricula guardariaa los valores de cada tirada!

let linea = [];
//declaracion IA: GPT me ayudo a revisar el if : habia olvidado descontar el contador al des-seleccionar <:)

dado1.addEventListener ("click", () => {
    if (encendido1 === false) { 
    console.log("El usuario seleccionó dado1");
    contadorDadosPermaMesa ++;
    seleccion [0] = preseleccion [0];
        encendido1 = true 
    } else {
            console.log("El usuario des-seleccionó dado1");
        encendido1 = false;
        contadorDadosPermaMesa--;
        seleccion [0] = null;
    }
});

dado2.addEventListener ("click", () => {
     if (encendido2 === false) {
    console.log("El usuario seleccionó dado2");
    contadorDadosPermaMesa ++;
    seleccion [1] = preseleccion [1];
    encendido2 = true }
     else {
            console.log("El usuario des-seleccionó dado2");
        encendido2 = false;
        contadorDadosPermaMesa--;
        seleccion [1] = null;
     }
});

dado3.addEventListener ("click", () => {
     if (encendido3 === false) {
    console.log("El usuario seleccionó dado3");
    contadorDadosPermaMesa ++;
    seleccion [2] = preseleccion [2];
encendido3 = true }
     else {encendido3 = false;
        contadorDadosPermaMesa--;
        seleccion [2] = null;
     }
});

dado4.addEventListener ("click", () => {
     if (encendido4 === false) {
        console.log("El usuario seleccionó dado4");
    contadorDadosPermaMesa ++;
    seleccion [3] = preseleccion [3];
encendido4 = true }
     else {
                console.log("El usuario des-seleccionó dado4");
                encendido4 = false;
        contadorDadosPermaMesa--;
        seleccion [3] = null;
     }
});

dado5.addEventListener ("click", () => {
     if (encendido5 === false) {
    console.log("El usuario seleccionó dado5");
    contadorDadosPermaMesa ++;
    seleccion [4] = preseleccion [4];
encendido5 = true }
     else {encendido5 = false;
        contadorDadosPermaMesa--;
        seleccion [4] = null;
     }
});

// n sera la posicion de la linea
let n=0;
function saltoLinea (){
if (contadorDadosPermaMesa === limite || numeroTiradas === 3) {
   //reseteo botones, contador y actualizo cuadricula
   numeroTiradas = 0;
   contadorDadosPermaMesa = 0;

   linea [n] = seleccion;

   cuadricula.push (linea);

encendido1 = false;
encendido2 = false;
encendido3 = false;
encendido4 = false;
encendido5 = false;

console.log(linea);
n++
} }

