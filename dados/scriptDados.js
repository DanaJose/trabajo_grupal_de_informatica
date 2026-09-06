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
let seleccion = [];


//aqui "tirada" es el nombre del boton y al accionarlo se ejecuta la funcion
const tirada = document.getElementById("tirada");

tirada.addEventListener ("click", () => {
    console.log("El usuario tiró los dados");
azar (dado,limite); 
console.log(seleccion)
});

// la funcion azar deberia devolver un objeto con 5 valores random del dado:
// si para la tirada dos y tres el usuario selecciona dados que no tira deberiamos contarlos y restarselos al limite
// declaracion IA : pregunte como tomar un valor random de un objeto y me recomendo object.value; no recuerdo haber usado eso en la cursada; si copie el codigo math random math floor para tomar un valor aleatorio dentro de las posibilidades del dado (:)
let limite = 5;
let contadorDadosPermaMesa = 0;

function azar (dado,limite)  {
limite = limite - contadorDadosPermaMesa;
    let valores = [];
    //recorro dado? ya conozco el nombre de las varaibles
    for (i=0; i<limite; i++) {
      let valorAleatorio = dado[Math.floor(Math.random() * dado.length)];  
     valores.push (valorAleatorio)
    }
   seleccion = valores;
} 