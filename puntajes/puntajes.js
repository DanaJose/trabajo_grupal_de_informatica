// ========================================
// PÁGINA DE PUNTAJES — Tabla de posiciones
// ========================================

// Se incorpora la bandera de los equipos, pero más pequeña
// Si no le cambiamos los nueve colores sugiero cambiarle el tamaño ya que esta muy amplia
function generarMiniBandera(colores) {
  const cuadraditos = colores
    .map(color => `<div style="background-color: ${color};"></div>`)
    .join("");
  return `<div class="mini-bandera">${cuadraditos}</div>`;
}
 
// Junta los récords de los tres juegos y arma una fila por cada equipo
// que haya jugado al menos uno de ellos.
function mostrarTablaEquipos() {
  const puntaCartas = JSON.parse(localStorage.getItem("puntaCartas")) || {};
  const puntaDados = JSON.parse(localStorage.getItem("puntaDados")) || {};
  const puntaPreguntas = JSON.parse(localStorage.getItem("puntaPreguntas")) || {};
 
  // Juntamos las claves de equipo de los tres juegos, sin repetir
  const todasLasClaves = new Set([
    ...Object.keys(puntaCartas),
    ...Object.keys(puntaDados),
    ...Object.keys(puntaPreguntas)
  ]);
 
  const cuerpoTabla = document.querySelector("#tabla-equipos tbody");
  cuerpoTabla.innerHTML = "";
 
  if (todasLasClaves.size === 0) {
    cuerpoTabla.innerHTML = `<tr><td colspan="4">Todavía nadie jugó ningún juego.</td></tr>`;
    return;
  }
 
    todasLasClaves.forEach(clave => {
    const colores = JSON.parse(clave); // volvemos el string a array de colores

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${generarMiniBandera(colores)}</td>
      <td>${puntaCartas[clave]?.puntaje ?? "-"}</td>
      <td>${puntaDados[clave]?.puntaje ?? "-"}</td>
      <td>${puntaPreguntas[clave]?.puntaje ?? "-"}</td>
    `;
    cuerpoTabla.appendChild(fila);
  });
 
mostrarTablaEquipos();
 
// Borra todos los puntajes guardados (botón a agregar en el HTML si no está)
function reiniciarPuntajes() {
  localStorage.removeItem("puntaDados");
  localStorage.removeItem("puntaPreguntas");
  localStorage.removeItem("puntaCartas");
  location.reload();
}

// Agregue el boton que faltaba
 
const btnReiniciarPuntajes = document.getElementById("btn-reiniciar-puntajes");
btnReiniciarPuntajes.addEventListener("click", reiniciarPuntajes);