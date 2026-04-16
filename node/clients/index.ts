import { IOClients } from '@vtex/api'

import Status from './status'
import ViaCepClient from './viacep'

export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get viacep() {
    return this.getOrSet('viacep', ViaCepClient)
  }
}
