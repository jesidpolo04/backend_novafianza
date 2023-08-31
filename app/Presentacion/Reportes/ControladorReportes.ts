import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schemaFiltroColocacion } from './Validadores/ValidadorFiltroColocacion'
import { ServicioReportes } from 'App/Dominio/Datos/Servicios/ServicioReportes'
import { RepositorioReportesSafix } from 'App/Infraestructura/Implementacion/Servicios/RepositorioReportesSafix'
import { ClienteHttpAxios } from 'App/Infraestructura/ClientesHttp/ClienteHttpAxios'
import { schemaFiltroOperaciones } from './Validadores/ValidadorFiltroOperaciones'
import { schemaFiltrosSaldosCartera } from './Validadores/ValidadorFiltroSaldosCartera'

export default class ControladorReportes {
  private servicio: ServicioReportes
  
  constructor () {
    this.servicio = new ServicioReportes( new RepositorioReportesSafix( new ClienteHttpAxios() ) )
  }

  async colocacion ({ request, response }: HttpContextContract) {
    const filtros = await request.validate({ schema: schemaFiltroColocacion })
    const reporte = await this.servicio.obtenerReporteColocacion(filtros)
    response.status(200).send(reporte)
  }

  async operaciones({ request, response }: HttpContextContract){
    const filtros = await request.validate({ schema: schemaFiltroOperaciones })
    const reporte = await this.servicio.obtenerReporteOperaciones(filtros)
    response.status(200).send(reporte)
  }

  async saldosCartera({ request, response }: HttpContextContract){
    const filtros  = await request.validate({ schema: schemaFiltrosSaldosCartera })
    const reporte = await this.servicio.obtenerReporteSaldosCartera(filtros)
    response.status(200).send(reporte)
  }

  async productos({ request, response }: HttpContextContract){
    const empresa = request.body["empresa"]
    if(!empresa){
      response.status(400).send({
        mensaje: "La empresa es requerida para consultar los productos.",
        estado: 400
      })
      return;
    }
    const productos = this.servicio.obtenerProductos(empresa)
    response.status(200).send(productos)
  }

}
