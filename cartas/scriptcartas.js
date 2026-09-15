let resultado = document.querySelector("#resultado");
let puntajeFinal = document.querySelector("#puntajeFinal");
let reiniciar = document.querySelector("#reiniciar");
let mensaje = document.querySelector("#mensaje");

reiniciar.style.display = "none";

let puntaje = 0;
let tiempo = 20;
let mostrarTiempo = document.querySelector("#tiempo");

let ronda = 1;

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
    8,
    6
];


// CARTAS DE LA RONDA 2
let cartasRonda2 = [
    2,
    4,
    9,
    "estrella",
    6,
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
    6
];


function crearCartas(cartas) {

    cartas.forEach(function(numero) {

        let carta = document.createElement("button");

        let imagen = document.createElement("img");

        // La carta empieza mostrando el reverso
        imagen.src = "img/reverso.png";

        carta.appendChild(imagen);


        carta.addEventListener("click", function() {

            // Mostramos la imagen correspondiente
            if (numero == "luna") {
                imagen.src = "img/luna.jpg";
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

                alert("¡Encontraste a la princesa! Ahora busca a Mario.");

                ronda = 2;

                mensaje.innerText = "Ahora busca a Mario";

                contenedorCartas.innerHTML = "";

                crearCartas(cartasRonda2);

                clearInterval(cronometro);

                tiempo = 15;

                mostrarTiempo.innerText = tiempo;


                cronometro = setInterval(function() {

                    tiempo--;

                    mostrarTiempo.innerText = tiempo;


                    if (tiempo == 0) {

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

                clearInterval(cronometro);

                alert("¡Encontraste a Mario! ¡Ahora puede estar junto a la princesa! ❤️");

                resultado.innerText = "¡FIN DEL JUEGO!";

                puntajeFinal.innerText =
                    "Tu puntaje es " + puntaje + " puntos";

                reiniciar.style.display = "block";
            }

        });


        contenedorCartas.appendChild(carta);
    });
}


// EMPEZAMOS LA RONDA 1
crearCartas(cartasRonda1);


// CRONÓMETRO DE LA PRIMERA RONDA
let cronometro = setInterval(function() {

    tiempo--;

    mostrarTiempo.innerText = tiempo;


    if (tiempo == 0) {

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


