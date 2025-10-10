// src/routes/index.js
import express from 'express';
import empleadoRoutes from './empleado.routes.js';

const router = express.Router();

router.use('/empleados', empleadoRoutes);
router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API backend-node-ad2025 funcionando correctamente 🚀',
  });
});

export default router;
