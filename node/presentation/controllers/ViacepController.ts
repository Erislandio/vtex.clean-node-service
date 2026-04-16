import { ViacepRepositoryImpl } from '../../data/repositories/ViacepRepository'
import { GetCepUseCase } from '../../domain/use-cases/GetCep'

export class ViacepController {
  public async handle(ctx: Context) {
    const {
      clients: { viacep: viacepClient },
    } = ctx

    const zipCode = ctx.vtex.route.params.zipCode as string

    if (!zipCode) {
      ctx.status = 400
      ctx.body = { error: 'Zip code is required' }

      return
    }

    const repository = new ViacepRepositoryImpl(viacepClient)
    const getCepUseCase = new GetCepUseCase(repository)

    const result = await getCepUseCase.execute(zipCode)

    ctx.status = 200
    ctx.body = result
  }
}
