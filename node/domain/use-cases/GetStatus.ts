import type { StatusRepository } from '../repositories/StatusRepository'
import type { StatusInfo } from '../entities/StatusInfo'

export class GetStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}

  public async execute(code: number): Promise<StatusInfo> {
    // Here you could add business rules, validation, or orchestration
    return this.statusRepository.getStatus(code)
  }
}
