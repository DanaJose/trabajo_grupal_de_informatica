// ========================================
// JUEGO DE PREGUNTAS 
// ========================================
 
// Estado del juego
let preguntasActuales = [];
let indicePreguntaActual = 0;
let puntajeActual = 0;
const SEGUNDOS_POR_PREGUNTA = 15;
let segundosRestantes = SEGUNDOS_POR_PREGUNTA;
let idIntervaloTimer = null;
let puntaPreguntas = 0;
 
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
const tiempoSpan = document.getElementById("tiempo");
 
// Muestra una pantalla (inicio, juego o resultado) y oculta las demás
function mostrarPantalla(idPantalla) {
  document.querySelectorAll(".pantalla").forEach(pantalla => {
    pantalla.classList.remove("activa");
  });
  document.getElementById(idPantalla).classList.add("activa");
}
 
// Dibuja en el HTML la pregunta que corresponde al índice actual
function mostrarPregunta() {
    iniciarTimer();
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
 let racha = 0;
async function verificarRespuesta(indiceElegido, indiceCorrecto, botonElegido) {
  // Deshabilitamos todos los botones para que no se pueda responder dos veces
   detenerTimer();
  const todosLosBotones = contenedorOpciones.querySelectorAll("button");
  todosLosBotones.forEach((boton, indice) => {
    boton.disabled = true;
    if (indice === indiceCorrecto) {
      boton.classList.add("correcta");
    }
  });
 
  const esCorrecta = indiceElegido === indiceCorrecto;
  const pregunta = preguntasActuales[indicePreguntaActual];

  if (esCorrecta) {
    racha++;
    puntajeActual = puntajeActual + 100*racha;
    puntajeActualSpan.textContent = puntajeActual;
    mensajeFeedback.textContent = "¡Correcto!";
    } else {
    if (botonElegido) {
      botonElegido.classList.add("incorrecta");
    }
    mensajeFeedback.textContent = botonElegido ? "Incorrecto" : "¡Se acabó el tiempo!";
    racha = 0;
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
   if (puntajeActual>puntaPreguntas){
    localStorage.setItem(
    "puntaPreguntas",
    JSON.stringify(puntaPreguntas)
);
   }
    mostrarResultado();
  }
});

// Arranca (o reinicia) la cuenta regresiva para la pregunta actual
function iniciarTimer() {
  detenerTimer(); // por si quedó uno corriendo de la pregunta anterior

  segundosRestantes = SEGUNDOS_POR_PREGUNTA;
  tiempoSpan.textContent = segundosRestantes;

  idIntervaloTimer = setInterval(() => {
    segundosRestantes--;
    tiempoSpan.textContent = segundosRestantes;

    if (segundosRestantes <= 0) {
            detenerTimer();
      const pregunta = preguntasActuales[indicePreguntaActual];
      verificarRespuesta(-1, pregunta.correcta, null);
    }
  }, 1000);
}

// Frena el intervalo activo, para no acumular varios corriendo a la vez
function detenerTimer() {
  if (idIntervaloTimer !== null) {
    clearInterval(idIntervaloTimer);
    idIntervaloTimer = null;
  }
}
 
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

// Aca guarda el puntaje de record por bandera
function guardarPuntajeSiEsRecord() {
  // 1. Identificamos qué equipo está jugando ahora
  const equipo = JSON.parse(localStorage.getItem("equipo"));
  if (!equipo) {
    console.log("No hay equipo elegido, no se guarda el puntaje.");
    return;
  }
  const claveEquipo = JSON.stringify(equipo);

  // 2. Leemos los récords ya guardados (o un objeto vacío si es la primera vez)
  const todosLosRecords = JSON.parse(localStorage.getItem("puntaPreguntas")) || {};

  // 3. Comparamos contra el récord anterior de ESTE equipo
  const recordAnterior = todosLosRecords[claveEquipo];

  if (!recordAnterior || puntajeActual > recordAnterior.puntaje) {
    todosLosRecords[claveEquipo] = {
      puntaje: puntajeActual,
      fecha: new Date().toLocaleDateString("es-AR")
    };
    localStorage.setItem("puntaPreguntas", JSON.stringify(todosLosRecords));
    console.log("¡Nuevo récord guardado para este equipo!", todosLosRecords[claveEquipo]);
  } else {
    console.log("No superó el récord anterior:", recordAnterior);
  }
}
 
 
