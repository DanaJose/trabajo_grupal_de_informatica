//colores recupera los colores seleccionados x el usuario
let colores = JSON.parse(
    localStorage.getItem("colores")
);


// ahora recuperamos los datos de puntajes de los juegos
let puntaDados = JSON.parse(
    localStorage.getItem("puntaDados")
);
let puntaPreguntas = JSON.parse(
    localStorage.getItem("puntaPreguntas")
);
let puntaCartas = JSON.parse(
    localStorage.getItem("puntaCartas")
);


console.log (localStorage.getItem("colores"))
console.log (colores)
console.log (puntaDados)
