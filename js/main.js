// PREGUNTAS e IMAGENES
const preguntas = [
  {
    image: "eevee.png",
    opcionCorrecta: "Eevee"
  },
];

// OPCIONES 
const opcionesArray = [
  "Alakazam", "Arcanine", "Bulbasaur", "Cubone", "Ditto", "Gloom", "Gyarados", "Hitmonlee", "Horsea", "Koffing", "Mewtwo", "Pikachu", "Seaking", "Tauros", "Venonat", "Victreebe", "Eevee", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Magikarp",
]

// Selección de elementos del DOM
const container = document.querySelector(".container");
const juegoContainer = document.querySelector(".juego-container");
const startButton = document.getElementById("start");
const puntosContainer = document.getElementById(".puntos-container");
const puntosUsuario = document.getElementById(".puntos-usuario");

// Declaración de variables 
let botonSgte;
let puntos, preguntaActual, preguntasFinal;
let timer = document.getElementsByClassName("timer")[0];
let cuentaRegresiva, cuenta = 11;

// Opciones aleatorias del array
const generadorValorAleatorio = (array) => array[Math.floor(Math.random() * array.length)];
const mezclaAleatoria = (array) => array.sort(() => 0.5 - Math.random());

// Empezar juego
const iniciarJuego = () => {
  puntosContainer.classList.add("hide")
  juegoContainer.classList.remove("hide")
  preguntasFinal = llenarPreguntas();
  puntos = 0;
  preguntaActual = 0;
  // Que salga la primera pregunta
  generadorTarjeta(preguntasFinal[preguntaActual]);
};

// TIMER
const mostrarTiempo = () => {
  cuentaRegresiva = setInterval(() => {
    cuenta -= 1;
    timer.innerHTML = `<span>Tiempo restante: </span>${cuenta}s`;
    if (cuenta == 0) {
      clearInterval(cuentaRegresiva);
      siguientePregunta();
    }
  }, 1000);
};

// Crear opciones
const llenarOpciones = () => {
  let arr = [];
  arr.push(opcionCorrecta);
  let cantidadOpciones = 1;
  while (cantidadOpciones < 4) {
    let valorAleatorio = generadorValorAleatorio(opcionesArray);
    if (!arr.includes(valorAleatorio)) {
      arr.push(valorAleatorio);
      cantidadOpciones += 1;
    }
  }
  return arr;
}

// Preguntas Aleatorias
const llenarPreguntas = () => {
  let cantidadPreguntas = 0;
  let objetosElegidos = [];
  let lotePreguntas = [];
  while (cantidadPreguntas < 5) {
    let valorAleatorio = generadorValorAleatorio(preguntas);
    let indice = preguntas.indexOf(valorAleatorio);
    if (!objetosElegidos.includes(indice)) {
      lotePreguntas.push(valorAleatorio);
      objetosElegidos.push(indice);
      cantidadPreguntas += 1;
    }
  }
  return lotePreguntas;
};

//Comprobar respuesta seleccionada
const comprobar = (e) => {
  let solucionUsuario = e.target.innerText;
  let opciones = document.querySelectorAll(".option");
  if (solucionUsuario === preguntasFinal[preguntaActual].opcionCorrecta) {
    e.target.classList.add("Correcta");
    puntaje++;
  } else {
    e.target.classList.add("Incorrecta");
    opciones.forEach((element) => {
      if (element.innerText == preguntasFinal[preguntaActual].opcion_correcta) {
        element.classList.add("Correcta");
      }
    });
  }

  clearInterval(cuentaRegresiva);
  //Deshabilitar todas las opciones
  opciones.forEach((element) => {
    element.disabled = true;
  });
};

//Siguiente pregunta
const siguientePregunta = (e) => {
  preguntaActual += 1;
  if (preguntaActual == preguntasFinal.length) {
    contenedorJuego.classList.add("hide");
    contenedorPuntaje.classList.remove("hide");
    botonInicio.innerText = `Reiniciar`;
    puntajeUsuario.innerHTML =
      "Tu puntaje es " + puntos + " de " + preguntaActual;
    clearInterval(cuentaRegresiva);
  } else {
    generadorTarjeta(preguntasFinal[preguntaActual]);
  }
};

// TARJETA
const generadorTarjeta = (objetoTarjeta) => {
  const { imagen, opcionCorrecta } = objetoTarjeta;
  let opciones = mezclaAleatoria(llenarOpciones(opcionCorrecta));
  container.innerHTML = `<div class="quiz">
  <p class="num">
  ${preguntaActual + 1}/5
  </p>
  <div class="preguntas">
    <img class="pokemon-imagen" src="${imagen}"/>
  </div>
  
  <div class="opciones">
    <button class="opcion" onclick="comprobar(event)">${opciones[0]}</button>
    <button class="opcion" onclick="comprobar(event)">${opciones[1]}</button>
    <button class="opcion" onclick="comprobar(event)">${opciones[2]}</button>
    <button class="opcion" onclick="comprobar(event)">${opciones[3]}</button>
  </div>
 
  <div class="div-btn-sgte">
    <button class="btnSgte" onclick="siguientePregunta(evento)">Siguiente</button>
  </div>

  </div>`;
}

startButton.addEventListener("click", iniciarJuego);