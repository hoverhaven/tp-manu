let puntos = {
  nosotros: 0,
  ellos: 0
};

function sumar(equipo) {
  puntos[equipo]++;
  render(equipo);
  verificar();
}

function restar(equipo) {
  if (puntos[equipo] > 0) {
    puntos[equipo]--;
    render(equipo);
  }
}

function render(equipo) {
  let buenas = document.getElementById(`${equipo}-buenas`);
  let malas = document.getElementById(`${equipo}-malas`);

  buenas.innerHTML = "";
  malas.innerHTML = "";

  let total = puntos[equipo];

  let malasCount = Math.min(total, 15);
  let buenasCount = total > 15 ? total - 15 : 0;

  dibujarZona(malas, malasCount);
  dibujarZona(buenas, buenasCount);
}

function dibujarZona(contenedor, cantidad) {
  let grupos = Math.floor(cantidad / 5);
  let resto = cantidad % 5;

  for (let i = 0; i < grupos; i++) {
    let grupo = document.createElement("div");
    grupo.classList.add("grupo", "cruzado");

for (let j = 0; j < 5; j++) {
  let palito = document.createElement("div");
  palito.classList.add("palito");

  // animación caída
  palito.style.animationDelay = (Math.random() * 0.3) + "s";

  // algunos con "fuego"
  if (Math.random() > 0.6) {
    palito.classList.add("activo");
  }

  grupo.appendChild(palito);
}

    contenedor.appendChild(grupo);
  }

for (let i = 0; i < resto; i++) {
  let palito = document.createElement("div");
  palito.classList.add("palito");

  // animación caída
  palito.style.animationDelay = (Math.random() * 0.3) + "s";

  // algunos con "fuego"
  if (Math.random() > 0.6) {
    palito.classList.add("activo");
  }

  contenedor.appendChild(palito);
}
}

function verificar() {
  if (puntos.nosotros >= 30) {
    alert("Ganó Nosotros");
    reiniciar();
  }

  if (puntos.ellos >= 30) {
    alert("Ganó Ellos");
    reiniciar();
  }
}

function reiniciar() {
  puntos = { nosotros: 0, ellos: 0 };
  render("nosotros");
  render("ellos");
}

/* Inicial */
render("nosotros");
render("ellos");

// detectar lado de pantalla
function obtenerEquipo(x) {
  const mitad = window.innerWidth / 2;
  return x < mitad ? "nosotros" : "ellos";
}

let tiempoTouch = 0;
let ultimoToque = 0;

document.addEventListener("touchstart", (e) => {
  tiempoTouch = Date.now();
});

document.addEventListener("touchend", (e) => {
  const tiempoFinal = Date.now();
  const duracion = tiempoFinal - tiempoTouch;

  const toque = e.changedTouches[0];
  const equipo = obtenerEquipo(toque.clientX);

  // doble toque → reiniciar
  if (tiempoFinal - ultimoToque < 300) {
    reiniciar();
    ultimoToque = 0;
    return;
  }

  // toque largo → restar
  if (duracion > 500) {
    restar(equipo);
  } else {
    // toque corto → sumar
    sumar(equipo);
  }

  ultimoToque = tiempoFinal;

    // 💥 EFECTO VISUAL (ACÁ VA)
  let flash = document.createElement("div");
  flash.classList.add("flash");
  document.body.appendChild(flash);

  setTimeout(() => flash.remove(), 200);

});

document.addEventListener("click", (e) => {
  const equipo = obtenerEquipo(e.clientX);
  sumar(equipo);
});