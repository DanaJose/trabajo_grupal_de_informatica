Artes multimediales UNA
INFORMATICA GENERAL. TP1
DRELICHMAN-TM 
Primer cuatrimestre -2026

MULTIJUEGOS.
Creado por:
* Juan Garcia
* Dana Jose Galindo
* Laura Prada

Descripción general del sitio
Multijuegos es un sitio web interactivo creado para que los usuarios puedan elegir entre tres opciones de juegos diferentes.
La página presenta tres juegos relacionados con personajes y elementos del universo de Mario Bros. Cada juego tiene una dinámica y reglas diferentes. El usuario puede seleccionar el juego que desea jugar y obtener un puntaje según su desempeño.
Nuestro objetivo general fue crear un sitio donde haya  una experiencia de entretenimiento interactiva a través de diferentes juegos desarrollados para la web.

Juego de dados
El objetivo es combinar tres personajes iguales de forma horizontal o vertical para sumar puntos y hacerlos desaparecer. Al tirar los dados aparecen personajes de Mario Bros., que pueden cambiarse de posición y seleccionarse para conservarlos antes del segundo tiro. En el tercer tiro, los personajes caen al tablero y se van acumulando desde abajo. Si se supera el límite del tablero, el juego termina.


Juego de cartas
El juego de cartas está dividido en dos rondas.
Primera ronda:
El jugador comienza con 10 cartas boca abajo. Debe dar vuelta las cartas hasta encontrar a la princesa, con tiempo determinado
Durante la ronda también puede encontrar:
* Una carta de hongo, que hace perder la partida
* Cartas que otorgan puntos.
El objetivo es encontrar a la princesa mientras se intenta conseguir la mayor cantidad de puntos posible.
Segunda ronda:

En la segunda ronda aparecen 20 cartas boca abajo y el jugador dispone de menos tiempo para encontrar a Mario.
Al dar vuelta las cartas, el jugador puede encontrar:
* A Mario, que permite ganar el juego.
* Cartas que otorgan puntos.
* La carta del hongo, que hace perder la partida
El objetivo principal de esta ronda es encontrar a Mario antes de que se termine el tiempo, si lo logras ganas el juego.


Juego de preguntas
En este juego se realizan preguntas de manera aleatoria.
Antes de comenzar, el jugador puede elegir el nivel de dificultad entre fail y difícil. Las preguntas se cosnstruyeron de manera manual y con el nombre de un personaje o dato que vincule a la API; la Api no podía realizar información más profunda sobre el juego por lo que se vinculo una cosntruida por los fans que genera dstos curiosos sobre el juego.
Las preguntas se seleccionan de acuerdo con el nivel elegido. El jugador debe responder las y, al finalizar, se le asigna un puntaje según su desempeño.


Para desarrollar el sitio se utilizaron:

* HTML: para crear la estructura de las páginas.
* CSS: para el diseño y la apariencia visual.
* JavaScript: para programar la interacción y el funcionamiento de los juegos.
* GitHub Desktop: para gestionar y organizar las versiones del proyecto.
* Librerías: (poner el nombre de la librería de sonidos)



Las principales funcionalidades del sitio son:
* Selección entre tres juegos.
* Interacción del usuario con los diferentes juegos.
* Sistema de puntaje.
* Selección de personajes en el juego de dados.
* Combinación de tres figuras iguales.
* Desaparición de figuras al formar combinaciones.
* Sistema de rondas en el juego de cartas.
* Cartas con diferentes efectos.
* Temporizador en las rondas del juego de cartas.
* Selección de dificultad en el juego de preguntas.
* Selección aleatoria de preguntas.
* Cálculo del puntaje final.

API utilizada:

1. Documentación general de la tecnología (MediaWiki API): https://www.mediawiki.org/wiki/API:Action_API
2. La documentación: https://www.mariowiki.com/api.php?action=help&modules=query
3. Las condiciones de uso / copyright de la wiki: MarioWiki:Copyrights

La API de MediaWiki expuesta por mariowiki.com (una wiki de fans, no oficial de Nintendo), investigamos y antes había una pero cerro el año pasado, la información que obtenemos son extractos de texto de artículos de personajes/juegos de Mario (prop=extracts) se consulta mediante un fetch() con la URL armada dinámicamente según el personaje de la pregunta, usando origin=* para esquivar CORS; los datos fueron procesados parseando el JSON, navegan query.pages, extraen el campo extract, y se quedan con la primera línea como "dato curioso".

Decisiones técnicas realizadas:

- Verificación previa de endpoints: antes de integrar la API, se probó manualmente en la consola del navegador (fetch directo) para confirmar que respondía bien con origin=*, evitando descubrir el problema de CORS recién al integrarlo en el juego.
  
- Nombres de página verificados de antemano: cada personajeParaExtra se confirmó como título exacto existente en la wiki antes de usarlo, para no depender de búsquedas difusas (list=search) que devuelven resultados poco predecibles (ej. buscar "Bowser" trae también "Giant Bowser", "Dry Bowser", etc.).
  
- Caso especial — redirects: la página Power-up es en realidad un redirect hacia List of power-ups; se usó directamente el título de destino para evitar depender del parámetro redirects=1.
      


Declaración sobre el uso de IA

chat gpt y cloude fueron las inteligencias artificiales que usamos  como herramientas de apoyo durante el desarrollo de Multijuegos. 
Principalmente las usamos para ejercicios matemáticos de javascript, para consejos sobre la organización del sitio

Las respuestas y propuestas obtenidas fueron revisadas por el grupo y, cuando era necesarios las descartabamos olas implementabamos teniendo en cuenta las necesidades del proyecto y las decisiones tomadas por los integrantes

Etapas:

- Dentro de la primera etapa se le pidio que nos hiciera un cronograma de organización con el tiempo para llegar a tiempo con las etapas.
- A medida que fuimos trabajando, fuimos organizando algunas esrructuras de manera que fuer coherente y en mano con la consigna, por lo que a la mitad pedimos una evaluación
- Como cada quien se fue encargando de un juego, se hicieron css individuales, lo que se le pidio a Claude que las inificara y diera buenas prácticas para el manejo de nombres en común que no chocaran, cosa que había ocurrido y por lo que fue de gran ayuda para localizar dichos errores y poder mantener una mejor organización
- En la etapa de los puntajes fue de gran acompañante para pedirle mejores ideas de creación de js, de lo cual pudimos tomar ideas e ir de nuestra mano con consejos
-  A la hora de construir los sonidos, el bando de sonidos fue descargado y colocado en una carpeta mp3, como un tema no tan claro se le pidio consejo y a partir de sus sugerencias se entendio el manejo para luego poder seguir construyendo de manera manual y con ayuda en momentos en que fue necesario
-  Se revisaron que las estructuras del código estuvieran bien organizadas y sin código basura u interfiriendo, en lo que se encontraron llaves sin colocar o faltantes de algún signo en comentarios que perjudicaban a algún comando
- Para el diseño de la página no se utilizo la IA y támpoco se le mostro para que nos de una retroalimentación final, la maquetación previa se hizo en CANVA para darnos una guía que fue util para tener claridad en pedidos exactos a la IA
