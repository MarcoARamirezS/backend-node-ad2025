// src/controllers/empleado.controller.js
import empleadoService from '../services/empleado.service.js'

export default {
  async create(req, res) {
    try {
      const result = await empleadoService.createEmpleado(req.body)
      res.status(201).json({ ok: true, result })
    } catch (e) {
      res.status(400).json({ ok: false, message: e.message })
    }
  },

  async update(req, res) {
    try {
      const result = await empleadoService.updateEmpleado(req.params.id, req.body)
      res.json({ ok: true, result })
    } catch (e) {
      res.status(400).json({ ok: false, message: e.message })
    }
  },

  async delete(req, res) {
    try {
      const result = await empleadoService.deleteEmpleado(req.params.id)
      res.json({ ok: true, result })
    } catch (e) {
      res.status(400).json({ ok: false, message: e.message })
    }
  },

  async getAll(req, res) {
    try {
      const result = await empleadoService.getAll()
      res.json({ ok: true, result })
    } catch (e) {
      res.status(500).json({ ok: false, message: e.message })
    }
  },

  async login(req, res) {
    try {
      const { usuario, password } = req.body
      const token = await empleadoService.login(usuario, password)
      // Ojo: el service devuelve **string**, aquí lo envolvemos
      res.status(200).json({ ok: true, token })
    } catch (e) {
      res.status(401).json({ ok: false, message: e.message })
    }
  }
}
