import { Router } from 'express'
import {
  createEquipmentController,
  listEquipmentsController,
} from '../controllers'

const equipmentsRoutes = Router()

equipmentsRoutes.post('/equipments', (request, response) => {
  return createEquipmentController.handle(request, response)
})

equipmentsRoutes.get('/equipments', (request, response) => {
  return listEquipmentsController.handle(request, response)
})

export { equipmentsRoutes }
