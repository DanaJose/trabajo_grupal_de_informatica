const parrafo = document.getElementById("puntajes");
//colores recupera los colores seleccionados x el usuario
let colores = JSON.parse(
    localStorage.getItem("colores")
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


let equipo = {
    color: [],
    dados: [],
    cartas: [],
    pregu: []
};

for (let i=0 ; i<colores.length; i++){
    equipo.color[i]=colores[i] ?? 0;
    equipo.dados[i]=puntaDados[i] ?? 0;
    equipo.cartas[i]=puntaCartas[i] ?? 0;
    equipo.pregu[i]=puntaPreguntas[i] ?? 0;
}

function reinaPuntajes() {
    localStorage.clear();
location.reload();
}
// quizas tambien borrar algun puntaje en particular?
// podria armarse un boton cuando ya este definido html y css
/* declaracion de IA: CHAT GPT me sugirio no perder todos los datos, mejor usar
function reinaPuntajes() {
    localStorage.removeItem("puntaDados");
    localStorage.removeItem("puntaPreguntas");
    localStorage.removeItem("puntaCartas");

    location.reload();
} */ 


parrafo.innerHTML = `PUNTAJE MAXIMO DADOS: ${equipo.dados[1]} ... PUNTAJE MAXIMO CARTAS: ${equipo.cartas[1]} ... PUNTAJE MAXIMO PREGUNTAS: ${equipo.pregu[1]}`
