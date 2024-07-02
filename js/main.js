// PREGUNTAS e IMAGENES
const preguntas = [
  {
    image: "Alakazam.jpg",
    opcion_correcta: "Alakazam",
  },
  {
    image: "Arcanine.jpg",
    opcion_correcta: "Arcanine",
  },
  {
    image: "Bulbasaur.jpg",
    opcion_correcta: "Bulbasaur",
  },
  {
    image: "Cubone.jpg",
    opcion_correcta: "Cubone",
  },
  {
    image: "Ditto.jpg",
    opcion_correcta: "Ditto",
  },
  {
    image: "Gloom.jpg",
    opcion_correcta: "Gloom",
  },
  {
    image: "Gyarados.jpg",
    opcion_correcta: "Gyarados",
  },
  {
    image: "Hitmonlee.jpg",
    opcion_correcta: "Hitmonlee",
  },
  {
    image: "Horsea.jpg",
    opcion_correcta: "Horsea",
  },
  {
    image: "Koffing.jpg",
    opcion_correcta: "Koffing",
  },
  {
    image: "Mewtwo.jpg",
    opcion_correcta: "Mewtwo",
  },
  {
    image: "Seaking.jpg",
    opcion_correcta: "Seaking",
  },
  {
    image: "Tauros.jpg",
    opcion_correcta: "Tauros",
  },
  {
    image: "Venonat.jpg",
    opcion_correcta: "Venonat",
  },
  {
    image: "Victreebel.jpg",
    opcion_correcta: "Victreebel",
  },
  {
    image: "eevee.png",
    opcion_correcta: "Eevee",
  },
];

// OPCIONES 
const opcionesArray = [
  "Alakazam",
  "Arcanine",
  "Bulbasaur",
  "Cubone",
  "Ditto",
  "Gloom",
  "Gyarados",
  "Hitmonlee",
  "Horsea",
  "Koffing",
  "Mewtwo",
  "Pikachu",
  "Seaking",
  "Tauros",
  "Venonat",
  "Victreebe",
  "eevee",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
];

// Selección de elementos del DOM
const container = document.querySelector(".container");
const juegoContainer = document.querySelector(".juego-container");
const startButton = document.getElementById("start");
const puntosContainer = document.querySelector(".puntos-container");
const puntosUsuario = document.getElementById("puntos-usuario");

// Declaración de variables 
let timer = document.getElementsByClassName("timer")[0];
let botonSgte;
let puntos, preguntaActual, preguntasFinal;
let cuentaRegresiva, contar = 11;

// Opciones aleatorias del array
const generadorValorAleatorio = (array) => array[Math.floor(Math.random() * array.length)];
const mezclaAleatoria = (array) => array.sort(() => 0.5 - Math.random());

// Función de orden superior para temporizador
const crearTimer = (duracion, onTiempoTerminado) => {
  let contador = duracion;
  cuentaRegresiva = setInterval(() => {
    contador -= 1;
    timer.innerHTML = `<span>Tiempo: </span>${contador}s`;
    if (contador == 0) {
      clearInterval(cuentaRegresiva);
      onTiempoTerminado();
    }
  }, 1000);
};

const mostrarTimer = () => {
  crearTimer(11, siguientePregunta);
};

// Función de orden superior para llenar opciones
const llenarOpcionesConFiltro = (opcion_correcta, filtro) => {
  let arr = [opcion_correcta];
  while (arr.length < 4) {
    let valorAleatorio = generadorValorAleatorio(opcionesArray);
    if (!arr.includes(valorAleatorio) && filtro(valorAleatorio)) {
      arr.push(valorAleatorio);
    }
  }
  return arr;
};

const llenarOpciones = (opcion_correcta) => {
  return llenarOpcionesConFiltro(opcion_correcta, () => true);
};

// Empezar juego
const iniciarJuego = () => {
  puntosContainer.classList.add("hide");
  juegoContainer.classList.remove("hide");
  preguntasFinal = llenarPreguntas();
  puntos = 0;
  preguntaActual = 0;
  // Que salga la primera pregunta
  genTarjeta(preguntasFinal[preguntaActual]);
};

// Preguntas Aleatorias
const llenarPreguntas = () => {
  let preguntasCuenta = 0;
  let objetosElegidos = [];
  let lotePreguntas = [];
  //5 preguntas
  while (preguntasCuenta < 5) {
    let valorAleatorio = generadorValorAleatorio(preguntas);
    let index = preguntas.indexOf(valorAleatorio);
    if (!objetosElegidos.includes(index)) {
      lotePreguntas.push(valorAleatorio);
      objetosElegidos.push(index);
      preguntasCuenta += 1;
    }
  }
  return lotePreguntas;
};

// Comprobar respuesta seleccionada
const comprobar = (e) => {
  let solucionUsuario = e.target.innerText;
  let opciones = document.querySelectorAll(".opcion");
  if (solucionUsuario === preguntasFinal[preguntaActual].opcion_correcta) {
    e.target.classList.add("correcto");
    puntos++;
  } else {
    e.target.classList.add("incorrecto");
    opciones.forEach((element) => {
      if (element.innerText == preguntasFinal[preguntaActual].opcion_correcta) {
        element.classList.add("correcto");
      }
    });
  }

  clearInterval(cuentaRegresiva);
  // Deshabilitar todas las opciones
  opciones.forEach((element) => {
    element.disabled = true;
  });
};

// Siguiente pregunta
const siguientePregunta = (e) => {
  preguntaActual += 1;
  if (preguntaActual == preguntasFinal.length) {
    juegoContainer.classList.add("hide");
    puntosContainer.classList.remove("hide");
    startButton.innerText = `RESTART`;
    puntosUsuario.innerHTML = "Tus puntos son " + puntos + " de " + preguntaActual;
    clearInterval(cuentaRegresiva);
  } else {
    genTarjeta(preguntasFinal[preguntaActual]);
  }
};

// Función de orden superior para crear tarjetas de preguntas
const crearTarjeta = (objetoTarjeta, generarOpciones) => {
  const { image, opcion_correcta } = objetoTarjeta;
  let opciones = mezclaAleatoria(generarOpciones(opcion_correcta));
  container.innerHTML = `<div class="quiz">
    <p class="num">${preguntaActual + 1}/5</p>
    <div class="preguntas">
      <img class="pokemon-image" src="${image}"/>
    </div>
    <div class="opciones">
      <button class="opcion" onclick="comprobar(event)">${opciones[0]}</button>
      <button class="opcion" onclick="comprobar(event)">${opciones[1]}</button>
      <button class="opcion" onclick="comprobar(event)">${opciones[2]}</button>
      <button class="opcion" onclick="comprobar(event)">${opciones[3]}</button>
    </div>
    <div class="div-btn-sgte">
      <button class="botonSgte" onclick="siguientePregunta(event)">Next</button>
    </div>
  </div>`;

  contar = 11;
  clearInterval(cuentaRegresiva);
  mostrarTimer();
};

const genTarjeta = (objetoTarjeta) => {
  crearTarjeta(objetoTarjeta, llenarOpciones);
};

startButton.addEventListener("click", iniciarJuego);