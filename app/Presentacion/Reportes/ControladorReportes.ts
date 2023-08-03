import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schemaFiltroColocacion } from './Validadores/ValidadorFiltroColocacion'
import { ServicioReportes } from 'App/Dominio/Datos/Servicios/ServicioReportes'
import { RepositorioReportesSafix } from 'App/Infraestructura/Implementacion/Servicios/RepositorioReportesSafix'

export default class ControladorReportes {
  private servicio: ServicioReportes
  
  constructor () {
    this.servicio = new ServicioReportes( new RepositorioReportesSafix() )
  }

  async colocacion ({ request, response }: HttpContextContract) {
    const filtros = await request.validate({ schema: schemaFiltroColocacion })
    const reporte = await this.servicio.obtenerReporteColocacion(filtros)
    response.status(200).send(reporte)
  }

}
