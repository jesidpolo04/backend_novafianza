/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEmail } from 'App/Dominio/Datos/Servicios/ServicioEmail'
import { ServicioUsuarioEmpresa } from 'App/Dominio/Datos/Servicios/ServicioUsuarioEmpresa'
import { ServicioUsuarioNovafianza } from 'App/Dominio/Datos/Servicios/ServicioUsuarioNovafianza'
import { GenerarContrasena } from 'App/Dominio/GenerarContrasena/GenerarContrasena'
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis'
import { EncriptadorAdonis } from 'App/Infraestructura/Encriptacion/EncriptadorAdonis'
import { RepositorioUsuarioEmpresaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuarioEmpresaDB'
import { RepositorioUsuarioNovafianzaDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioUsuarioNovafianzaDB'
import { RepositorioBloqueoUsuarioDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioBloqueoUsuarioDB'

export default class ControladorEmpresa {
  private service: ServicioEmail
  constructor () {
    this.service = new ServicioEmail (
      new EnviadorEmailAdonis(), 
      new ServicioUsuarioEmpresa(new RepositorioUsuarioEmpresaDB(), new GenerarContrasena(), new EncriptadorAdonis()), 
      new GenerarContrasena(), 
      new ServicioUsuarioNovafianza(new RepositorioUsuarioNovafianzaDB(),new GenerarContrasena(), new EncriptadorAdonis()),
      new RepositorioBloqueoUsuarioDB()
    )
  }

  public async EnviarEmail ({request, response}:HttpContextContract) {
    
      const peticion = request.all()
      let usuario = peticion['usuario']
      let correo = peticion['correo']
      await this.service.ComprobarUsuario(usuario, correo)
      response.status(200).send({mensaje: 'Mensaje enviado correctamente'})
   
  }
}

