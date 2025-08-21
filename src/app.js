import express from 'express'
import dotenv from 'dotenv'
import router from './routes/empleado.routes.js'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/empleados', router)
const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`Servidor Trabajando en ${PORT}`)
})
