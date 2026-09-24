// ========================================
// JUEGO DE PREGUNTAS 
// ========================================
 
// Estado del juego
let preguntasActuales = [];
let indicePreguntaActual = 0;
let puntajeActual = 0;
 
// Referencias a elementos del HTML
const botonesDificultad = document.querySelectorAll(".btn-dificultad");
const textoPregunta = document.getElementById("texto-pregunta");
const contenedorOpciones = document.getElementById("opciones-respuesta");
const numeroPreguntaSpan = document.getElementById("numero-pregunta");
const totalPreguntasSpan = document.getElementById("total-preguntas");
const puntajeActualSpan = document.getElementById("puntaje-actual");
const mensajeFeedback = document.getElementById("mensaje-feedback");
const btnSiguiente = document.getElementById("btn-siguiente");
const puntajeFinalSpan = document.getElementById("puntaje-final");
const totalPreguntasFinalSpan = document.getElementById("total-preguntas-final");
const btnJugarDeNuevo = document.getElementById("btn-jugar-de-nuevo");
 
// Muestra una pantalla (inicio, juego o resultado) y oculta las demás
function mostrarPantalla(idPantalla) {
  document.querySelectorAll(".pantalla").forEach(pantalla => {
    pantalla.classList.remove("activa");
  });
  document.getElementById(idPantalla).classList.add("activa");
}
 
// Dibuja en el HTML la pregunta que corresponde al índice actual
function mostrarPregunta() {
  const pregunta = preguntasActuales[indicePreguntaActual];
 
  textoPregunta.textContent = pregunta.texto;
  numeroPreguntaSpan.textContent = indicePreguntaActual + 1;
  totalPreguntasSpan.textContent = preguntasActuales.length;
  puntajeActualSpan.textContent = puntajeActual;
 
  // Reiniciamos feedback y botón "Siguiente" al mostrar una pregunta nueva
  mensajeFeedback.textContent = "";
  mensajeFeedback.classList.add("oculta");
  btnSiguiente.classList.add("oculta");
 
  // Vaciamos las opciones anteriores antes de dibujar las nuevas
  contenedorOpciones.innerHTML = "";
 
  pregunta.opciones.forEach((textoOpcion, indice) => {
    const boton = document.createElement("button");
    boton.textContent = textoOpcion;
    boton.addEventListener("click", () => {
      verificarRespuesta(indice, pregunta.correcta, boton);
    });
    contenedorOpciones.appendChild(boton);
  });
}
 
// Trae un dato curioso desde mariowiki.com (Fandom / MediaWiki API)
async function obtenerDatoCurioso(nombrePersonaje) {
  const url = `https://www.mariowiki.com/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(nombrePersonaje)}&format=json&origin=*`;
 
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    const paginas = datos.query.pages;
    const idPagina = Object.keys(paginas)[0];
    const extracto = paginas[idPagina].extract;
    return extracto ? extracto.split("\n")[0] : null; // primera línea del resumen
  } catch (error) {
    console.error("No se pudo obtener el dato curioso:", error);
    return null;
  }
}
 
// Valida si la opción elegida es correcta, actualiza puntaje y muestra feedback
async function verificarRespuesta(indiceElegido, indiceCorrecto, botonElegido) {
  // Deshabilitamos todos los botones para que no se pueda responder dos veces
  const todosLosBotones = contenedorOpciones.querySelectorAll("button");
  todosLosBotones.forEach((boton, indice) => {
    boton.disabled = true;
    if (indice === indiceCorrecto) {
      boton.classList.add("opcion-correcta");
    }
  });
 
  const esCorrecta = indiceElegido === indiceCorrecto;
  const pregunta = preguntasActuales[indicePreguntaActual];
 
  if (esCorrecta) {
    puntajeActual++;
    puntajeActualSpan.textContent = puntajeActual;
    mensajeFeedback.textContent = "¡Correcto!";
  } else {
    botonElegido.classList.add("opcion-incorrecta");
    mensajeFeedback.textContent = "Incorrecto.";
  }
 
  mensajeFeedback.classList.remove("oculta");
  btnSiguiente.classList.remove("oculta");
 
  // Si la pregunta tiene un personaje asociado, buscamos un dato curioso extra
  if (pregunta.personajeParaExtra) {
    mensajeFeedback.textContent += " Buscando un dato curioso...";
    const dato = await obtenerDatoCurioso(pregunta.personajeParaExtra);
    if (dato) {
      mensajeFeedback.textContent = mensajeFeedback.textContent.replace(
        " Buscando un dato curioso...",
        " Dato curioso: " + dato
      );
    } else {
      mensajeFeedback.textContent = mensajeFeedback.textContent.replace(
        " Buscando un dato curioso...",
        ""
      );
    }
  }
}
 
// Cuando se hace clic en "Siguiente pregunta"
btnSiguiente.addEventListener("click", () => {
  indicePreguntaActual++;
 
  if (indicePreguntaActual < preguntasActuales.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});
 
// Muestra la pantalla final con el puntaje obtenido
function mostrarResultado() {
  puntajeFinalSpan.textContent = puntajeActual;
  totalPreguntasFinalSpan.textContent = preguntasActuales.length;
  mostrarPantalla("pantalla-resultado");
}
 
// Cuando se hace clic en "Jugar de nuevo"
btnJugarDeNuevo.addEventListener("click", () => {
  mostrarPantalla("pantalla-inicio");
});
 
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
 
    mostrarPantalla("pantalla-juego");
    mostrarPregunta();
  });
});
 
 