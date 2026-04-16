import { StatusController } from '../presentation/controllers/StatusController'

export async function status(ctx: Context, next: () => Promise<any>) {
  const controller = new StatusController()

  await controller.handle(ctx)
  await next()
}
