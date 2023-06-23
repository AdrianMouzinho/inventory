import { Equipment } from '../../../application/entities/equipment'

export class EquipmentViewModel {
  static toHTTP(equipment: Equipment) {
    return {
      id: equipment.id,
      code: equipment.code,
      employee: equipment.employee,
      receivedAt: equipment.receivedAt,
      formattedAt: equipment.formattedAt,
      category: equipment.category,
      characteristics: equipment.characteristics,
    }
  }
}
