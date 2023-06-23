import { Equipment } from '../entities/equipment'

export interface EquipmentsRepository {
  findByCode(code: string): Promise<Equipment | null>
  save(equipment: Equipment): Promise<void>
  findAll(): Promise<Equipment[]>
}
