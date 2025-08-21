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
  },
  async updateEmpleado (id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    return await empleadoRepository.update(id, data)
  },
  async deleteEmpleado (id) {
    return await empleadoRepository.delete(id)
  },
  async getAllEmpleados () {
    return await empleadoRepository.getAll()
  },
  async login (usuario, password) {
    const empleado = await empleadoRepository.findByUsuario(usuario)
    if (!empleado) {
      throw new Error('Usuario no encontrado')
    }
    const passwordValid = await bcrypt.compare(password, empleado.password)
    if (!passwordValid) {
      throw new Error('Password Incorrecto')
    }
    const token = jwt.sign({
      usuario: empleado.usuario,
      id: empleado.id,
      nombre: empleado.nombre
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
    return { token }
  }
}