// ========================================
// JUEGO DE PREGUNTAS — Trivia de Mario
// ========================================
 
// Estado del juego (se va a ir completando en los próximos pasos)
let preguntasActuales = [];
let indicePreguntaActual = 0;
let puntajeActual = 0;
 
// Referencias a elementos del HTML
const botonesDificultad = document.querySelectorAll(".btn-dificultad");
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
 
// Cuando se hace clic en "Fácil" o "Difícil"
botonesDificultad.forEach(boton => {
  boton.addEventListener("click", () => {
    const nivelElegido = boton.dataset.dificultad; // "facil" o "dificil"
 
    // Filtramos del banco completo solo las preguntas de ese nivel
    preguntasActuales = bancoPreguntas.filter(
      pregunta => pregunta.dificultad === nivelElegido
    );
 
    // Reiniciamos el estado de una partida nueva
    indicePreguntaActual = 0;
    puntajeActual = 0;
 
    // Por ahora, solo lo confirmamos en la consola (todavía no mostramos nada en pantalla)
    console.log("Dificultad elegida:", nivelElegido);
    console.log("Preguntas filtradas:", preguntasActuales);
  });
});
 