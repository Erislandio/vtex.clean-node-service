import { StatusRepositoryImpl } from '../../../data/repositories/StatusRepositoryImpl'
import type StatusClient from '../../../clients/status'

describe('StatusRepositoryImpl', () => {
  let repository: StatusRepositoryImpl
  let mockStatusClient: jest.Mocked<StatusClient>

  beforeEach(() => {
    mockStatusClient = {
      getStatusWithHeaders: jest.fn(),
    } as any
    repository = new StatusRepositoryImpl(mockStatusClient)
  })

  it('should map client response to StatusInfo entity', async () => {
    const mockResponse = {
      status: 200,
      data: 'OK',
      headers: { 'cache-control': 'no-cache' },
    }

    mockStatusClient.getStatusWithHeaders.mockResolvedValue(mockResponse as any)

    const result = await repository.getStatus(200)

    expect(result).toEqual({
      code: 200,
      data: 'OK',
      headers: { 'cache-control': 'no-cache' },
    })
    expect(mockStatusClient.getStatusWithHeaders).toHaveBeenCalledWith(200)
  })
})
