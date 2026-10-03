const parrafo = document.getElementById("puntajes");
//equipo recupera los colores seleccionados x el usuario
let equipo = JSON.parse(
    localStorage.getItem("equipo")
);

// ahora recuperamos los datos de puntajes de los juegos
let puntaDados = JSON.parse(
    localStorage.getItem("puntaDados")
)||[];
let puntaPreguntas = JSON.parse(
    localStorage.getItem("puntaPreguntas")
)||[];
let puntaCartas = JSON.parse(
    localStorage.getItem("puntaCartas")
)||[];


let equipoMostrar = {
    colores: [],
    dados: [],
    cartas: [],
    pregu: []
};

for (let i=0 ; i<colores.length; i++){
    equipoMostrar.colores[i]=equipo[i] ?? 0;
    equipoMostrar.dados[i]=puntaDados[i] ?? 0;
    equipoMostrar.cartas[i]=puntaCartas[i] ?? 0;
    equipoMostrar.pregu[i]=puntaPreguntas[i] ?? 0;
}

function reinaPuntajes() {
    localStorage.clear();
location.reload();
}
//agregar boton al html!
// quizas tambien borrar algun puntaje en particular?
// podria armarse un boton cuando ya este definido html y css
/* declaracion de IA: CHAT GPT me sugirio no perder todos los datos, mejor usar
function reinaPuntajes() {
    localStorage.removeItem("puntaDados");
    localStorage.removeItem("puntaPreguntas");
    localStorage.removeItem("puntaCartas");

    location.reload();
} */ 


parrafo.innerHTML = `PUNTAJE MAXIMO DADOS: ${equipoMostrar.dados[0]} ... PUNTAJE MAXIMO CARTAS: ${equipoMostrar.cartas[0]} ... PUNTAJE MAXIMO PREGUNTAS: ${equipoMostrar.pregu[0]}`
