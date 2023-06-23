import { PrismaClient } from '@prisma/client'
import { Equipment } from '../../../../application/entities/equipment'
import { EquipmentsRepository } from '../../../../application/repositories/equipments-repository'
import { PrismaEquipmentMapper } from '../mappers/prisma-equipment-mapper'

export class PrismaEquipmentsRepository implements EquipmentsRepository {
  constructor(private prisma: PrismaClient) {}

  async findByCode(code: string): Promise<Equipment | null> {
    const equipment = await this.prisma.equipment.findUnique({
      where: {
        code,
      },
    })

    if (!equipment) {
      return null
    }

    return PrismaEquipmentMapper.toDomain(equipment)
  }

  async save(equipment: Equipment): Promise<void> {
    const raw = PrismaEquipmentMapper.toPrisma(equipment)

    await this.prisma.equipment.create({
      data: raw,
    })
  }

  async findAll(): Promise<Equipment[]> {
    const equipments = await this.prisma.equipment.findMany({
      orderBy: {
        code: 'asc',
      },
    })

    return equipments.map((equipment) =>
      PrismaEquipmentMapper.toDomain(equipment),
    )
  }
}
