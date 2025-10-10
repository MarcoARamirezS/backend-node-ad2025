import express from 'express';
import empleadoController from '../controllers/empleado.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createEmpleadoSchema,
  loginSchema,
  updateEmpleadoSchema,
  idParamSchema,
} from '../schemas/empleado.schema.js';

const router = express.Router();

router.post('/create', validate(createEmpleadoSchema), empleadoController.create);
router.post('/login', validate(loginSchema), empleadoController.login);
router.get('/getall', empleadoController.getAll);
router.put(
  '/update/:id',
  validate(idParamSchema, 'params'),
  validate(updateEmpleadoSchema),
  empleadoController.update
);
router.delete(
  '/delete/:id',
  validate(idParamSchema, 'params'),
  empleadoController.delete
);

export default router;
