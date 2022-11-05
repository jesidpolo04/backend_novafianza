/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Paginador } from "App/Dominio/Paginador";
import { v4 as uuidv4 } from 'uuid'
import { RepositorioUsuarioEmpresa } from "App/Dominio/Repositorios/RepositorioUsuarioEmpresa";
import { UsuarioEmpresa } from "../Entidades/UsuarioEmpresa";

export class ServicioUsuarioEmpresa{
  constructor (private repositorio: RepositorioUsuarioEmpresa) { }

  async obtenerUsuariosEmpresa (params: any): Promise<{ usuariosEmpresa: UsuarioEmpresa[], paginacion: Paginador }> {
    return this.repositorio.obtenerUsuariosEmpresa(params);
  }

  async obtenerUsuarioEmpresaPorId (id: string): Promise<UsuarioEmpresa>{
    return this.repositorio.obtenerUsuarioEmpresaPorId(id);
  }

  async guardarUsuarioEmpresa (usuarioEmpresa: UsuarioEmpresa): Promise<void>{
    usuarioEmpresa.id = uuidv4();
    return this.repositorio.guardarUsuarioEmpresa(usuarioEmpresa);
  }

  async actualizarUsuarioEmpresa (id: string, usuarioEmpresa: UsuarioEmpresa): Promise<string> {
    return this.repositorio.actualizarUsuarioEmpresa(id, usuarioEmpresa);
  }

  async cambiarEstado (id:string):Promise<string>{
    let usuarioEmpresa = await this.repositorio.obtenerUsuarioEmpresaPorId(id)
    usuarioEmpresa.estado = !usuarioEmpresa.estado
    return await this.repositorio.actualizarUsuarioEmpresa(id, usuarioEmpresa);
  }
}
