/* eslint-disable @typescript-eslint/semi */
import { Rol } from '../Datos/Entidades/Autenticacion/Rol';

export interface RepositorioRol {
  obtenerRolporID(id: string): Promise<Rol>
}
