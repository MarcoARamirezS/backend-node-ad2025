import empleadoService from "../services/empleado.service.js";

export default {
  async create (req, res) {
    try {
      const result = await empleadoService.createEmpleado(req.body)
      res.status(201).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  async update (req, res) {
    try {
      const result = await empleadoService.updateEmpleado(req.params.id)
      res.status(201).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  async delete (req, res) {
    try {
      const result = await empleadoService.deleteEmpleado(req.params.id)
      res.status(201).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  async getAll (req, res) {
    try {
      const result = await empleadoService.getAllEmpleados()
      res.status(201).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },
  async login (req, res) {
    try {
      const { usuario, password } = req.body
      const result = await empleadoService.login(usuario, password)
      res.status(201).json({
        token: result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  }
}