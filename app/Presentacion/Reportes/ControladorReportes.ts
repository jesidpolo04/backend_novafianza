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
    const empresa = request.body().empresa
    if(!empresa){
      response.status(400).send({
        mensaje: "La empresa es requerida para consultar los productos.",
        estado: 400
      })
      return;
    }
    const productos = await this.servicio.obtenerProductos(empresa)
    response.status(200).send(productos)
  }

  async exportSaldosCartera({ request, response }: HttpContextContract){
    
    const filtros  = await request.validate({ schema: schemaFiltrosSaldosCartera })
    const cabeceras = [
                { header: 'Año mes cierre', key: 'fechaCierre', width:15},
                { header: '0 - 30 días', key: 'rango_0_30Dias', width:15},
                { header: '31 - 60 días', key: 'rango_31_60Dias', width:15},
                { header: '61 - 90 días', key: 'rango_61_90Dias', width:15},
                { header: '91 - 120 días', key: 'rango_91_120Dias', width:15},
                { header: '121 - 150 días', key: 'rango_121_150Dias', width:15},
                { header: '151 - 180 días', key: 'rango_151_180Dias', width:15},
                { header: '181 - 210 días', key: 'rango_181_210Dias', width:15},
                { header: '211 - 240 días', key: 'rango_211_240Dias', width:15},
                { header: '241 - 270 días', key: 'rango_241_270Dias', width:15},
                { header: '271 - 300 días', key: 'rango_271_300Dias', width:15},
                { header: '301 - 330 días', key: 'rango_301_330Dias', width:15},
                { header: '331 - 360 días', key: 'rango_331_360Dias', width:15},
                { header: '361 más días', key: 'rango_361MasDias', width:15},
    ]
    const buffer = await this.servicio.exportSaldosCartera(filtros, cabeceras)

    

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', 'attachment; filename=SaldosCartera.xlsx');

    response.send(buffer);
  }

  async exportOperacion({ request, response }: HttpContextContract){
    
    const filtros  = await request.validate({ schema: schemaFiltroColocacion })
    const cabeceras = [
                { header: '', key: 'anioColocaion', with: 15},
            { header: '', key: 'mesColocacion', with: 15},
            { header: '', key: 'numeroCreditos', with: 15},
            { header: '', key: 'valorDesembolso', with: 15},
            { header: '', key: 'valorIngresoFianzaFija', with: 15},
            { header: '', key: 'ValorIngresoFianzaVariable', with: 15},
            { header: '', key: 'valorComercializacion', with: 15},
            { header: '', key: 'valorDisponiblePagosGenerados', with: 15},
            { header: '', key: 'valorReclamado', with: 15},
            { header: '', key: 'valorCupo', with: 15},
            { header: '', key: 'valorPendienteReclamar', with: 15}
              
    ]
    const buffer = await this.servicio.exportOperacion(filtros, cabeceras)

    

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', 'attachment; filename=Colocacion .xlsx');

    response.send(buffer);
  }

}
