import { ViacepController } from '../presentation/controllers/ViacepController'

export async function viacep(ctx: Context, next: () => Promise<any>) {
  const controller = new ViacepController()

  await controller.handle(ctx)
  await next()
}
