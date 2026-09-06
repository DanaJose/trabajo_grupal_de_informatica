    var0 = "imagen donki kong"
    var1 = "iamgen mario"
    var2 = "imagen luiggi"
    var3 = "imagen princesa"
    var4 = "imagen caja" // aca podriamos aprovechar para introcudir un evento al juego, donde intervenga la caja
    varHongo = "imagen del honguito"
// esta es la construccion del dado, luego le asignaremos las imagenes a las variables! 
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
saltoLinea (contadorDadosPermaMesa, limite, numeroTiradas)
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
    } else {encendido1 = false;
        contadorDadosPermaMesa--;
    }
});

dado2.addEventListener ("click", () => {
     if (encendido2 === false) {
    console.log("El usuario seleccionó dado2");
    contadorDadosPermaMesa ++;
    seleccion [1] = preseleccion [1];}
     else {encendido2 = false;
        contadorDadosPermaMesa--;
     }
});

dado3.addEventListener ("click", () => {
     if (encendido3 === false) {
    console.log("El usuario seleccionó dado3");
    contadorDadosPermaMesa ++;
    seleccion [2] = preseleccion [2];}
     else {encendido3 = false;
        contadorDadosPermaMesa--;
     }
});

dado4.addEventListener ("click", () => {
     if (encendido4 === false) {
        console.log("El usuario seleccionó dado4");
    contadorDadosPermaMesa ++;
    seleccion [3] = preseleccion [3];}
     else {encendido4 = false;
        contadorDadosPermaMesa--
     }
});

dado5.addEventListener ("click", () => {
     if (encendido5 === false) {
    console.log("El usuario seleccionó dado5");
    contadorDadosPermaMesa ++;
    seleccion [4] = preseleccion [4];}
     else {encendido5 = false;
        contadorDadosPermaMesa--;
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