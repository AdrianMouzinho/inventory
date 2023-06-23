import { Equipment } from '../../entities/equipment'
import { EquipmentsRepository } from '../../repositories/equipments-repository'

interface CreateEquipmentRequest {
  code: string
  employee: string
  receivedAt: Date
  formattedAt?: Date | null
  category: string
  characteristics: string
}

interface CreateEquipmentResponse {
  equipment: Equipment
}

export class CreateEquipment {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute(
    request: CreateEquipmentRequest,
  ): Promise<CreateEquipmentResponse> {
    const {
      code,
      employee,
      receivedAt,
      formattedAt,
      category,
      characteristics,
    } = request

    const equipmentAlreadyExists = await this.equipmentsRepository.findByCode(
      code,
    )

    if (equipmentAlreadyExists) {
      throw new Error('Another equipment already exists with this code.')
    }

    const equipment = new Equipment({
      code,
      employee,
      receivedAt,
      formattedAt,
      category,
      characteristics,
    })

    await this.equipmentsRepository.save(equipment)

    return { equipment }
  }
}
