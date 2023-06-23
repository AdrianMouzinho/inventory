import { describe, expect, it } from 'vitest'
import { CreateEquipment } from './create-equipment'
import { Equipment } from '../../entities/equipment'
import { InMemoryEquipmentsRepository } from '../../../tests/repositories/in-memory-equipments-repository'

describe('Create Equipment', () => {
  it('should be able to create an equipment', async () => {
    const equipmentsRepository = new InMemoryEquipmentsRepository()
    const createEquipment = new CreateEquipment(equipmentsRepository)

    const characteristics = {
      processador: 'Intel i5 11 geração',
      marca: 'Acer',
      memoria: '8gb 2666mhz',
      armazenamento: 'SSD 256gb',
    }

    const { equipment } = await createEquipment.execute({
      code: '000001',
      employee: 'John Doe',
      receivedAt: new Date(),
      category: 'Notebook',
      characteristics: JSON.stringify(characteristics),
    })

    expect(equipment).toBeInstanceOf(Equipment)
    expect(equipmentsRepository.equipments[0]).toEqual(equipment)
  })

  it('should not be able to create an equipment with a same code', async () => {
    const equipmentsRepository = new InMemoryEquipmentsRepository()
    const createEquipment = new CreateEquipment(equipmentsRepository)

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

    expect(
      createEquipment.execute({
        code: '000001',
        employee: 'John Doe',
        receivedAt: new Date(),
        category: 'Notebook',
        characteristics: JSON.stringify(characteristics),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
