import { StatusController } from '../../../presentation/controllers/StatusController'
import { GetStatusUseCase } from '../../../domain/use-cases/GetStatus'

jest.mock('../../../domain/use-cases/GetStatus')

describe('StatusController', () => {
  let controller: StatusController
  let mockCtx: any

  beforeEach(() => {
    controller = new StatusController()
    mockCtx = {
      vtex: {
        route: { params: { code: '200' } },
      },
      clients: {
        status: {},
      },
      set: jest.fn(),
      status: 0,
      body: {},
    }
  })

  it('should set status and body correctly', async () => {
    const mockExecute = jest.fn().mockResolvedValue({
      code: 200,
      data: 'OK',
      headers: { 'cache-control': 'max-age=10' },
    })

    ;(GetStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }))

    await controller.handle(mockCtx)

    expect(mockCtx.status).toBe(200)
    expect(mockCtx.body).toBe('OK')
    expect(mockCtx.set).toHaveBeenCalledWith('Cache-Control', 'max-age=10')
  })

  it('should throw error if code is missing', async () => {
    mockCtx.vtex.route.params.code = undefined

    await expect(controller.handle(mockCtx)).rejects.toThrow('Code is required')
  })
})
