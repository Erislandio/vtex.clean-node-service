import type ViaCepClient from '../../clients/viacep'
import type { ViaCep } from '../../domain/entities/ViaCep'
import type { ViacepRepository } from '../../domain/repositories/ViacepRepository'

export class ViacepRepositoryImpl implements ViacepRepository {
  constructor(private viacepClient: ViaCepClient) {}

  public async getAddressByZipCode(zipCode: string): Promise<ViaCep> {
    const response = await this.viacepClient.getAddressByZipCode(zipCode)

    return response
  }
}
