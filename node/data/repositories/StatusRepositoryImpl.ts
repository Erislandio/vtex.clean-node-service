import type { StatusRepository } from '../../domain/repositories/StatusRepository'
import type { StatusInfo } from '../../domain/entities/StatusInfo'
import type StatusClient from '../../clients/status'

export class StatusRepositoryImpl implements StatusRepository {
  constructor(private statusClient: StatusClient) {}

  public async getStatus(code: number): Promise<StatusInfo> {
    const response = await this.statusClient.getStatusWithHeaders(code)

    return {
      code: response.status,
      data: response.data,
      headers: response.headers as Record<string, string>,
    }
  }
}
