/* eslint-disable @typescript-eslint/semi */
import { Empresa } from '../Datos/Entidades/Empresa';
import { Paginador } from '../Paginador';

export interface RepositorioEmpresa {
  obtenerEmpresas(param: any): Promise<{empresas: Empresa[], paginacion: Paginador}>
  obtenerEmpresaPorId(id: string): Promise<Empresa>
  guardarEmpresa(empresa: Empresa): Promise<void>
  actualizarEmpresa(id: string, empresa: Empresa): Promise<string>
}

