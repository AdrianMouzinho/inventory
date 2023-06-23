import { Equipment as RawEquipment } from '@prisma/client'
import { Equipment } from '../../../../application/entities/equipment'

export class PrismaEquipmentMapper {
  static toPrisma(equipment: Equipment) {
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

  static toDomain(raw: RawEquipment): Equipment {
    return new Equipment(
      {
        code: raw.code,
        employee: raw.employee,
        receivedAt: raw.receivedAt,
        formattedAt: raw.formattedAt,
        category: raw.category,
        characteristics: raw.characteristics,
      },
      raw.id,
    )
  }
}
