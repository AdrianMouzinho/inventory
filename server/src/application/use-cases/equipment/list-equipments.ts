import { Equipment } from '../../entities/equipment'
import { EquipmentsRepository } from '../../repositories/equipments-repository'

interface ListEquipmentsResponse {
  equipments: Equipment[]
}

export class ListEquipments {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute(): Promise<ListEquipmentsResponse> {
    const equipments = await this.equipmentsRepository.findAll()

    return { equipments }
  }
}
