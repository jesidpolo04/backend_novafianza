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
                { header: 'Año mes cierre', key: 'fechaCierre', width:25},
                { header: '0 - 30 días', key: 'rango_0_30Dias', width:25},
                { header: '31 - 60 días', key: 'rango_31_60Dias', width:25},
                { header: '61 - 90 días', key: 'rango_61_90Dias', width:25},
                { header: '91 - 120 días', key: 'rango_91_120Dias', width:25},
                { header: '121 - 150 días', key: 'rango_121_150Dias', width:25},
                { header: '151 - 180 días', key: 'rango_151_180Dias', width:25},
                { header: '181 - 210 días', key: 'rango_181_210Dias', width:25},
                { header: '211 - 240 días', key: 'rango_211_240Dias', width:25},
                { header: '241 - 270 días', key: 'rango_241_270Dias', width:25},
                { header: '271 - 300 días', key: 'rango_271_300Dias', width:25},
                { header: '301 - 330 días', key: 'rango_301_330Dias', width:25},
                { header: '331 - 360 días', key: 'rango_331_360Dias', width:25},
                { header: '361 más días', key: 'rango_361MasDias', width:25},
    ]
    const buffer = await this.servicio.exportSaldosCartera(filtros, cabeceras)

    

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', 'attachment; filename=SaldosCartera.xlsx');

    response.send(buffer);
  }

  async exportOperacion({ request, response }: HttpContextContract){
    
    const filtros  = await request.validate({ schema: schemaFiltroOperaciones })
    const cabeceras = [
                { header: 'Año Colocación', key: 'anioColocaion', with: 25},
            { header: 'Mes Colocación', key: 'mesColocacion', with: 25},
            { header: 'No. Créditos reportados', key: 'numeroCreditos', with: 25},
            { header: 'Valor Desembolsos', key: 'valorDesembolso', with: 25},
            { header: 'Ingreso por fianza fija', key: 'valorIngresoFianzaFija', with: 25},
            { header: 'Ingreso por fianza variable', key: 'ValorIngresoFianzaVariable', with: 25},
            { header: 'Pagado comercialización', key: 'valorComercializacion', with: 25},
            { header: 'Disponible por cobertura', key: 'valorDisponiblePagosGenerados', with: 25},
            { header: 'Valor reclamo', key: 'valorReclamado', with: 25},
            { header: 'Cupo', key: 'valorCupo', with: 25},
            { header: 'Pendiente Reclamo', key: 'valorPendienteReclamar', with: 25}
              
    ]
    const buffer = await this.servicio.exportOperacion(filtros, cabeceras)

    

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', 'attachment; filename=Operacion.xlsx');

    response.send(buffer);
  }

  async exportColocacion({ request, response }: HttpContextContract){
    
    const filtros = await request.validate({ schema: schemaFiltroColocacion })
   
    const buffer = await this.servicio.exportColocacion(filtros)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.header('Content-Disposition', 'attachment; filename=Disponible por cobertura inicial.xlsx');

    response.send(buffer);
  }

}
