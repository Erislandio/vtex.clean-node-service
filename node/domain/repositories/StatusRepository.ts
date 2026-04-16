import type { StatusInfo } from '../entities/StatusInfo'

export interface StatusRepository {
  getStatus(code: number): Promise<StatusInfo>
}
