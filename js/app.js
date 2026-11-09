function pintarTabla() {
  const cuerpo = document.getElementById("cuerpoTabla");
  const citas = obtenerCitas();
  let html = "";

  if (citas.length === 0) {
    html = "<tr><td colspan='10'>dato vacío</td></tr>";
  } else {
    for (let i = 0; i < citas.length; i++) {
      const c = citas[i];
      html += "<tr>";
      html += "<td>" + (i + 1) + "</td>";
      html += "<td>" + c.fechaFormateada() + "</td>";
      html += "<td>" + c.horaFormateada() + "</td>";
      html += "<td>" + c.nombre + "</td>";
      html += "<td>" + c.apellidos + "</td>";
      html += "<td>" + c.dni + "</td>";
      html += "<td>" + c.telefono + "</td>";
      html += "<td>" + c.nacimientoFormateado() + "</td>";
      html += "<td>" + c.observaciones + "</td>";
      html += "<td>";
      html += "<button onclick='cargarCita(" + c.id + ")'>Editar</button> ";
      html += "<button onclick='eliminarCita(" + c.id + ")'>Eliminar</button>";
      html += "</td>";
      html += "</tr>";
    }
  }

  cuerpo.innerHTML = html;
}

// Devuelve la posición que ocupa una cita dentro del array, o -1 si no está.
function buscarIndice(citas, id) {
  for (let i = 0; i < citas.length; i++) {
    if (citas[i].id === id) {
      return i;
    }
  }
  return -1;
}

// Construye una Cita con lo que hay escrito ahora mismo en el formulario.
function citaDesdeFormulario(id) {
  return new Cita(
    id,
    Number(document.getElementById("dia").value),
    Number(document.getElementById("mes").value),
    Number(document.getElementById("anyo").value),
    Number(document.getElementById("hora").value),
    Number(document.getElementById("minuto").value),
    document.getElementById("nombre").value,
    document.getElementById("apellidos").value,
    document.getElementById("dni").value,
    document.getElementById("telefono").value,
    document.getElementById("fechaNacimiento").value,
    document.getElementById("observaciones").value
  );
}

function limpiarFormulario() {
  document.getElementById("formCita").reset();
  document.getElementById("citaId").value = "";
  document.getElementById("btnGuardar").innerHTML = "Guardar cita";
  limpiarErrores();
}

// La llama el botón Cancelar desde el HTML.
function cancelarEdicion() {
  limpiarFormulario();
}

// La llama guardarSiEsValido() cuando la validación ha ido bien.
// El campo oculto citaId decide si es un alta o una modificación.
function guardarCita() {
  const citas = obtenerCitas();
  const textoId = document.getElementById("citaId").value;

  if (textoId === "") {
    // Alta.
    citas.push(citaDesdeFormulario(Date.now()));
  } else {
    // Modificación: se conserva el identificador original de la cita.
    const id = Number(textoId);
    const posicion = buscarIndice(citas, id);

    if (posicion !== -1) {
      citas[posicion] = citaDesdeFormulario(id);
    }
  }

  guardarCitas(citas);
  pintarTabla();
  limpiarFormulario();
}

function cargarCita(id) {
  const citas = obtenerCitas();
  const posicion = buscarIndice(citas, id);

  if (posicion === -1) {
    return;
  }

  const c = citas[posicion];

  document.getElementById("dia").value = c.dia;
  document.getElementById("mes").value = c.mes;
  document.getElementById("anyo").value = c.anyo;
  document.getElementById("hora").value = c.hora;
  document.getElementById("minuto").value = c.minuto;
  document.getElementById("nombre").value = c.nombre;
  document.getElementById("apellidos").value = c.apellidos;
  document.getElementById("dni").value = c.dni;
  document.getElementById("telefono").value = c.telefono;
  document.getElementById("fechaNacimiento").value = c.fechaNacimiento;
  document.getElementById("observaciones").value = c.observaciones;

  /* El id viaja en el campo oculto para que al guardar se entre por la rama de modificación y no se cree una cita nueva. */
  document.getElementById("citaId").value = c.id;
  document.getElementById("btnGuardar").innerHTML = "Actualizar cita";

  limpiarErrores();
}

function eliminarCita(id) {
  const citas = obtenerCitas();
  const posicion = buscarIndice(citas, id);

  if (posicion === -1) {
    return;
  }

  if (!confirm("¿Eliminar la cita de " + citas[posicion].nombreCompleto() + "?")) {
    return;
  }

  citas.splice(posicion, 1);
  guardarCitas(citas);
  pintarTabla();

  // Si la cita borrada era la que se estaba editando, se sale del modo edición.
  if (Number(document.getElementById("citaId").value) === id) {
    limpiarFormulario();
  }
}

pintarTabla();
