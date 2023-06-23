import { Request, Response } from 'express'
import { ListEquipments } from '../../../../application/use-cases/equipment/list-equipments'
import { EquipmentViewModel } from '../../view-models/equipment-view-model'

export class ListEquipmentsController {
  constructor(private listEquipments: ListEquipments) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { equipments } = await this.listEquipments.execute()

      return response.status(200).json({
        equipments: equipments.map(EquipmentViewModel.toHTTP),
      })
    } catch (error) {
      return response.status(400).json({
        errors: [
          {
            message: error.message || 'Unexpected error.',
          },
        ],
      })
    }
  }
}
