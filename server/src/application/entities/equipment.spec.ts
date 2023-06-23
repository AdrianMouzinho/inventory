import { describe, expect, it } from 'vitest'
import { Equipment } from './equipment'
import { getFutureDate } from '../../tests/utlis/get-future-date'

describe('Equipment', () => {
  it('should be able to create an equipment', () => {
    const characteristics = {
      processador: 'Intel i5 11 geração',
      marca: 'Acer',
      memoria: '8gb 2666mhz',
      armazenamento: 'SSD 256gb',
    }

    const equipment = new Equipment({
      code: '000001',
      employee: 'John Doe',
      receivedAt: new Date(),
      category: 'Notebook',
      characteristics: JSON.stringify(characteristics),
    })

    expect(equipment).toBeInstanceOf(Equipment)
    expect(equipment.employee).toEqual('John Doe')
  })

  it('should not be able to create an equipment with received date after now', () => {
    const characteristics = {
      processador: 'Intel i5 11 geração',
      marca: 'Acer',
      memoria: '8gb 2666mhz',
      armazenamento: 'SSD 256gb',
    }

    const receivedAt = getFutureDate('2023-06-19')

    expect(() => {
      return new Equipment({
        code: '000001',
        employee: 'John Doe',
        receivedAt,
        category: 'Notebook',
        characteristics: JSON.stringify(characteristics),
      })
    }).toThrow()
  })

  it('should not be able to create an equipment with formatted date after now', () => {
    const characteristics = {
      processador: 'Intel i5 11 geração',
      marca: 'Acer',
      memoria: '8gb 2666mhz',
      armazenamento: 'SSD 256gb',
    }

    const formattedAt = getFutureDate('2023-06-19')

    expect(() => {
      return new Equipment({
        code: '000001',
        employee: 'John Doe',
        receivedAt: new Date(),
        formattedAt,
        category: 'Notebook',
        characteristics: JSON.stringify(characteristics),
      })
    }).toThrow()
  })
})
