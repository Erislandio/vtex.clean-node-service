import { UserInputError } from '@vtex/api'

import { StatusRepositoryImpl } from '../../data/repositories/StatusRepositoryImpl'
import { GetStatusUseCase } from '../../domain/use-cases/GetStatus'

export class StatusController {
  public async handle(ctx: Context) {
    const {
      vtex: {
        route: { params },
      },
      clients: { status: statusClient },
    } = ctx

    const { code } = params

    if (!code) {
      throw new UserInputError('Code is required')
    }

    const codeNumber = parseInt(code as string, 10)

    const repository = new StatusRepositoryImpl(statusClient)
    const getStatusUseCase = new GetStatusUseCase(repository)

    const result = await getStatusUseCase.execute(codeNumber)

    ctx.status = result.code
    ctx.body = result.data

    if (result.headers['cache-control']) {
      ctx.set('Cache-Control', result.headers['cache-control'])
    }
  }
}
