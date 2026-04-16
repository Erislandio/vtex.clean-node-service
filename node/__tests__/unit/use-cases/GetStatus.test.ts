import { GetStatusUseCase } from '../../../domain/use-cases/GetStatus'
import type { StatusRepository } from '../../../domain/repositories/StatusRepository'

describe('GetStatusUseCase', () => {
  let useCase: GetStatusUseCase
  let mockRepository: jest.Mocked<StatusRepository>

  beforeEach(() => {
    mockRepository = {
      getStatus: jest.fn(),
    }
    useCase = new GetStatusUseCase(mockRepository)
  })

  it('should return status info when repository returns data', async () => {
    const mockStatusInfo = {
      code: 200,
      data: 'OK',
      headers: { 'cache-control': 'public, max-age=10' },
    }

    mockRepository.getStatus.mockResolvedValue(mockStatusInfo)

    const result = await useCase.execute(200)

    expect(result).toEqual(mockStatusInfo)
    expect(mockRepository.getStatus).toHaveBeenCalledWith(200)
  })

  it('should throw error when repository fails', async () => {
    mockRepository.getStatus.mockRejectedValue(new Error('API Error'))

    await expect(useCase.execute(500)).rejects.toThrow('API Error')
  })
})
