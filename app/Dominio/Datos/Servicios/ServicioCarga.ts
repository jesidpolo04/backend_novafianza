/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioCarga } from '../../Repositorios/RepositorioCarga'
export class ServicioCarga{
  constructor (private repositorio: RepositorioCarga) { }

  async procesarArchivo (archivo: any, datos: string): Promise<{}> {
    return this.repositorio.ProcesarArchivo(archivo, datos)
  }
}
