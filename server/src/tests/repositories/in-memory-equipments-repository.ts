import { Equipment } from '../../application/entities/equipment'
import { EquipmentsRepository } from '../../application/repositories/equipments-repository'

export class InMemoryEquipmentsRepository implements EquipmentsRepository {
  public equipments: Equipment[] = []

  async findByCode(code: string): Promise<Equipment | null> {
    const equipment = this.equipments.find(
      (equipment) => equipment.code === code,
    )

    if (!equipment) {
      return null
    }

    return equipment
  }

  async save(equipment: Equipment): Promise<void> {
    this.equipments.push(equipment)
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipments
  }
}
