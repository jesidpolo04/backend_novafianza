/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Empresa } from 'App/Dominio/Datos/Entidades/Empresa'
import { Paginador } from 'App/Dominio/Paginador';
import { RepositorioEmpresa } from 'App/Dominio/Repositorios/RepositorioEmpresa'
import Tblempresas from 'App/Infraestructura/Datos/Entidad/Empresa'
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';

export class RepositorioEmpresaDB implements RepositorioEmpresa {
  async obtenerEmpresas (params: any): Promise<{empresas: Empresa[], paginacion: Paginador}> {
    const empresas: Empresa[] = []
    const empresasDB = await Tblempresas.query().orderBy('id', 'desc').paginate(params.pagina, params.limite)
    empresasDB.forEach(empresaDB => {
      empresas.push(empresaDB.obtenerEmpresa())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(empresasDB)
    return {empresas , paginacion}
  }

  async obtenerEmpresaPorId (id: string): Promise<Empresa> {
    const empresa = await Tblempresas.findOrFail(id)
    return empresa.obtenerEmpresa()
  }

  async guardarEmpresa (empresa: Empresa): Promise<void> {
    let empresaDb = new Tblempresas()
    empresaDb.establecerEmpresaDb(empresa)
    await empresaDb.save()
  }

  async actualizarEmpresa (id: string, empresa: Empresa): Promise<string> {
    let empresaRetorno = await Tblempresas.findOrFail(id)
    empresaRetorno.establecerEmpresaConId(empresa)
    await empresaRetorno.save()
    return id
  }
}
