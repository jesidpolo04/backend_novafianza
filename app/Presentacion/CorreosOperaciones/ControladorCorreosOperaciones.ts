/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioArchivo } from 'App/Dominio/Datos/Servicios/ServicioArchivo'
import { RepositorioArchivoDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioArchivoDB'
import TblCorreosOperaciones from 'App/Infraestructura/Datos/Entidad/CorreosOperaciones'
export default class ControladorCorreosOperaciones {
  private service: ServicioArchivo
  constructor() {
    this.service = new ServicioArchivo(new RepositorioArchivoDB())
  }

  public async listar({ response }:HttpContextContract) {
    try {
      const correos = TblCorreosOperaciones.all();
      return response.status(200).send(correos);
      
    } catch (error) {
      return response.status(400).send(error);
    }
  }

  public async actualizar({ params, request, response }:HttpContextContract) {
    const { correo, estado = true } = request.all()
    const { id } = params

    try {

      await TblCorreosOperaciones
  .query()
  .where('id', id)
  .update({ 'coo_correo' : correo, 'coo_estado':estado});

      return response.status(200).send("Correo actualizado correctamente");
    } catch (error) {
      return response.status(400).send(error);
    }

  }


}
