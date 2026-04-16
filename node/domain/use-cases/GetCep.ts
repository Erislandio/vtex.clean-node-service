import type { ViaCep } from '../entities/ViaCep'
import type { ViacepRepository } from '../repositories/ViacepRepository'

export class GetCepUseCase {
  constructor(private viacepRepository: ViacepRepository) {}

  public async execute(zipCode: string): Promise<ViaCep> {
    return this.viacepRepository.getAddressByZipCode(zipCode)
  }
}
