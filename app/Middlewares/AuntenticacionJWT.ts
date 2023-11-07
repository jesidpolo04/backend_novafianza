import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAutenticacionJWT } from 'App/Dominio/Datos/Servicios/ServicioJWT'
import JwtInvalidoException from 'App/Exceptions/JwtInvalidoException'

export default class AutenticacionJWT {
  public async handle (contexto: HttpContextContract, next: () => Promise<void>) {
    const cabeceraAutenticacion = contexto.request.header('Authorization')
    if(!cabeceraAutenticacion){
      throw new JwtInvalidoException('Falta el token de autenticación')
    }

    
    const verificador = await ServicioAutenticacionJWT.verificarToken(cabeceraAutenticacion)
    if (verificador) {
      
      const jwt = cabeceraAutenticacion.split(' ')[1]
          const payload = await ServicioAutenticacionJWT.obtenerPayload(jwt)
          if(!payload.idRol || payload.idRol === '006'){
          return  contexto.response.status(400).send({
              mensaje: `No autorizado`,
              estado: 400,
              origen: '',
              token_valido: true,
              token_expirado: false
          })
          }
      
}

    await next()
  }
}
