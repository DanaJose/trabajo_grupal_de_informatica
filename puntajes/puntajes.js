//colores recupera los colores seleccionados x el usuario
let equipo = JSON.parse(
    localStorage.getItem("equipo")
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
console.log (equipoo)
console.log (puntaDados)
