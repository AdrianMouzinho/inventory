import { describe, expect, it } from 'vitest'
import { InMemoryEquipmentsRepository } from '../../../tests/repositories/in-memory-equipments-repository'
import { ListEquipments } from './list-equipments'
import { CreateEquipment } from './create-equipment'

describe('List Equipments', () => {
  it('should be able to list all equipments', async () => {
    const equipmentsRepository = new InMemoryEquipmentsRepository()
    const createEquipment = new CreateEquipment(equipmentsRepository)
    const listEquipments = new ListEquipments(equipmentsRepository)

    const characteristics = {
      processador: 'Intel i3 11 geração',
      marca: 'DELL',
      memoria: '8gb 2666mhz',
      armazenamento: 'SSD 256gb',
    }

    await createEquipment.execute({
      code: '000001',
      employee: 'John Doe',
      receivedAt: new Date(),
      category: 'Notebook',
      characteristics: JSON.stringify(characteristics),
    })

    await createEquipment.execute({
      code: '000002',
      employee: 'John Doe',
      receivedAt: new Date(),
      category: 'Notebook',
      characteristics: JSON.stringify(characteristics),
    })

    const { equipments } = await listEquipments.execute()

    expect(equipments.length).toEqual(2)
    expect(equipments[0].code).toEqual('000001')
    expect(equipments[1].code).toEqual('000002')
  })
})
