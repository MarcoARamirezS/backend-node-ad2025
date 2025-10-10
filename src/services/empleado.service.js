// src/services/empleado.service.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import empleadoRepository from '../repositories/empleado.repository.js'
import EmpleadoModel from '../models/empleado.model.js'

const TOKEN_EXP = '2h'

export default {
  async createEmpleado(payload) {
    const { nombre, apaterno, amaterno, usuario, password, ...rest } = payload

    const byName = await empleadoRepository.findByFullName(nombre, apaterno, amaterno)
    if (byName) throw new Error('Ya existe un empleado con el mismo nombre completo')

    const byUser = await empleadoRepository.findByUsuario(usuario)
    if (byUser) throw new Error('Ya existe un empleado con el mismo usuario')

    const hash = await bcrypt.hash(password, 10)
    const model = new EmpleadoModel({
      nombre, apaterno, amaterno, usuario,
      password: hash,
      ...rest
    })

    const created = await empleadoRepository.create(model)
    return created
  },

  async updateEmpleado(id, payload) {
    const data = { ...payload }
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    await empleadoRepository.update(id, data)
    return { id }
  },

  async deleteEmpleado(id) {
    await empleadoRepository.remove(id)
    return { id }
  },

  async getAll() {
    return empleadoRepository.getAllSafe()
  },

  async login(usuario, password) {
    const empleado = await empleadoRepository.findByUsuario(usuario)
    if (!empleado) throw new Error('Usuario no encontrado')

    const ok = await bcrypt.compare(password, empleado.password ?? '')
    if (!ok) throw new Error('Password incorrecto')

    const token = jwt.sign(
      { id: empleado.id, usuario: empleado.usuario, nombre: empleado.nombre },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXP }
    )
    return token
  }
}
