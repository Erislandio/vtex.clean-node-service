import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { ViaCep } from '../domain/entities/ViaCep'

export default class ViaCepClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://viacep.com.br/ws/', context, {
      ...options,
      retries: 2,
      timeout: 1000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-vtex-user-agent': 'service-example',
      },
    })
  }

  public async getAddressByZipCode(zipCode: string): Promise<ViaCep> {
    return this.http.get(`${zipCode}/json`, {
      metric: 'viacep-get-address-by-zip-code',
    })
  }
}
