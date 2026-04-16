import { ViacepController } from '../../../presentation/controllers/ViacepController'
import { GetCepUseCase } from '../../../domain/use-cases/GetCep'

jest.mock('../../../domain/use-cases/GetCep')

describe('ViacepController', () => {
  let controller: ViacepController
  let mockCtx: any

  beforeEach(() => {
    controller = new ViacepController()
    mockCtx = {
      vtex: {
        route: { params: { zipCode: '01001000' } },
      },
      clients: {
        viacep: {},
      },
      status: 0,
      body: {},
    }
  })

  it('should set status and body when use case succeeds', async () => {
    const mockAddress = { cep: '01001-000', logradouro: 'Praça da Sé' }
    const mockExecute = jest.fn().mockResolvedValue(mockAddress)

    ;(GetCepUseCase as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }))

    await controller.handle(mockCtx)

    expect(mockCtx.status).toBe(200)
    expect(mockCtx.body).toBe(mockAddress)
  })

  it('should return 400 if zipCode is missing', async () => {
    mockCtx.vtex.route.params.zipCode = undefined

    await controller.handle(mockCtx)

    expect(mockCtx.status).toBe(400)
    expect(mockCtx.body).toEqual({ error: 'Zip code is required' })
  })
})
