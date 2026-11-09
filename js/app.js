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

function guardarCita() {
  console.log("validación OK, aquí guardaremos la cita");
}

pintarTabla();