import type { ViaCep } from '../entities/ViaCep'

export interface ViacepRepository {
  getAddressByZipCode(zipCode: string): Promise<ViaCep>
}
