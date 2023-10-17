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

  public async listar({ response }: HttpContextContract) {
    try {
      const correos = TblCorreosOperaciones.all();
      return response.status(200).send(correos);

    } catch (error) {
      return response.status(400).send('No fue posible realizar la consulta, intente mas tarde');
    }
  }

  public async actualizar({ params, request, response }: HttpContextContract) {
    const { correo, estado = true } = request.all()
    const { id } = params

    try {

      const correoBd = await TblCorreosOperaciones.findOrFail(id)
      correoBd.correo = correo
      correoBd.estado = estado;
      await correoBd.save()
      return response.status(200).send("Correo actualizado correctamente");
    } catch (error) {
      return response.status(400).send('No fue posible actualizar, intente mas tarde');
    }

  }

  public async crear({ request, response }: HttpContextContract) {
    const { correo, estado = true } = request.all()

    const isCorreo = await TblCorreosOperaciones.query().where('coo_correo', correo).first()
    if (isCorreo) {
      return response.status(400).send('El correo ya existe');
    }

    try {
      const correoBd = new TblCorreosOperaciones()
      correoBd.correo = correo
      correoBd.estado = estado
      await correoBd.save()

      return response.status(200).send("Correo creado correctamente");
    } catch (error) {      
      return response.status(400).send('No fue posible crear el correo');
    }

  }


}
