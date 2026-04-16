import { ViacepRepositoryImpl } from '../../../data/repositories/ViacepRepository'
import type ViaCepClient from '../../../clients/viacep'

describe('ViacepRepositoryImpl', () => {
  let repository: ViacepRepositoryImpl
  let mockViacepClient: jest.Mocked<ViaCepClient>

  beforeEach(() => {
    mockViacepClient = {
      getAddressByZipCode: jest.fn(),
    } as any
    repository = new ViacepRepositoryImpl(mockViacepClient)
  })

  it('should return address from client', async () => {
    const mockAddress = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
    }

    mockViacepClient.getAddressByZipCode.mockResolvedValue(mockAddress as any)

    const result = await repository.getAddressByZipCode('01001000')

    expect(result).toEqual(mockAddress)
    expect(mockViacepClient.getAddressByZipCode).toHaveBeenCalledWith(
      '01001000'
    )
  })
})
