import EmpleadoInterface from '../interfaces/empleado.interface.js';

export default class EmpleadoModel extends EmpleadoInterface {
  constructor(data) {
    super(data);

    this.fechaRegistro = this.fechaRegistro || Date.now();
  }

  toJSON() {
    const plain = {};

    for (const key of Object.keys(this)) {
      plain[key] = this[key];
    }

    return plain;
  }
}
