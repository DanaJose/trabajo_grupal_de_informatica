let resultado = document.querySelector("#resultado");
let puntajeFinal = document.querySelector("#puntajeFinal");
let reiniciar = document.querySelector("#reiniciar");
let mensaje = document.querySelector("#mensaje");

reiniciar.style.display = "none";

let puntaje = 0;
let tiempo = 20;
let mostrarTiempo = document.querySelector("#tiempo");

let ronda = 1;

let juegoTerminado = false;

let contenedorCartas = document.querySelector("#cartas");


// CARTAS DE LA RONDA 1
let cartasRonda1 = [
    4,
    9,
    "estrella",
    "princesa",
    3,
    "hongo",
    5,
    2,
    "mario",
    10
];


// CARTAS DE LA RONDA 2
let cartasRonda2 = [
    2,
    4,
    9,
    "estrella",
    8,
    3,
    "hongo",
    8,
    10,
    "mario",
    5,
    2,
    4,
    "luna",
    9,
    "princesa"
];


function crearCartas(cartas) {

    cartas.forEach(function(numero) {

        let carta = document.createElement("button");

        let imagen = document.createElement("img");

        // La carta empieza mostrando el reverso
        imagen.src = "img/reverso.png";

        carta.appendChild(imagen);


        carta.addEventListener("click", function() {

            // Si el juego terminó, no permite hacer click
            if (juegoTerminado) {
                return;
            }


            // Mostramos la imagen correspondiente
            if (numero == "estrella") {

                imagen.src = "img/estrella.png";

            } else if (numero == "princesa") {

                imagen.src = "img/princesa.png";

            } else if (numero == "hongo") {

                imagen.src = "img/hongo.png";

            } else if (numero == "mario") {

                imagen.src = "img/mario.png";

            } else if (numero == "luna") {

                imagen.src = "img/luna.png";

            } else {

                imagen.src = "img/" + numero + ".png";
            }


            // ESTRELLA
            if (numero == "estrella") {

                puntaje = puntaje + 10;

                alert("¡Encontraste una estrella! Sumaste 10 puntos.");
            }


            // HONGO
            if (numero == "hongo") {

                juegoTerminado = true;

                clearInterval(cronometro);

                alert("¡Oh no! Elegiste el hongo y perdiste.");

                resultado.innerText = "FIN DEL JUEGO";

                puntajeFinal.innerText =
                    "Tu puntaje es " + puntaje + " puntos";

                reiniciar.style.display = "block";
            }


            // LUNA
            if (numero == "luna") {

                puntaje = puntaje + 10;

                alert("¡Encontraste la luna! Sumaste 10 puntos.");
            }


            // PRINCESA
            if (ronda == 1 && numero == "princesa") {

                alert("¡Encontraste a la princesa! Desbloqueaste la segunda ronda.");

                ronda = 2;

                mensaje.innerText = "Ahora busca a Mario";

                contenedorCartas.innerHTML = "";

                crearCartas(cartasRonda2);

                clearInterval(cronometro);

                tiempo = 10;

                mostrarTiempo.innerText = tiempo;


                cronometro = setInterval(function() {

                    tiempo--;

                    mostrarTiempo.innerText = tiempo;


                    if (tiempo == 0) {

                        juegoTerminado = true;

                        clearInterval(cronometro);

                        alert("¡Oh no! Se acabó el tiempo.");

                        resultado.innerText = "FIN DE LA RONDA";

                        puntajeFinal.innerText =
                            "Puntaje: " + puntaje + " puntos";

                        reiniciar.style.display = "block";
                    }

                }, 1000);
            }


            // MARIO
            if (ronda == 2 && numero == "mario") {

                juegoTerminado = true;

                clearInterval(cronometro);

                // Aparece el alert
                alert("¡Buen trabajo! Mario ha sido encontrado");

                // Desaparecen las cartas
                contenedorCartas.innerHTML = "";

                // Aparece el mensaje
                resultado.innerText =
                    "¡Encontraste a Mario! ¡Ahora puede estar junto a la princesa! ❤️";
                    mensaje.innerText = ""; 

                // Aparece la imagen de la pareja
                let pareja = document.createElement("img");

                pareja.src = "img/pareja.png";

                pareja.classList.add("pareja");

                resultado.appendChild(document.createElement("br"));

                resultado.appendChild(pareja);


                // Aparecen los corazones
                for (let i = 0; i < 6; i++) {

                    let corazon = document.createElement("span");

                    corazon.innerText = "❤️";

                    corazon.classList.add("corazon");

                    corazon.style.setProperty(
                        "--x",
                        (Math.random() * 300 - 150) + "px"
                    );

                    corazon.style.setProperty(
                        "--y",
                        (Math.random() * -150 - 50) + "px"
                    );

                    resultado.appendChild(corazon);
                }


                // Aparece el puntaje
                puntajeFinal.innerText =
                    "Tu puntaje es " + puntaje + " puntos";

                // Aparece reiniciar
                reiniciar.style.display = "block";
            }

        });


        contenedorCartas.appendChild(carta);
    });
}


// EMPIEZA LA RONDA 1
crearCartas(cartasRonda1);


// CRONÓMETRO DE 1ra RONDA
let cronometro = setInterval(function() {

    tiempo--;

    mostrarTiempo.innerText = tiempo;


    if (tiempo == 0) {

        juegoTerminado = true;

        clearInterval(cronometro);

        alert("¡Oh no! Se acabó el tiempo.");

        resultado.innerText = "FIN DE LA RONDA";

        puntajeFinal.innerText =
            "Puntaje: " + puntaje + " puntos";

        reiniciar.style.display = "block";
    }

}, 1000);


// BOTÓN REINICIAR
reiniciar.addEventListener("click", function() {

    location.reload();

});