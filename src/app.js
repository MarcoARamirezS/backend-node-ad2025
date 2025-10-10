import express from 'express'
import dotenv from 'dotenv'
import router from './routes/empleado.routes.js'
import cors from 'cors'
import routes from './routes/index.js';

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1', routes);
const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`Servidor Trabajando en ${PORT}`)
})
