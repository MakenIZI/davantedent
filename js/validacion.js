const camposFormulario = ["dia", "mes", "anyo", "hora", "minuto", "fecha",
                          "nombre", "apellidos", "dni", "telefono",
                          "fechaNacimiento", "observaciones"];

function guardarSiEsValido() {
  limpiarErrores();
  if (validarFormulario()) {
    guardarCita();
  }
  return false;
}

function mostrarError(idCampo, mensaje) {
  const campo = document.getElementById(idCampo);
  if (campo !== null) {
    campo.className = "error";
  }

  const span = document.getElementById("error-" + idCampo);
  span.innerHTML = mensaje;
}

function limpiarError(id) {
  const campo = document.getElementById(id);
  if (campo !== null) {
    campo.className = "";
  }

  const span = document.getElementById("error-" + id);
  if (span !== null) {
    span.innerHTML = "";
  }
}

function limpiarErrores() {
  for (let i = 0; i < camposFormulario.length; i++) {
    limpiarError(camposFormulario[i]);
  }
}

function validarFormulario() {
  let valido = true;
  let fechaOk = true;

  // Validación día.
  const textoDia = document.getElementById("dia").value;
  const dia = Number(textoDia);

  if (textoDia === "") {
    mostrarError("dia", "Indica el día.");
    valido = false;
    fechaOk = false;
  } else if (dia < 1 || dia > 31) {
    mostrarError("dia", "El día debe estar entre 1 y 31.");
    valido = false;
    fechaOk = false;
  }

  // Validación mes.
  const textoMes = document.getElementById("mes").value;
  const mes = Number(textoMes);

  if (textoMes === "") {
    mostrarError("mes", "Indica el mes.");
    valido = false;
    fechaOk = false;
  } else if (mes < 1 || mes > 12) {
    mostrarError("mes", "El mes debe estar entre 1 y 12.");
    valido = false;
    fechaOk = false;
  }

  // Validación año.
  const textoAnyo = document.getElementById("anyo").value;
  const anyo = Number(textoAnyo);

  if (textoAnyo === "") {
    mostrarError("anyo", "Indica el año.");
    valido = false;
    fechaOk = false;
  } else if (anyo < 2026 || anyo > 2027) {
    mostrarError("anyo", "El año debe ser 2026 o 2027.");
    valido = false;
    fechaOk = false;
  }

  // Validación hora.
  const textoHora = document.getElementById("hora").value;
  const hora = Number(textoHora);

  if (textoHora === "") {
    mostrarError("hora", "Indica la hora.");
    valido = false;
    fechaOk = false;
  } else if (hora < 8 || hora > 20) {
    mostrarError("hora", "La clínica abre de 8 a 20 h.");
    valido = false;
    fechaOk = false;
  }

  // Validación minuto.
  const textoMinuto = document.getElementById("minuto").value;
  const minuto = Number(textoMinuto);

  if (textoMinuto === "") {
    mostrarError("minuto", "Indica el minuto.");
    valido = false;
    fechaOk = false;
  } else if (minuto < 0 || minuto > 59) {
    mostrarError("minuto", "El minuto debe estar entre 0 y 59.");
    valido = false;
    fechaOk = false;
  }

  // Validación nombre.
  const nombre = document.getElementById("nombre").value;
  const erNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,15}$/;

  if (nombre === "") {
    mostrarError("nombre", "Indica el nombre.");
    valido = false;
  } else if (!erNombre.test(nombre)) {
    mostrarError("nombre", "Solo letras, entre 2 y 15 caracteres.");
    valido = false;
  }

  // Validación apellidos.
  const apellidos = document.getElementById("apellidos").value;
  const erApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,50}$/;

  if (apellidos === "") {
    mostrarError("apellidos", "Indica los apellidos.");
    valido = false;
  } else if (!erApellidos.test(apellidos)) {
    mostrarError("apellidos", "Solo letras, entre 2 y 50 caracteres.");
    valido = false;
  }

  // Validación DNI.
  const dni = document.getElementById("dni").value;
  const erDni = /^\d{8}[A-Z]$/;

  if (dni === "") {
    mostrarError("dni", "Indica el DNI.");
    valido = false;
  } else if (!erDni.test(dni)) {
    mostrarError("dni", "Formato incorrecto. Deben ser 8 dígitos y una letra mayúscula.");
    valido = false;
  }

  // Validación teléfono.
  const telefono = document.getElementById("telefono").value;
  const erTelefono = /^[6-9]\d{8}$/;

  if (telefono === "") {
    mostrarError("telefono", "Indica el teléfono.");
    valido = false;
  } else if (!erTelefono.test(telefono)) {
    mostrarError("telefono", "Nueve cifras, empezando por 6, 7, 8 o 9.");
    valido = false;
  }

  // Validación fecha de nacimiento.
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const erFechaNacimiento = /^\d{4}-\d{2}-\d{2}$/;

  if (fechaNacimiento === "") {
    mostrarError("fechaNacimiento", "Indica la fecha de nacimiento.");
    valido = false;
  } else if (!erFechaNacimiento.test(fechaNacimiento)) {
    mostrarError("fechaNacimiento", "Formato incorrecto. Debe ser AAAA-MM-DD.");
    valido = false;
  } else {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();

    if (fechaNac.getTime() > hoy.getTime()) {
      mostrarError("fechaNacimiento", "La fecha de nacimiento no puede ser futura.");
      valido = false;
    } else if (edad > 110) {
      mostrarError("fechaNacimiento", "Revisa la fecha: más de 110 años.");
      valido = false;
    }
  }

  // Validación observaciones. Es el único campo opcional.
  const observaciones = document.getElementById("observaciones").value;

  if (observaciones.length > 200) {
    mostrarError("observaciones", "Las observaciones no pueden superar los 200 caracteres.");
    valido = false;
  }

  // Validación de la fecha completa de la cita.
  if (fechaOk) {
    const fechaCita = new Date(anyo, mes - 1, dia, hora, minuto);
    const ahora = new Date();

    if (fechaCita.getDate() !== dia || fechaCita.getMonth() !== mes - 1) {
      mostrarError("fecha", "Esa fecha no existe.");
      valido = false;
    } else if (fechaCita.getTime() < ahora.getTime()) {
      mostrarError("fecha", "La cita no puede ser en el pasado.");
      valido = false;
    }
  }

  return valido;
}
