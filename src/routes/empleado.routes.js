import express from 'express'
import empleadoController from '../controllers/empleado.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/create', empleadoController.create)
router.put('/update/:id', authMiddleware, empleadoController.update)
router.delete('/delete/:id', authMiddleware, empleadoController.delete)
router.get('/getall', empleadoController.getAll)
router.post('/login', empleadoController.login)

export default router
