let puntaje = 0;
let numeroBuscado = 7;
let contenedorCartas = document.querySelector("#cartas");

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numeros.forEach(function(numero) {
    let carta = document.createElement("button");

    carta.innerText = "?";

    carta.addEventListener("click", function() {
        carta.innerText = numero;

        if (numero == numeroBuscado) {
            alert("¡Bien hecho, nivel desbloqueado!");
        }
    });

    contenedorCartas.appendChild(carta);
});