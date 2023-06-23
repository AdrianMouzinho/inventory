import { prisma } from '../../database/prisma/prisma'
import { PrismaEquipmentsRepository } from '../../database/prisma/repositories/prisma-equipments-repository'
import { CreateEquipment } from '../../../application/use-cases/equipment/create-equipment'
import { ListEquipments } from '../../../application/use-cases/equipment/list-equipments'
import { CreateEquipmentController } from './equipments/create-equipment'
import { ListEquipmentsController } from './equipments/list-equipments'

const prismaEquipmentsRepository = new PrismaEquipmentsRepository(prisma)

const createEquipment = new CreateEquipment(prismaEquipmentsRepository)
const createEquipmentController = new CreateEquipmentController(createEquipment)

const listEquipments = new ListEquipments(prismaEquipmentsRepository)
const listEquipmentsController = new ListEquipmentsController(listEquipments)

export { createEquipmentController, listEquipmentsController }
