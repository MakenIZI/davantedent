
function dosDigitos(numero) {
  if (numero < 10) {
    return "0" + numero;
  } else {
    return "" + numero;
  }
}

class Cita {
  constructor(id, dia, mes, anyo, hora, minuto,
      nombre, apellidos, dni, telefono, fechaNacimiento, observaciones) {
    this.id = id;
    this.dia = dia;
    this.mes = mes;
    this.anyo = anyo;
    this.hora = hora;
    this.minuto = minuto;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
    this.observaciones = observaciones;
  }

  fechaFormateada() {
    return dosDigitos(this.dia) + "/" + dosDigitos(this.mes) + "/" + this.anyo;
  }

  horaFormateada() {
    return dosDigitos(this.hora) + ":" + dosDigitos(this.minuto);
  }

  nombreCompleto() {
    return this.nombre + " " + this.apellidos;
  }
}

function citaDesdeObjeto(obj) {
  return new Cita(obj.id, obj.dia, obj.mes, obj.anyo, obj.hora, obj.minuto,
    obj.nombre, obj.apellidos, obj.dni, obj.telefono,obj.fechaNacimiento, obj.observaciones);
}