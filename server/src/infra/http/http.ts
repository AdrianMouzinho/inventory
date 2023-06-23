import express from 'express'
import { equipmentsRoutes } from './routes/equipments'

const app = express()

app.use(express.json())
app.use(equipmentsRoutes)

export { app }
