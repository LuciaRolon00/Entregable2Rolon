// PREGUNTAS 
const preguntas = [
    {
        image: "eevee.png",
        opcionCorrecta: "Eevee"
    },
];

// OPCIONES 
const opcionesArray = [
    "Alakazam", "Arcanine", "Bulbasaur", "Cubone", "Ditto", "Gloom", "Gyarados", "Hitmonlee", "Horsea", "Koffing", "Mewtwo", "Pikachu", "Seaking", "Tauros", "Venonat", "Victreebe", "Eevee", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
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

// Opciones aleatorias del array
const generadorAleatorio = (array) => array[Math.floor(Math.random() * array.length)];
const mezclaAleatoria = (array) => array.sort(() => 0.5 - Math.random());

// Empezar juego
const iniciarJuego = () => {
    puntosContainer.classList.add("hide")
    juegoContainer.classList.remove("hide")
    preguntasFinal = llenarPreguntas();
    puntos = 0;
    preguntaActual = 0;
    llenarPreguntas(preguntasFinal[preguntaActual]);
};

// Crear opciones
const llenarPreguntas = (opcionCorrecta) => {
    let arr = [];
    arr.push(opcionCorrecta);
    let cantidadOpciones = 1;
    while (cantidadOpciones < 4) {
    let valorAleatorio = generadorAleatorio(opcionesArray);
    if (!arr.includes(valorAleatorio)) {
      arr.push(valorAleatorio);
      cantidadOpciones += 1;
    }
  }
  return arr;
}