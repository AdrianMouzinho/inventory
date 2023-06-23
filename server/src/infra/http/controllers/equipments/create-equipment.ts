import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateEquipment } from '../../../../application/use-cases/equipment/create-equipment'
import { EquipmentViewModel } from '../../view-models/equipment-view-model'

export class CreateEquipmentController {
  constructor(private createEquipment: CreateEquipment) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const bodySchema = z.object({
        code: z
          .string()
          .length(6, { message: 'Code must be exactly 6 characters long.' }),
        employee: z
          .string()
          .min(4, { message: 'Employee must be 4 or more characters long.' }),
        receivedAt: z
          .string()
          .datetime({ message: 'Invalid datetime string! Must be UTC.' }),
        formattedAt: z
          .string()
          .datetime({ message: 'Invalid datetime string! Must be UTC.' })
          .nullable()
          .optional()
          .default(null),
        category: z
          .string()
          .min(2, { message: 'Category must be 2 or more characters long.' }),
        characteristics: z.string().min(10, {
          message: 'Characteristics must be 10 or more characters long.',
        }),
      })

      const {
        code,
        employee,
        receivedAt,
        formattedAt,
        category,
        characteristics,
      } = bodySchema.parse(request.body)

      const formatDate = formattedAt ? new Date(formattedAt) : null

      const { equipment } = await this.createEquipment.execute({
        code,
        employee,
        receivedAt: new Date(receivedAt),
        formattedAt: formatDate,
        category,
        characteristics,
      })

      return response.status(201).json({
        equipment: EquipmentViewModel.toHTTP(equipment),
      })
    } catch (error) {
      if (error.constructor.name === 'ZodError') {
        return response.status(400).json({
          errors: error.issues.map((err: any) => {
            return {
              message: err.message,
            }
          }),
        })
      }

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
