import { GetCepUseCase } from '../../../domain/use-cases/GetCep'
import type { ViacepRepository } from '../../../domain/repositories/ViacepRepository'

describe('GetCepUseCase', () => {
  let useCase: GetCepUseCase
  let mockRepository: jest.Mocked<ViacepRepository>

  beforeEach(() => {
    mockRepository = {
      getAddressByZipCode: jest.fn(),
    }
    useCase = new GetCepUseCase(mockRepository)
  })

  it('should return address info when repository returns data', async () => {
    const mockAddress = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    }

    mockRepository.getAddressByZipCode.mockResolvedValue(mockAddress)

    const result = await useCase.execute('01001000')

    expect(result).toEqual(mockAddress)
    expect(mockRepository.getAddressByZipCode).toHaveBeenCalledWith('01001000')
  })

  it('should propagate errors from repository', async () => {
    mockRepository.getAddressByZipCode.mockRejectedValue(
      new Error('Zip code not found')
    )

    await expect(useCase.execute('00000000')).rejects.toThrow(
      'Zip code not found'
    )
  })
})
