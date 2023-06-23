import { randomUUID } from 'node:crypto'

export interface EquipmentProps {
  code: string
  employee: string
  receivedAt: Date
  formattedAt?: Date | null
  category: string
  characteristics: string
}

export class Equipment {
  private _id: string
  private props: EquipmentProps

  constructor(props: EquipmentProps, id?: string) {
    const { receivedAt, formattedAt } = props

    if (receivedAt > new Date() || formattedAt > new Date()) {
      throw new Error('Invalid received or formatted date.')
    }

    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      formattedAt: props.formattedAt ?? null,
    }
  }

  get id() {
    return this._id
  }

  get employee() {
    return this.props.employee
  }

  get code() {
    return this.props.code
  }

  get receivedAt() {
    return this.props.receivedAt
  }

  get formattedAt() {
    return this.props.formattedAt
  }

  get category() {
    return this.props.category
  }

  get characteristics() {
    return this.props.characteristics
  }
}
