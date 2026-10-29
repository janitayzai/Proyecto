const preguntas = [
  {
    pregunta: "¿Dónde nació San Pompilio María Pirrotti y por qué adoptó ese nombre?",
    opciones: [
      "Nació en Nápoles y lo tomó al ordenarse sacerdote",
      "Nació en Montecalvo Irpino y lo tomó en recuerdo de un hermano que había fallecido",
      "Nació en Ortona y lo eligió en honor a San José de Calasanz",
      "Nació en Campi Salentina y lo tomó de su padre"
    ],
    correcta: 1
  },
  {
    pregunta: "¿A qué edad fue ordenado sacerdote?",
    opciones: ["A los 15 años", "A los 20 años", "A los 24 años", "A los 30 años"],
    correcta: 2
  },
  {
    pregunta: "Según su obra, ¿qué entendía San Pompilio que era la educación?",
    opciones: [
      "Solo transmitir conocimientos",
      "Una forma de servir a los demás y contribuir a su formación humana y espiritual",
      "Una obligación impuesta por su congregación",
      "Un medio para ganarse la vida"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué hizo durante una época de hambre en Campi Salentina?",
    opciones: [
      "Organizó una colecta en toda la región",
      "Repartió su propia comida con quienes no tenían lo suficiente",
      "Abrió un comedor comunitario",
      "Viajó a Nápoles para pedir ayuda"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué afirmación sobre el final de su vida y su legado es correcta?",
    opciones: [
      "Murió en Nápoles en 1739 y fue olvidado por la comunidad",
      "Murió el 15 de julio de 1766 en Campi Salentina y muchas personas continuaron considerándolo un santo",
      "Murió en Ortona en 1766 y dejó de ser recordado como educador",
      "Murió en Montecalvo Irpino en 1710 y su obra fue continuada solo por los escolapios"
    ],
    correcta: 1
  }
];

const formulario = document.getElementById("formulario-quiz");
const preguntaTexto = document.getElementById("pregunta-texto");
const opcionesContenedor = document.getElementById("opciones-quiz");
const progreso = document.getElementById("progreso-quiz");
const botonSiguiente = document.getElementById("siguiente-quiz");
const resultado = document.getElementById("resultado-quiz");
const botonReiniciar = document.getElementById("reiniciar-quiz");

let preguntaActual = 0;
let puntaje = 0;
let respondida = false;

function mostrarPregunta() {
    respondida = false;

    const pregunta = preguntas[preguntaActual];

    preguntaTexto.textContent =
        (preguntaActual + 1) + ". " + pregunta.pregunta;

    progreso.textContent =
        "Pregunta " + (preguntaActual + 1) +
        " de " + preguntas.length;

    opcionesContenedor.innerHTML = "";
    botonSiguiente.disabled = true;
    botonSiguiente.textContent =
        preguntaActual === preguntas.length - 1
            ? "Ver resultado"
            : "Siguiente pregunta";

    pregunta.opciones.forEach(function (opcion, indice) {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "opcion-quiz";
        boton.textContent = opcion;

        boton.addEventListener("click", function () {
            comprobarRespuesta(indice);
        });

        opcionesContenedor.appendChild(boton);
    });
}

function comprobarRespuesta(indiceElegido) {
    if (respondida) {
        return;
    }

    respondida = true;

    const pregunta = preguntas[preguntaActual];
    const botones = opcionesContenedor.querySelectorAll("button");

    botones.forEach(function (boton, indice) {
        boton.disabled = true;

        if (indice === pregunta.correcta) {
            boton.classList.add("correcta");
        } else if (indice === indiceElegido) {
            boton.classList.add("incorrecta");
        }
    });

    const mensaje = document.createElement("p");
    mensaje.className = "explicacion-quiz";

    if (indiceElegido === pregunta.correcta) {
        puntaje++;
        mensaje.textContent = "¡Correcto! " + pregunta.explicacion;
    } else {
        mensaje.textContent =
            "Incorrecto :( " + pregunta.explicacion;
    }

    opcionesContenedor.appendChild(mensaje);
    botonSiguiente.disabled = false;
}

function mostrarResultado() {
    formulario.hidden = true;
    resultado.hidden = false;

    resultado.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = "¡Terminaste el cuestionario!";

    const puntajeTexto = document.createElement("p");
    puntajeTexto.textContent =
        "Tu puntaje: " + puntaje + " de " + preguntas.length;

    const mensaje = document.createElement("p");

    if (puntaje === preguntas.length) {
        mensaje.textContent =
            "¡Felicitaciones! Sabes demasiado.";
    } else if (puntaje >= 4) {
        mensaje.textContent =
            "¡Muy bien! Aprendiste muchos datos sobre su vida.";
    } else {
        mensaje.textContent =
            "¡Buen intento! Podés releer la página y volverlo a intentar.";
    }

    resultado.append(titulo, puntajeTexto, mensaje);
    resultado.focus();
}

botonSiguiente.addEventListener("click", function () {
    if (!respondida) {
        return;
    }

    if (preguntaActual < preguntas.length - 1) {
        preguntaActual++;
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
});

botonReiniciar.addEventListener("click", function () {
    preguntaActual = 0;
    puntaje = 0;

    resultado.hidden = true;
    formulario.hidden = false;

    mostrarPregunta();
});

mostrarPregunta();