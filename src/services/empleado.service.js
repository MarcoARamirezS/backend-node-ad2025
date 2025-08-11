import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import empleadoRepository from '../repositories/empleado.repository.js'
import EmpleadoModel from '../models/empleado.model.js'

export default {
  async createEmpleado(data) {
    const { nombre, apaterno, amaterno, usuario, password } = data

    // Validamos nombre completo
    const nombreDuplicado = await empleadoRepository.findByFullName(nombre, apaterno, amaterno)

    if (nombreDuplicado) {
      throw new Error('Ya existe un empleado con el mismo nombre')
    }

    const usuarioDuplicado = await empleadoRepository.findByUsuario(usuario)
    if (usuarioDuplicado) {
      throw new Error('Ya existe un empleado con el mismo usuario')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const empleadoNuevo = new EmpleadoModel({
      ...data,
      password: hashedPassword
    })
    return await empleadoRepository.create({ ...empleadoNuevo })
  }
}