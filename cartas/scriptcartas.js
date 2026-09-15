```js
let resultado = document.querySelector("#resultado");
let puntajeFinal = document.querySelector("#puntajeFinal");
let reiniciar = document.querySelector("#reiniciar");
let mensaje = document.querySelector("#mensaje");

reiniciar.style.display = "none";

let puntaje = 0;
let tiempo = 20;
let mostrarTiempo = document.querySelector("#tiempo");

let numeroBuscado = 7;
let ronda = 1;

let contenedorCartas = document.querySelector("#cartas");

let numerosRonda1 = [4, 9, 1, 7, 3, 10, 5, 2, 8, 6];

let numerosRonda2 = [12, 4, 19, 7, 2, 15, 9, 1, 18, 6, 13, 10, 5, 20, 3, 16, 8, 14, 11, 17];


function crearCartas(numeros) {

    numeros.forEach(function(numero) {

        let carta = document.createElement("button");

        carta.innerText = "?";

        carta.addEventListener("click", function() {

            carta.innerText = numero;

            if (numero == 5) {
                carta.innerText = "⭐";
                puntaje = puntaje + 10;

                alert("¡Felicidades! Sumaste 10 puntos.");
            }

            if (numero == numeroBuscado) {

                alert("¡Bien hecho, nivel desbloqueado!");

                ronda = 2;
                numeroBuscado = 2;

                mensaje.innerText = "Ahora busca el número 2";

                contenedorCartas.innerHTML = "";

                crearCartas(numerosRonda2);

                clearInterval(cronometro);

                tiempo = 10;
                mostrarTiempo.innerText = tiempo;

                cronometro = setInterval(function() {

                    tiempo--;
                    mostrarTiempo.innerText = tiempo;

                    if (tiempo == 0) {

                        clearInterval(cronometro);

                        alert("¡Oh no! Se acabó el tiempo.");

                        resultado.innerText = "FIN DE LA RONDA";

                        puntajeFinal.innerText = "Puntaje: " + puntaje + " puntos";

                        reiniciar.style.display = "block";
                    }

                }, 1000);
            }

        });

        contenedorCartas.appendChild(carta);
    });
}


crearCartas(numerosRonda1);


let cronometro = setInterval(function() {

    tiempo--;
    mostrarTiempo.innerText = tiempo;

    if (tiempo == 0) {

        clearInterval(cronometro);

        alert("¡Oh no! Se acabó el tiempo.");

        resultado.innerText = "FIN DE LA RONDA";

        puntajeFinal.innerText = "Puntaje: " + puntaje + " puntos";

        reiniciar.style.display = "block";
    }

}, 1000);


reiniciar.addEventListener("click", function() {

    location.reload();

})
