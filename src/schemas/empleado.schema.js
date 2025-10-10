// src/schemas/empleado.schema.js
import { z } from 'zod';

const baseEmpleadoSchema = {
  nombre: z.string().min(1, 'El nombre es requerido'),
  apaterno: z.string().min(1, 'El apellido paterno es requerido'),
  amaterno: z.string().min(1, 'El apellido materno es requerido'),
  direccion: z.string().min(3, 'La dirección es requerida'),
  telefono: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .regex(/^[0-9+\-\s()]+$/, 'El teléfono contiene caracteres inválidos'),
  ciudad: z.string().min(1, 'La ciudad es requerida'),
  estado: z.string().min(1, 'El estado es requerido'),
  usuario: z.string().min(4, 'El usuario debe tener al menos 4 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.string().min(1, 'El rol es requerido'),
};

export const createEmpleadoSchema = z.object({
  ...baseEmpleadoSchema,
});

export const loginSchema = z.object({
  usuario: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const updateEmpleadoSchema = z.object({
  nombre: z.string().min(1).optional(),
  apaterno: z.string().min(1).optional(),
  amaterno: z.string().min(1).optional(),
  direccion: z.string().min(3).optional(),
  telefono: z
    .string()
    .min(8)
    .regex(/^[0-9+\-\s()]+$/, 'El teléfono contiene caracteres inválidos')
    .optional(),
  ciudad: z.string().min(1).optional(),
  estado: z.string().min(1).optional(),
  usuario: z.string().min(4).optional(),
  password: z.string().min(6).optional(),
  rol: z.string().min(1).optional(),
});

export const idParamSchema = z.object({
  id: z
    .string()
    .min(1, 'El id del empleado es requerido')
    .regex(/^[A-Za-z0-9_-]+$/, 'El id tiene un formato inválido'),
});
