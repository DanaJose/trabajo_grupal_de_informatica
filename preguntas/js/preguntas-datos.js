// ========================================
// BANCO DE PREGUNTAS — Trivia de Mario
// ========================================
// Cada pregunta tiene: texto, dificultad, opciones (array de 4) y el índice
// de la opción correcta dentro de ese array.
// "personajeParaExtra" es el nombre exacto de la página en mariowiki.com
// que vamos a usar más adelante para traer un dato curioso extra al acertar
// o fallar. Por ahora no se usa todavía, solo lo dejamos preparado.
 
const bancoPreguntas = [
  // ---------- FÁCIL ----------
  {
    dificultad: "facil",
    texto: "¿En qué juego pudo Mario subirse por primera vez a su querido compañero Yoshi?",
    opciones: ["Super Mario World", "Super Mario Bros. 3", "Super Mario 64", "Super Mario Galaxy"],
    correcta: 0,
    personajeParaExtra: "Yoshi"
  },
  {
    dificultad: "facil",
    texto: "¿Qué transformación de insecto puede hacer Mario en el juego Super Mario Galaxy?",
    opciones: ["Abeja", "Fantasma", "Hielo", "Roca"],
    correcta: 0,
    personajeParaExtra: "Bee Mario"
  },
  {
    dificultad: "facil",
    texto: "¿Cuál de estas NO es una mejora (power-up) de Mario?",
    opciones: ["Super Champiñón", "Estrella", "Flor de Fuego", "Sandwich de Miga"],
    correcta: 3,
    personajeParaExtra: null
  },
  {
    dificultad: "facil",
    texto: "¿Cuál es el nombre del traje que parece un mapache y le da a Mario la habilidad de planear por el aire?",
    opciones: ["Traje Tanuki", "Traje de Rana", "Traje de Martillo", "Pluma Voladora"],
    correcta: 0,
    personajeParaExtra: "Tanooki Suit"
  },
  {
    dificultad: "facil",
    texto: "¿Luigi es el qué de Mario?",
    opciones: ["Hermano", "Primo", "Mejor amigo", "Vecino"],
    correcta: 0,
    personajeParaExtra: "Luigi"
  },
 
  // ---------- DIFÍCIL ----------
  {
    dificultad: "dificil",
    texto: "¿En qué juego apareció por primera vez Bowser Jr.?",
    opciones: ["Super Mario Sunshine", "Super Mario 64", "New Super Mario Bros.", "Super Mario Galaxy"],
    correcta: 0,
    personajeParaExtra: "Bowser Jr."
  },
  {
    dificultad: "dificil",
    texto: "¿En qué juego apareció por primera vez el champiñón venenoso?",
    opciones: ["Super Mario Bros.: The Lost Levels", "Super Mario Bros. 3", "Super Mario World", "Super Mario 64"],
    correcta: 0,
    personajeParaExtra: "Poison Mushroom"
  },
  {
    dificultad: "dificil",
    texto: "¿En qué juego, por primera vez, Mario empezaba a tener sueño y tomaba una siesta si el jugador se mostraba ausente?",
    opciones: ["Super Mario 64", "Super Mario Sunshine", "Super Mario Galaxy", "Super Mario Odyssey"],
    correcta: 0,
    personajeParaExtra: null
  },
  {
    dificultad: "dificil",
    texto: "¿Cuál fue el primer juego en el que la gorra de Mario puede salir volando?",
    opciones: ["Super Mario 64", "Super Mario Sunshine", "Super Mario 3D World", "Super Mario Odyssey"],
    correcta: 0,
    personajeParaExtra: null
  },
  {
    dificultad: "dificil",
    texto: "En el juego original de Super Mario Bros. los icónicos overoles de Mario no eran azules. ¿De qué color eran?",
    opciones: ["Rojo", "Verde", "Amarillo", "Negro"],
    correcta: 0,
    personajeParaExtra: null
  }
];
 