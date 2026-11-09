
function guardarCookie(nombre, valor, dias) {
  let cookie = `${nombre}=${encodeURIComponent(valor)}`;
  cookie += `; max-age=${dias * 24 * 60 * 60}`;
  cookie += "; path=/";
  document.cookie = cookie;
}
function leerCookie(nombre) {
  const lista = document.cookie.split("; ");

  for (let i = 0; i < lista.length; i++) {
    const posicion = lista[i].indexOf("=");
    const nombreCookie = lista[i].substring(0, posicion);

    if (nombreCookie === nombre) {
      return decodeURIComponent(lista[i].substring(posicion + 1));
    }
  }

  return null;
}

function obtenerCitas() {
  const texto = leerCookie("citas");

  if (texto === null) {
    return [];
  }

  const planos = JSON.parse(texto);
  const citas = [];

  for (let i = 0; i < planos.length; i++) {
    citas.push(citaDesdeObjeto(planos[i]));
  }

  return citas;
}

function guardarCitas(citas) {
  guardarCookie("citas", JSON.stringify(citas), 30);
}